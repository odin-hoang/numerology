"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QuoteIcon } from "@/assets/quote";
const formSchema = z.object({
  dob: z.string({
    required_error: "Vui lòng chọn 1 ngày phù hợp!",
  }),
  name: z
    .string({ required_error: "Vui lòng nhập tên của bạn!" })
    .trim()
    .refine((value) => value.trim() != "", {
      message: "Vui lòng nhập tên hợp lệ!",
    }),
});
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  calculateArrows,
  calculateBirthChart,
  calculateCompleteNameNumber,
  calculateIsolatedNumber,
  calculatePowerOfName,
  calculateRulingNumber,
  removeVietnameseDiacritics,
} from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Suspense, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import RulingInfo from "../components/home/ruling-info";
import PowerOfName from "@/components/home/power-of-name";
import BirthNameChartInfo, {
  ArrowDoc,
} from "@/components/home/birth-name-chart-info";
import MeaningOfNumber from "@/components/home/meaning-of-number";
import {
  getArrowsDoc,
  getChartMeaning,
  getPowerOfNameMeaning,
  getRulingNumberMeaning,
} from "@/lib/request";
import { HomeIcon, SymbolIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import DayNumberMeaning from "@/components/home/day-number";
type ChartInfo = {
  number: number;
  description: string;
  count: number;
  meaning: string;
};
export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dob: "2024-01-01",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);

    setIsSubmitting(true);
    const date = new Date(data.dob);
    const name = data.name;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let dobStr = `${day}${month}${year}`;
    let dayOfBirth = `${day}-${month}-${year}`;
    const removedVNName = removeVietnameseDiacritics(name);
    console.log(removedVNName);
    const { nameChart, outerExpression, soulUrge, completeNameNumber } =
      calculatePowerOfName(removedVNName);
    const rulingNumber = calculateRulingNumber(dobStr);
    // Get data
    const rulingNumberDoc = await getRulingNumberMeaning(
      rulingNumber,
      dayOfBirth
    );
    const powerOfNameDoc = await getPowerOfNameMeaning(
      soulUrge,
      outerExpression
    );
    // Calculate numbers
    setName(name);
    setNameChart(nameChart);
    setBirthChart(calculateBirthChart(dobStr));
    setRulingNumber(rulingNumber);
    setCompleteNameNumber(completeNameNumber);
    setDayNumber(calculateCompleteNameNumber(day));
    setMonthNumber(calculateCompleteNameNumber(month));
    setYearNumber(calculateCompleteNameNumber(year));
    // Documentation
    setRulingNumberDoc(rulingNumberDoc);
    setPowerOfNameDoc(powerOfNameDoc);
    setIsSubmitting(false);
    setIsForm(false);
  }
  const [name, setName] = useState("");
  const [rulingNumber, setRulingNumber] = useState(0);
  const [dayNumber, setDayNumber] = useState(0);
  const [monthNumber, setMonthNumber] = useState(0);
  const [yearNumber, setYearNumber] = useState(0);
  const [rulingNumberDoc, setRulingNumberDoc] = useState({
    number: 0,
    description: "",
    summary: "",
    lifePurpose: "",
    bestExpression: "",
    distinctiveTraits: "",
    negativeTendencies: "",
    recommendedDevelopment: "",
    mostSuitableVocations: "",
  });
  const [birthChart, setBirthChart] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [nameChart, setNameChart] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [powerOfNameDoc, setPowerOfNameDoc] = useState({
    soulUrge: {
      number: 0,
      description: "",
    },
    outerExpression: {
      number: 0,
      description: "",
    },
  });
  const [chartDoc, setChartDoc] = useState<ChartInfo[]>([]);
  const [individualArrowsDoc, setIndividualArrowsDoc] = useState<ArrowDoc[]>(
    []
  );
  const [missingArrowsDoc, setMissingArrowsDoc] = useState<ArrowDoc[]>([]);
  const [completeNameNumber, setCompleteNameNumber] = useState(0);
  const [compoundChart, setCompoundChart] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const isolatedNumbers = calculateIsolatedNumber(compoundChart);
  useEffect(() => {
    const newCompoundChart = birthChart.map(
      (value, index) => value + nameChart[index]
    );
    setCompoundChart(newCompoundChart);
  }, [birthChart, nameChart]);
  useEffect(() => {
    (async () => {
      const chartDoc = await getChartMeaning(compoundChart, name);
      console.log("chartDoc", chartDoc);
      setChartDoc(chartDoc);
    })();
    const { individualArrows, missingArrows } = calculateArrows(compoundChart);
    const fetchArrowsDoc = async () => {
      const { individualArrowsDoc, missingArrowsDoc } = await getArrowsDoc(
        individualArrows,
        missingArrows
      );
      setIndividualArrowsDoc(individualArrowsDoc);
      setMissingArrowsDoc(missingArrowsDoc);
    };
    fetchArrowsDoc();
  }, [compoundChart]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForm, setIsForm] = useState(true);
  return (
    <main className="flex flex-col items-center justify-between px-12 gap-5 pb-12 ">
      {isForm ? (
        <h1 className="mt-24 font-bold">Tra cứu thần số học</h1>
      ) : (
        <Button
          variant={"outline"}
          onClick={() => setIsForm(true)}
          className="mt-20"
        >
          Tra cứu thần số học
        </Button>
      )}

      {isForm && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ngày sinh <br />
                  </FormLabel>
                  <Input className="w-[150px] pr-2" type="date" {...field} />
                  <FormDescription>
                    Ngày sinh dương lịch của bạn. Nếu có nhiều hơn 1 ngày sinh,
                    hãy tra cứu cả 2 ngày sinh vì mỗi ngày sinh đều sẽ có ảnh
                    hưởng.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên thường gọi <br />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-[240px]"
                      placeholder="Nhập có dấu hoặc không dấu"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Tên mọi người gọi bạn, không nhất thiết là tên đầy đủ.{" "}
                    <br /> <i>Ví dụ: An, Đức Anh, Olivia, Đăng Quang,...</i>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Tra cứu</Button>
          </form>
        </Form>
      )}
      {/* <Separator id="separator"></Separator> */}
      <Suspense fallback={<div>Loading...</div>}>
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            Đang tính toán <SymbolIcon className="animate-spin" />
          </div>
        ) : (
          !!rulingNumber && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div
                id="document"
                className="sm:w-[600px] lg:w-[900px] flex items-center flex-col gap-5"
              >
                <h2 className="font-bold ">
                  Số chủ đạo{" "}
                  <span className="bg-gradient-to-t inline-block  from-pink-500 to bg-yellow-400 rounded-full w-10 h-10 text-center leading-10 font-bold text-white background-animate ">
                    {rulingNumber}
                  </span>
                </h2>
                <blockquote className="text-justify text-sm">
                  {rulingNumberDoc.description}
                  <QuoteIcon />
                </blockquote>
                <RulingInfo
                  lifePurpose={rulingNumberDoc.lifePurpose}
                  bestExpression={rulingNumberDoc.bestExpression}
                  distinctiveTraits={rulingNumberDoc.distinctiveTraits}
                  negativeTendenciesToBeSurmounted={
                    rulingNumberDoc.negativeTendencies
                  }
                  recommendedDevelopment={
                    rulingNumberDoc.recommendedDevelopment
                  }
                  mostSuitableVocations={rulingNumberDoc.mostSuitableVocations}
                  summary={rulingNumberDoc.summary}
                />
                <h2 className="font-bold">
                  Sức mạnh của cái tên{" "}
                  <span className="bg-gradient-to-bl inline-block  from-sky-400 to-violet-400 rounded-full w-10 h-10 text-center leading-10 font-bold text-white background-animate ">
                    {completeNameNumber}
                  </span>
                </h2>
                <blockquote className="text-justify text-sm">
                  Một trong số những âm thanh được thừa nhận nhất đối với tai
                  của mọi người là tên của họ. Chắc chắn bạn đã nhận thấy rằng,
                  cho dù môi trường xung quanh ồn ào đến đâu, khi ai đó gọi tên
                  bạn, sự chú ý của bạn ngay lập tức chuyển hướng sang họ. Tên
                  của chúng ta đã trở thành một âm thanh rất quan trọng đối với
                  chúng ta, cho dù đó là tên, tên thú cưng, biệt danh hay bất kỳ
                  tên gọi nào chúng ta thích sử dụng. Trên thực tế, tên của
                  chúng ta phải được coi là một phần được chấp nhận trong tính
                  cách và biểu hiện của chúng ta. Một cái tên rất quan trọng vì
                  những rung động của nó trở nên hợp nhất với chính chúng ta.
                  Thuật ngữ rung động ngụ ý không chỉ tần số sóng âm thanh mà
                  thậm chí rộng hơn là các rung động biểu tượng của tên như được
                  biểu thị bằng mẫu số học của nó. Những rung động này ảnh hưởng
                  đến chính tính cách và cá tính của chúng ta. Số tên hoàn chỉnh
                  từ 2 đến 11 và sau đó là 22/ 4. Mức độ ảnh hưởng của Số tên
                  hoàn chỉnh nằm trong mối quan hệ của nó với Số chủ đạo, chứ
                  không phải bất kỳ đóng góp cụ thể nào của riêng nó. Số tên
                  hoàn chỉnh có thể cân bằng hoặc củng cố sức mạnh của Số chủ
                  đạo. Nếu Số tên hoàn chỉnh giống với Số chủ đạo, nó cung cấp
                  sự củng cố lớn nhất cho Số chủ đạo. Nếu Số tên hoàn chỉnh khác
                  với Số chủ đạo, nhưng cả hai đều ở trên cùng một Mặt phẳng (4,
                  7 và 10 trên Mặt phẳng Vật lý; 2, 5, 8 và 11 trên Mặt phẳng
                  Linh hồn; 3, 6 và 9 trên Mặt phẳng Tâm trí; và 22/4 cả trên
                  Mặt phẳng Vật lý và Linh hồn), thì sự củng cố cân bằng được
                  đưa ra trên Mặt phẳng đó. Cuối cùng, nếu một Số tên hoàn chỉnh
                  nằm trên một mặt phẳng khác với Số cầm quyền, một phạm vi rung
                  động rộng hơn được cung cấp để mở rộng tính cách.
                  <QuoteIcon />
                </blockquote>
                <PowerOfName
                  soulUrge={powerOfNameDoc.soulUrge}
                  outerExpression={powerOfNameDoc.outerExpression}
                />
                <h2 className="font-bold">Kết hợp tên và ngày sinh</h2>
                <blockquote className="text-justify text-sm">
                  Khía cạnh thứ ba của số học tên là chìa khóa cho sức mạnh
                  chung của tên. Đây được gọi là Số tên đầy đủ. Nó có liên quan
                  đến, nhưng ít mạnh hơn Số cầm quyền. Số tên hoàn chỉnh có được
                  bằng cách cộng tất cả các số của một tên, sau đó tính tổng
                  chúng theo cách tương tự như đã được thực hiện để có được Số
                  cầm quyền. (Hãy nhớ sử dụng tên bạn xác định rõ nhất, cho dù
                  đó là tên, biệt hiệu, tên đệm hay tên mới mà bạn đã chọn để áp
                  dụng.)
                  <br /> Biểu đồ tên có cung cấp bất kỳ điểm mạnh nào cân bằng
                  điểm yếu trên Biểu đồ sinh không? Đây là chức năng mong muốn
                  nhất của Biểu đồ tên. Ví dụ, nếu Biểu đồ sinh có Mũi tên quá
                  mẫn cảm (số 2, 5 và 8) và Biểu đồ tên có Mũi tên cân bằng cảm
                  xúc (2, 5 và 8), thì chúng ta có sự cân bằng mong muốn nhất.
                  Nếu Biểu đồ tên chỉ có một hoặc hai số trên Soul Plane, điều
                  này vẫn có thể cung cấp một số cân bằng có giá trị.
                  <QuoteIcon />
                </blockquote>
                <div className="text-left w-full">
                  <h4 className="bg-gradient-to-tr from-teal-500 to-stone-500 rounded-full  leading-9 font-bold bg-clip-text text-transparent text-left">
                    Ý nghĩa của những con số
                  </h4>
                  <i className="text-xs">
                    (Chọn vào từng ô để biết ý nghĩa của mỗi con số)
                  </i>
                </div>
                <div>
                  <Table className="w-[210px] h-[210px]">
                    <TableCaption className="">
                      Biểu đồ <b>ngày sinh </b>+{" "}
                      <span className="text-cyan-600">
                        <b>tên</b>
                      </span>
                    </TableCaption>
                    <TableBody>
                      <TableRow>
                        <TableCell className="border-r  font-bold">
                          <MeaningOfNumber
                            isolatedContent={
                              isolatedNumbers.includes(3) &&
                              "Điều này có nghĩa là tiềm năng tâm trí mạnh mẽ của họ có thể dễ dàng được khuếch tán, vì nó không liên quan đến Mặt phẳng Vật lý, và sức mạnh của nó không dễ dàng được đưa vào thực hành. Vấn đề này có thể trở nên phức tạp hơn khi có nhiều hơn một 3 người bị cô lập, vì khi đó trí tưởng tượng có thể chạy loạn và những người này có thể trở thành hoang tưởng hoặc 'huyền thoại trong tâm trí của chính họ'."
                            }
                            content={chartDoc[2] && chartDoc[2].meaning}
                          >
                            <span>{"3".repeat(birthChart[2])}</span>
                            <span className="text-cyan-600">
                              {"3".repeat(nameChart[2])}
                            </span>
                          </MeaningOfNumber>
                        </TableCell>
                        <TableCell className="border-r font-bold  ">
                          <MeaningOfNumber
                            content={chartDoc[5] && chartDoc[5].meaning}
                          >
                            <span>{"6".repeat(birthChart[5])}</span>
                            <span className="text-cyan-600">
                              {"6".repeat(nameChart[5])}
                            </span>
                          </MeaningOfNumber>
                        </TableCell>
                        <TableCell className="font-bold ">
                          <MeaningOfNumber
                            isolatedContent={
                              isolatedNumbers.includes(9) && (
                                <p>
                                  Khi các số 5, 6 và 8 bị thiếu trong Biểu đồ
                                  sinh và người đó có một hoặc nhiều số 9 (như
                                  tất cả trong thế kỷ 20), cá nhân đó thể hiện
                                  chủ nghĩa lý tưởng không thực tế, tham vọng
                                  đơn phương hoặc cả hai. Điều này thường phụ
                                  thuộc vào số 9 trên Biểu đồ sinh. Nếu một số 9
                                  duy nhất, nó thường là dấu hiệu của tham vọng
                                  chưa được thực hiện; nếu một số 9 kép, chủ
                                  nghĩa duy tâm không thực tế; Nếu ba hoặc bốn
                                  số 9, cả hai đều có thể chiếm ưu thế. Từ các
                                  biện pháp khắc phục được khuyến nghị cho các
                                  số bị cô lập khác, kỹ thuật này rõ ràng rất dễ
                                  thực hiện. Trong trường hợp này, phẩm chất của
                                  5, sau đó là 6 và 8 cần được khắc sâu vào biểu
                                  hiện của người đó. Trong số này, có lẽ 5 là
                                  quan trọng nhất nếu người đó không có số 7
                                  trên Biểu đồ sinh của họ, vì năm người sẽ liên
                                  kết số 9 với biểu hiện thông qua bản ngã của
                                  số 1. Nếu chúng cũng có 7, thì lũy thừa của cả
                                  hai số (5 và 8) nên được phát triển để kết nối
                                  tối ưu giữa chủ nghĩa lý tưởng tham vọng của 9
                                  và Mặt phẳng thực hành vật lý.
                                </p>
                              )
                            }
                            content={chartDoc[8] && chartDoc[8].meaning}
                          >
                            <span>{"9".repeat(birthChart[8])}</span>
                            <span className="text-cyan-600 ">
                              {"9".repeat(nameChart[8])}
                            </span>
                          </MeaningOfNumber>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="border-r font-bold  ">
                          <MeaningOfNumber
                            content={chartDoc[1] && chartDoc[1].meaning}
                          >
                            <span>{"2".repeat(birthChart[1])}</span>
                            <span className="text-cyan-600">
                              {"2".repeat(nameChart[1])}
                            </span>
                          </MeaningOfNumber>
                        </TableCell>
                        <TableCell className="border-r font-bold  ">
                          <MeaningOfNumber
                            content={chartDoc[4] && chartDoc[4].meaning}
                          >
                            <span>{"5".repeat(birthChart[4])}</span>
                            <span className="text-cyan-600">
                              {"5".repeat(nameChart[4])}
                            </span>
                          </MeaningOfNumber>
                        </TableCell>
                        <TableCell className=" font-bold">
                          <MeaningOfNumber
                            content={chartDoc[7] && chartDoc[7].meaning}
                          >
                            <span>{"8".repeat(birthChart[7])}</span>
                            <span className="text-cyan-600">
                              {"8".repeat(nameChart[7])}
                            </span>
                          </MeaningOfNumber>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="border-r font-bold  ">
                          <MeaningOfNumber
                            isolatedContent={
                              isolatedNumbers.includes(1) && (
                                <p>
                                  Khi các số 2, 5 và 4 bị thiếu trong Biểu đồ
                                  sinh, số 1 sẽ bị cô lập với tất cả các số
                                  khác. Vì 1 là con số tượng trưng cho sự thể
                                  hiện của bản ngã con người, sự cô lập của nó
                                  trên Biểu đồ sinh cho thấy lý do tại sao những
                                  người này thường cảm thấy bị cô lập và hiểu
                                  lầm khi họ cố gắng giải thích cảm xúc của mình
                                  cho người khác, đặc biệt nếu họ có 1 1 duy
                                  nhất. Biểu đồ sinh như vậy sẽ có sự tập trung
                                  nhiều của các con số trên Mặt phẳng Tâm trí và
                                  / hoặc trên Mũi tên Hoạt động. Sự tập trung
                                  nhiều của các con số trên Mũi tên hoạt động
                                  chỉ ra rằng người đó gặp khó khăn trong việc
                                  giải thích rõ ràng cho người khác các khái
                                  niệm và / hoặc hành động họ chọn thực hiện.
                                  Nếu số lượng của họ tập trung nhiều hơn vào
                                  Mặt phẳng Tâm trí, người đó có thể bị coi là
                                  lười biếng hoặc không đáng tin cậy vì rất
                                  nhiều điều đang diễn ra trong đầu họ sẽ không
                                  được chuyển thành biểu hiện thực tế hoặc vì họ
                                  cam kết làm những việc hiếm khi được thực
                                  hiện. Điều này có thể khiến người khác nghĩ
                                  rằng những người bị cô lập là không đáng tin
                                  cậy khi, nếu có hiệu lực, họ hầu như không
                                  nhận thức được khía cạnh này trong bản chất
                                  của họ. Trừ khi nó được sửa chữa, nó có thể
                                  dẫn đến sự cô đơn để bản ngã bị cô lập phóng
                                  đại thành một người bị cô lập. Sửa chữa là dễ
                                  dàng. Đối với mỗi số bị cô lập, một chất lượng
                                  còn thiếu sẽ tích hợp Biểu đồ sinh và khử cô
                                  lập từng số được đại diện bởi số 5 ở trung tâm
                                  của Biểu đồ sinh. Nói chung, điều này ngụ ý sự
                                  cần thiết cho bất kỳ người nào có một hoặc
                                  nhiều số bị cô lập để phát triển tình yêu và
                                  lòng trắc ẩn hơn trong biểu hiện của họ, và
                                  học cách tự do thể hiện cảm xúc tích cực của
                                  họ hơn là đóng chai chúng. Khi chỉ có số 1 bị
                                  cô lập, việc phát triển các phẩm chất được chỉ
                                  ra bởi 2 hoặc 4 cũng có thể giúp ích. Ví dụ,
                                  phát triển trực giác của 2 để biểu hiện của
                                  bản ngã có thể được kết nối với sức mạnh của
                                  phân tích (3), và thực hành với logic được cải
                                  thiện, kiên nhẫn và thực tế của 4.
                                </p>
                              )
                            }
                            content={chartDoc[0] && chartDoc[0].meaning}
                          >
                            <span>{"1".repeat(birthChart[0])}</span>
                            <span className="text-cyan-600">
                              {"1".repeat(nameChart[0])}
                            </span>
                          </MeaningOfNumber>
                        </TableCell>
                        <TableCell className="border-r font-bold  ">
                          <MeaningOfNumber
                            content={chartDoc[3] && chartDoc[3].meaning}
                          >
                            <span>{"4".repeat(birthChart[3])}</span>
                            <span className="text-cyan-600">
                              {"4".repeat(nameChart[3])}
                            </span>
                          </MeaningOfNumber>
                        </TableCell>
                        <TableCell className="font-bold ">
                          <MeaningOfNumber
                            isolatedContent={
                              isolatedNumbers.includes(7) && (
                                <p>
                                  Khi một hoặc nhiều số 7 chiếm góc dưới bên
                                  phải của Biểu đồ sinh mà không có 4, 5 hoặc 8
                                  tiếp xúc với họ, những hy sinh và bài học mà
                                  người đó học được thường nhất thiết phải lặp
                                  lại. Kinh nghiệm học tập phải được dịch sang
                                  tâm trí, để bài học của nó được nhận ra và
                                  hiểu. Nhưng khi khu vực học tập này bị cô lập
                                  khỏi Mặt phẳng Tâm trí, những bài học tương tự
                                  hoặc tương tự phải được lặp lại cho đến khi,
                                  bằng tần suất, chúng được nhận ra. Điều này
                                  ngụ ý rằng những người này có thể mất sức
                                  khỏe, tình yêu hoặc tài sản tiền bạc trong
                                  những dịp lặp đi lặp lại cho đến khi bài học
                                  thích hợp được mang về nhà cho họ. Mặc dù điều
                                  này thường gây tổn thương cho người hy sinh,
                                  nhưng họ có xu hướng chấp nhận nó như là định
                                  mệnh hoặc không thể tránh khỏi. Nỗi đau thường
                                  có vẻ tồi tệ hơn đối với bạn bè và những người
                                  thân yêu của người phải hy sinh. Hãy nhớ rằng,
                                  7 là số lượng hiểu biết triết học, vì vậy
                                  người có 7 hoặc 7 bị cô lập có thể hiểu rõ hơn
                                  về những gì đã xảy ra với họ sau đó là những
                                  người xung quanh. Để giảm thiểu tổn thương
                                  hoặc hy sinh, người đó cần phát triển sức mạnh
                                  vốn có trong các số 4, 5 và 8. Chúng tôi đã đề
                                  cập đến các phẩm chất của 4 và 5 với các số bị
                                  cô lập nói trên, nhưng bây giờ chúng tôi thấy
                                  rằng sự phát triển của 4 giúp 7 bị cô lập
                                  thống nhất với biểu hiện bản ngã của 1 để cảm
                                  thấy ổn khi yêu cầu giúp đỡ hoặc hướng dẫn.
                                  Đồng thời, điều này phát triển Mũi tên thực
                                  tiễn để người đó phát triển một cách tiếp cận
                                  thực tế đối với trải nghiệm cuộc sống của họ.
                                  Để phát triển sức mạnh của số 8 trên Biểu đồ
                                  sinh, 7 người bị cô lập phải trở nên khôn
                                  ngoan hơn khi áp dụng trực giác thực tế thông
                                  qua hành động yêu thương. Điều này cũng giúp
                                  phát triển ý thức độc lập của họ, và cuối cùng
                                  xây dựng Mũi tên hoạt động. Ở đây, 5 và 8 hoạt
                                  động hoàn toàn hài hòa, cung cấp một cơ hội
                                  tuyệt vời cho sự phát triển của Mặt phẳng linh
                                  hồn của người đó.
                                </p>
                              )
                            }
                            content={chartDoc[6] && chartDoc[6].meaning}
                          >
                            <span>{"7".repeat(birthChart[6])}</span>
                            <span className="text-cyan-600">
                              {"7".repeat(nameChart[6])}
                            </span>
                          </MeaningOfNumber>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <BirthNameChartInfo
                  individualArrowsDoc={individualArrowsDoc}
                  missingArrowsDoc={missingArrowsDoc}
                ></BirthNameChartInfo>
                <DayNumberMeaning dayNumber={dayNumber}></DayNumberMeaning>
                <p className="text-justify text-sm border p-2 rounded-sm">
                  Hãy nhớ rằng, sức mạnh của Biểu đồ sinh ban đầu của bạn không
                  quan trọng bằng những gì bạn làm để lấp đầy khoảng trống của
                  nó. Một số người thành công nhất trong lịch sử đã có một số
                  Biểu đồ sinh yếu nhất và trống rỗng nhất. Thành công của họ
                  chỉ đến bằng cách phát triển những phẩm chất mà họ thiếu ban
                  đầu và phát triển theo hướng hoàn hảo. Đó là mục đích của cuộc
                  sống - không có gì có thể hướng chúng ta tốt hơn số học.
                </p>
                <Link
                  href={{
                    pathname: "/cycle",
                    query: {
                      day: dayNumber,
                      month: monthNumber,
                      year: yearNumber,
                      rulingNumber: rulingNumber,
                    },
                  }}
                  className="bg-gradient-to-r from-fuchsia-200 to-amber-200 via-rose-200 py-2 px-4 rounded-md opacity-90 hover:opacity-100"
                >
                  Xem định hướng năm {new Date().getFullYear()}
                </Link>
              </div>
            </motion.div>
          )
        )}
      </Suspense>
    </main>
  );
}
