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
  calculatePlane,
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
  saveHistory,
} from "@/lib/request";
import { MagnifyingGlassIcon, SymbolIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
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
      dob: new Date().toISOString().slice(0, 10),
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
    const history = await saveHistory(name, dayOfBirth);
    const removedVNName = removeVietnameseDiacritics(name);
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
    setDateOfBirth(date);
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
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
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
    const calculateAndSetData = async () => {
      const newCompoundChart = birthChart.map(
        (value, index) => value + nameChart[index]
      );
      setCompoundChart(newCompoundChart);

      const chartDoc = await getChartMeaning(newCompoundChart, name);
      setChartDoc(chartDoc);

      const { individualArrows, missingArrows } =
        calculateArrows(newCompoundChart);
      const { individualArrowsDoc, missingArrowsDoc } = await getArrowsDoc(
        individualArrows,
        missingArrows
      );
      setIndividualArrowsDoc(individualArrowsDoc);
      setMissingArrowsDoc(missingArrowsDoc);
    };

    calculateAndSetData();
  }, [birthChart, name, nameChart]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForm, setIsForm] = useState(true);
  const variants = {
    hiddenTitle: { opacity: 0, x: 50, scale: 0.8 },
    visibleTitle: { opacity: 1, x: 0, scale: 1, transition: { duration: 1 } },
    hiddenContent: { opacity: 0, x: -50 },
    visibleContent: { opacity: 1, x: 0, transition: { duration: 1.5 } },
    hiddenStagger: { opacity: 0, x: -50, scale: 0.3 },
    visibleStagger: { opacity: 1, x: 0, scale: 1 },
  };
  return (
    <AnimatePresence>
      <main className="flex flex-col items-center justify-between px-4 gap-5 pb-8 ">
        {isForm ? (
          <h1 className="mt-20 font-semibold text-xl text-balance text-center">
            Tra cứu thần số học{" "}
            <span className="font-normal font-nunito">
              {" "}
              - Khai phá bản thân
            </span>
          </h1>
        ) : (
          <div>
            <Button
              variant={"outline"}
              onClick={() => setIsForm(true)}
              className="mt-20"
            >
              <MagnifyingGlassIcon className="scale-125 mr-2" />
              Tra cứu thần số học
            </Button>
            <h2 className="text-center text-xl mt-5 font-medium font-nunito">
              Ngày sinh:{" "}
              <span className="font-bold font-merienda">
                {dateOfBirth.getDate()}/{dateOfBirth.getMonth() + 1}/
                {dateOfBirth.getFullYear()}
              </span>
            </h2>
            <h2 className="text-center text-lg font-semibold  font-nunito">
              <span>Tên:</span>{" "}
              <span className=" font-merienda font-bold">{name}</span>
            </h2>
          </div>
        )}
        {isForm && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Ngày sinh
                      <br />
                    </FormLabel>
                    <Input className="w-[180px] pr-2" type="date" {...field} />
                    <FormDescription>
                      {"Ngày sinh dương lịch của bạn. Nếu có nhiều hơn 1 ngày sinh, hãy tra cứu cả 2 ngày sinh vì mỗi ngày sinh đều sẽ có ảnh hưởng."
                        .split(" ")
                        .map((el, i) => (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.25,
                              delay: i / 10,
                            }}
                            key={i}
                          >
                            {el}{" "}
                          </motion.span>
                        ))}
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
                        className="w-[300px]"
                        placeholder="Nhập có dấu hoặc không dấu"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Cái tên mà mọi người thường xuyên gọi bạn, đó có thể là
                      tên thật, họ đệm và tên, biệt danh,...{" "}
                      <b>
                        không bắt buộc cả họ và tên trừ khi mọi người thường
                        xuyên gọi bạn như thế.
                      </b>{" "}
                      <br /> <i>Ví dụ: An, Đức An, Olivia, Đăng Quang,...</i>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                <MagnifyingGlassIcon className="scale-125 mr-2" /> Tra cứu
              </Button>
            </form>
          </Form>
        )}
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
                    <span className="font-merienda">Số chủ đạo </span>
                    <span className="bg-gradient-to-t inline-block  from-pink-500 to bg-yellow-400 rounded-full w-10 h-10 text-center leading-10 font-bold text-white background-animate ">
                      {rulingNumber}
                    </span>
                  </h2>
                  <blockquote className="text-left">
                    {rulingNumberDoc.description}
                  </blockquote>
                  <QuoteIcon />
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
                    mostSuitableVocations={
                      rulingNumberDoc.mostSuitableVocations
                    }
                    summary={rulingNumberDoc.summary}
                  />
                  <motion.h2
                    className="font-bold "
                    variants={variants}
                    initial="hiddenTitle"
                    whileInView="visibleTitle"
                    viewport={{ once: true }}
                  >
                    <span className="font-merienda">Sức mạnh của cái tên </span>
                    <span className="bg-gradient-to-bl inline-block  from-sky-400 to-violet-400 rounded-full w-10 h-10 text-center leading-10 font-bold text-white background-animate">
                      {completeNameNumber}
                    </span>
                  </motion.h2>
                  <motion.blockquote
                    className="text-left"
                    variants={variants}
                    initial="hiddenContent"
                    whileInView="visibleContent"
                    viewport={{ once: true }}
                  >
                    Con số của tên gọi là <b>số tên hoàn chỉnh</b>, được tính
                    bằng tổng quy đổi mỗi chữ cái trong tên thành số. Chắc chắn
                    bạn đã nhận thấy rằng, cho dù môi trường xung quanh ồn ào
                    đến đâu, khi ai đó gọi tên bạn, sự chú ý của bạn ngay lập
                    tức chuyển hướng sang họ. Tên của chúng ta đã trở thành một
                    âm thanh rất quan trọng đối với chúng ta, cho dù đó là tên
                    thật, biệt danh hay bất kỳ tên gọi nào chúng ta thích sử
                    dụng. Trên thực tế, tên của chúng ta phải được coi là một
                    phần được chấp nhận trong tính cách và biểu hiện của chúng
                    ta. Một cái tên rất quan trọng vì những rung động âm thanh
                    của nó trở nên hợp nhất với chính chúng ta. Những rung động
                    này ảnh hưởng đến chính tính cách của chúng ta.{" "}
                    <b>Số tên hoàn chỉnh</b> có thể cân bằng hoặc củng cố sức
                    mạnh của Số chủ đạo.
                    <p>
                      <br />
                      {completeNameNumber === rulingNumber ? (
                        <span>
                          <b>Số tên hoàn chỉnh</b> cung cấp sự củng cố lớn nhất
                          cho Số chủ đạo.
                        </span>
                      ) : calculatePlane(rulingNumber, completeNameNumber) ? (
                        <span>
                          <b>Số tên hoàn chỉnh</b> và số chủ đạo cùng nằm trên
                          một mặt phẳng thì sự củng cố cân bằng được đưa ra trên
                          mặt phẳng đó{" "}
                        </span>
                      ) : (
                        <span>
                          <b>Số tên hoàn chỉnh</b> nằm trên một mặt phẳng khác
                          với Số chủ đạo, một phạm vi rung động rộng hơn được
                          cung cấp để mở rộng tính cách.
                        </span>
                      )}
                    </p>
                    <QuoteIcon />
                  </motion.blockquote>
                  <PowerOfName
                    soulUrge={powerOfNameDoc.soulUrge}
                    outerExpression={powerOfNameDoc.outerExpression}
                  />
                  <h2 className="font-bold font-merienda">
                    Kết hợp tên và ngày sinh
                  </h2>
                  <motion.blockquote className="text-left">
                    {"Biểu đồ ngày sinh cung cấp ý nghĩa chính về tính cách. Bên cạnh đó, mỗi cái tên làm cân bằng hoặc tăng thêm các con số ảo vào biểu đồ ngày sinh. Biểu đồ tên lấp đầy các ô còn thiếu trong biểu đồ ngày sinh là chức năng mong muốn nhất. Cái tên mọi người thường xuyên gọi bạn sẽ có ảnh hưởng lớn hơn."
                      .split(" ")
                      .map((el, i) => (
                        <motion.span
                          initial={{ opacity: 0 }}
                          key={i}
                          whileInView={{
                            opacity: 1,
                            transition: {
                              duration: 0.25,
                              delay: i / 10,
                            },
                          }}
                          viewport={{ once: true }}
                        >
                          {el}{" "}
                        </motion.span>
                      ))}
                    <QuoteIcon />
                  </motion.blockquote>
                  <div className="text-left w-full">
                    <h4 className="bg-gradient-to-tr from-teal-500 to-stone-500 rounded-full  leading-9 font-bold bg-clip-text text-transparent text-left">
                      Ý nghĩa của những con số
                    </h4>
                    <i className="text-xs animate-pulse">
                      (Chọn vào từng ô để biết ý nghĩa của mỗi con số)
                    </i>
                  </div>
                  <div>
                    <Table className="w-[210px] h-[210px]">
                      <TableCaption className="">
                        Biểu đồ <b className="text-black/90">ngày sinh </b>+{" "}
                        <span className="text-cyan-600 font-normal">tên</span>
                      </TableCaption>
                      <TableBody>
                        <TableRow>
                          <TableCell className="border-r  font-bold">
                            <MeaningOfNumber
                              isolatedContent={
                                isolatedNumbers.includes(3) && (
                                  <p>
                                    Khi một hoặc nhiều số 3 xuất hiện mà không
                                    có sự hiện diện của số 2, 5 hoặc 6 trong
                                    biểu đồ. Điều này có nghĩa là tiềm năng tâm
                                    trí mạnh mẽ của họ có thể dễ dàng bị phân
                                    tán, vì nó không kết nối đến Mặt phẳng Vật
                                    lý, và sức mạnh của nó không dễ dàng được
                                    đưa vào thực tế. Vấn đề này có thể trở nên
                                    nghiêm trọng hơn khi có nhiều hơn một số 3
                                    bị cô lập, vì khi đó trí tưởng tượng có thể
                                    trở nên không kiểm soát và họ có thể bắt đầu
                                    tin vào các sự kiện, ý tưởng hoặc kỳ vọng mà
                                    không có sự hỗ trợ từ thực tế hoặc hiện
                                    thực.
                                    <div className="relative py-2 mt-4 px-4  rounded-sm shadow font-nunito bg-tuscany bg-no-repeat bg-cover bg-center text-white/90  ">
                                      <div className="absolute inset-0 rounded-sm bg-yellow-800/40 z-0"></div>
                                      <span className="relative z-10">
                                        <b>Cân bằng:</b> bằng cách phát triển
                                        các phẩm chất liên quan đến các số bị
                                        thiếu.
                                      </span>
                                      <ul className="space-y-1 relative z-10">
                                        <li>
                                          <span className="underline-offset-2 underline">
                                            Số 2
                                          </span>
                                          : nuôi dưỡng trực giác, tính nhạy cảm.
                                        </li>
                                        <li>
                                          <span className="underline-offset-2 underline">
                                            Số 5
                                          </span>
                                          : phát triển thêm tình yêu và lòng
                                          trắc ẩn trong biểu hiện và học cách tự
                                          do bày tỏ các cảm xúc tích cực của
                                          mình thay vì kìm nén chúng.
                                        </li>
                                        <li>
                                          <span className="underline-offset-2 underline">
                                            Số 6
                                          </span>
                                          : khuyến khích sáng tạo.
                                        </li>
                                      </ul>
                                    </div>
                                  </p>
                                )
                              }
                              content={chartDoc[2] && chartDoc[2].meaning}
                            >
                              <span>{"3".repeat(birthChart[2])} </span>
                              <span className="text-cyan-600 font-normal">
                                {"3".repeat(nameChart[2])}
                              </span>
                            </MeaningOfNumber>
                          </TableCell>
                          <TableCell className="border-r font-bold  ">
                            <MeaningOfNumber
                              content={chartDoc[5] && chartDoc[5].meaning}
                            >
                              <span>{"6".repeat(birthChart[5])} </span>
                              <span className="text-cyan-600 font-normal">
                                {"6".repeat(nameChart[5])}
                              </span>
                            </MeaningOfNumber>
                          </TableCell>
                          <TableCell className="font-bold ">
                            <MeaningOfNumber
                              isolatedContent={
                                isolatedNumbers.includes(9) && (
                                  <p>
                                    Khi các số 5, 6 và 8 bị thiếu trong biểu đồ
                                    và người đó có một hoặc nhiều số 9, người đó
                                    thường biểu thị của lý tưởng không thực tế,
                                    khao khát không được đáp lại, hoặc cả hai.{" "}
                                    <br />
                                    Điều này thường phụ thuộc vào số lượng số 9
                                    trên biểu đồ. Nếu một số 9 duy nhất, nó
                                    thường là dấu hiệu của tham vọng chưa được
                                    thực hiện; nếu có hai số 9, lý tưởng không
                                    thực tế; nếu ba hoặc bốn số 9, cả hai điều
                                    trên đều có thể.
                                    <div className="relative py-2 mt-4 px-4  rounded-sm shadow font-nunito bg-tuscany bg-no-repeat bg-cover bg-center text-white/90  ">
                                      <div className="absolute inset-0 rounded-sm bg-yellow-800/40 z-0"></div>
                                      <span className="relative z-10">
                                        <b>Điều chỉnh:</b> bằng cách phát triển
                                        các phẩm chất liên quan đến các số bị
                                        thiếu.
                                      </span>
                                      <ul className="space-y-1 relative z-10">
                                        <li>
                                          <span className="underline-offset-2 underline">
                                            Số 5
                                          </span>
                                          : phát triển thêm tình yêu và lòng
                                          trắc ẩn trong biểu hiện và học cách tự
                                          do bày tỏ các cảm xúc tích cực của
                                          mình thay vì kìm nén chúng.
                                        </li>
                                        <li>
                                          <span className="underline-offset-2 underline">
                                            Số 6
                                          </span>
                                          : nuôi dưỡng trực giác, tính nhạy cảm.
                                        </li>

                                        <li>
                                          <span className="underline-offset-2 underline">
                                            Số 8
                                          </span>
                                          : học cách áp dụng trực giác thực tế
                                          thông qua hành động yêu thương, phát
                                          triển khả năng độc lập.
                                        </li>
                                      </ul>
                                    </div>
                                  </p>
                                )
                              }
                              content={chartDoc[8] && chartDoc[8].meaning}
                            >
                              <span>{"9".repeat(birthChart[8])} </span>
                              <span className="text-cyan-600 font-normal ">
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
                              <span>{"2".repeat(birthChart[1])} </span>
                              <span className="text-cyan-600 font-normal">
                                {"2".repeat(nameChart[1])}
                              </span>
                            </MeaningOfNumber>
                          </TableCell>
                          <TableCell className="border-r font-bold  ">
                            <MeaningOfNumber
                              content={chartDoc[4] && chartDoc[4].meaning}
                            >
                              <span>{"5".repeat(birthChart[4])} </span>
                              <span className="text-cyan-600 font-normal">
                                {"5".repeat(nameChart[4])}
                              </span>
                            </MeaningOfNumber>
                          </TableCell>
                          <TableCell className=" font-bold">
                            <MeaningOfNumber
                              content={chartDoc[7] && chartDoc[7].meaning}
                            >
                              <span>{"8".repeat(birthChart[7])} </span>
                              <span className="text-cyan-600 font-normal">
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
                                    trên biểu đồ sinh cho thấy lý do tại sao
                                    những người này thường cảm thấy bị cô lập và
                                    hiểu lầm khi họ cố gắng giải thích cảm xúc
                                    của mình cho người khác, đặc biệt nếu họ có
                                    duy nhất một số 1. Họ gặp khó khăn trong
                                    việc giải thích rõ ràng cho người khác các
                                    khái niệm hoặc hành động họ thực hiện.{" "}
                                    <br />
                                    Nếu các số còn lại tập trung vào Mặt phẳng
                                    tâm trí (3-6-9), người đó có thể bị coi là
                                    lười biếng hoặc không đáng tin cậy vì rất
                                    nhiều điều đang diễn ra trong đầu họ sẽ
                                    không được chuyển thành biểu hiện thực tế
                                    hoặc vì họ cam kết làm những việc hiếm khi
                                    được thực hiện. Điều này có thể khiến người
                                    khác nghĩ rằng những người có số 1 bị cô lập
                                    là không đáng tin cậy khi thực tế, họ thường
                                    không nhận ra khía cạnh này của bản tính của
                                    mình.
                                    <div className="relative py-2 mt-4 px-4  rounded-sm shadow font-nunito bg-tuscany bg-no-repeat bg-cover bg-center text-white/90  ">
                                      <div className="absolute inset-0 bg-yellow-800/40 z-0 rounded-sm "></div>
                                      <b className="z-10 relative">Cân bằng:</b>{" "}
                                      <span className="relative z-10">
                                        bằng cách phát triển các phẩm chất liên
                                        quan đến các số bị thiếu.
                                      </span>
                                      <ul className="space-y-1 relative z-10">
                                        <li>
                                          <span className="underline-offset-2 underline">
                                            Số 2
                                          </span>
                                          : nuôi dưỡng trực giác, tính nhạy cảm.
                                        </li>
                                        <li>
                                          <span className="underline-offset-2 underline">
                                            Số 5
                                          </span>
                                          : phát triển thêm tình yêu và lòng
                                          trắc ẩn trong biểu hiện và học cách tự
                                          do bày tỏ các cảm xúc tích cực của
                                          mình thay vì kìm nén chúng.
                                        </li>
                                        <li>
                                          <span className="underline-offset-2 underline">
                                            Số 4
                                          </span>
                                          : thực hành cải thiện logic, kiên nhẫn
                                          và thực tế.
                                        </li>
                                      </ul>
                                    </div>
                                  </p>
                                )
                              }
                              content={chartDoc[0] && chartDoc[0].meaning}
                            >
                              <span>{"1".repeat(birthChart[0])} </span>
                              <span className="text-cyan-600 font-normal">
                                {"1".repeat(nameChart[0])}
                              </span>
                            </MeaningOfNumber>
                          </TableCell>
                          <TableCell className="border-r font-bold  ">
                            <MeaningOfNumber
                              content={chartDoc[3] && chartDoc[3].meaning}
                            >
                              <span>{"4".repeat(birthChart[3])} </span>
                              <span className="text-cyan-600 font-normal ">
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
                                    phải của Biểu đồ mà không có các số 4, 5
                                    hoặc 8 xung quanh, những hy sinh và bài học
                                    mà người đó phải học thường phải lặp lại.{" "}
                                    <br />
                                    Trải nghiệm học hỏi phải được dịch thành tư
                                    duy, để bài học được nhận ra và hiểu được.
                                    Nhưng khi khu vực học hỏi này bị cô lập khỏi
                                    Mặt phẳng Tâm Trí (3-6-9), các bài học giống
                                    nhau hoặc tương tự phải được lặp lại cho đến
                                    khi chúng được nhận biết thông qua tần suất.
                                    Những người này có thể trải qua mất mát
                                    trong sức khoẻ, tình yêu hoặc tài sản tiền
                                    bạc lặp đi lặp lại cho đến khi người đó học
                                    được bài học cần thiết từ các trải nghiệm
                                    của mình và áp dụng chúng vào cuộc sống của
                                    mình. Mặc dù điều này thường gây đau đớn cho
                                    người hy sinh, họ thường chấp nhận nó như
                                    định mệnh hoặc sự không thể tránh khỏi. Sự
                                    đau đớn thường dường như nặng hơn đối với
                                    bạn bè và người thân của người phải hy sinh.{" "}
                                    <br />
                                    Hãy nhớ rằng, số 7 là số của sự hiểu biết
                                    triết học, vì vậy những người có số 7 cô lập
                                    hoặc số 7 chủ đạo có thể có khả năng hiểu rõ
                                    hơn về những thách thức và bài học mà họ
                                    phải đối mặt trong cuộc sống. Họ có thể có
                                    khả năng phân tích và suy ngẫm sâu hơn về
                                    những trải nghiệm của mình, giúp họ đối mặt
                                    với những thách thức một cách nhẹ nhàng và
                                    thông thái hơn.
                                    <div className="relative py-2 mt-4 px-4  rounded-sm shadow font-nunito bg-tuscany bg-no-repeat bg-cover bg-center text-white/90  ">
                                      <div className="absolute inset-0 bg-yellow-800/40 z-0 rounded-sm "></div>
                                      <b className="z-10 relative">
                                        Để giảm thiểu tổn thương:
                                      </b>{" "}
                                      <span className="relative z-10">
                                        người đó cần phát triển sức mạnh vốn có
                                        trong các số bị thiếu.
                                      </span>
                                      <ul className="space-y-1 relative z-10">
                                        <li>
                                          <span className="underline-offset-2 underline">
                                            Số 4
                                          </span>
                                          : thực hành cải thiện logic, kiên nhẫn
                                          và thực tế. Hòa nhập với biểu hiện của
                                          bản ngã số 1 để cảm thấy thoải mái khi
                                          yêu cầu sự giúp đỡ hoặc hướng dẫn.
                                          Đồng thời, điều này phát triển Mũi Tên
                                          Thực Tiễn (1-4-7) để người đó phát
                                          triển một cách tiếp cận thực tế đối
                                          với các trải nghiệm của cuộc sống.
                                        </li>
                                        <li>
                                          <span className="underline-offset-2 underline">
                                            Số 5
                                          </span>
                                          : phát triển thêm tình yêu và lòng
                                          trắc ẩn trong biểu hiện và học cách tự
                                          do bày tỏ các cảm xúc tích cực của
                                          mình thay vì kìm nén chúng.
                                        </li>
                                        <li>
                                          <span className="underline-offset-2 underline">
                                            Số 8
                                          </span>
                                          : học cách áp dụng trực giác thực tế
                                          thông qua hành động yêu thương. Điều
                                          này cũng giúp phát triển cảm giác độc
                                          lập của họ, và cuối cùng là xây dựng
                                          Mũi Tên Hoạt Động (7-8-9)
                                        </li>
                                      </ul>
                                    </div>
                                  </p>
                                )
                              }
                              content={chartDoc[6] && chartDoc[6].meaning}
                            >
                              <span>{"7".repeat(birthChart[6])} </span>
                              <span className="text-cyan-600 font-normal ">
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
                  <p className="text-left border p-2 rounded-sm bg-slate-100">
                    Hãy nhớ rằng, sức mạnh của Biểu đồ sinh ban đầu của bạn
                    không quan trọng bằng những gì bạn làm để lấp đầy khoảng
                    trống của nó. Một số người thành công nhất trong lịch sử đã
                    có một số Biểu đồ sinh yếu nhất và trống rỗng nhất. Thành
                    công của họ chỉ đến bằng cách phát triển những phẩm chất mà
                    họ thiếu ban đầu và phát triển theo hướng hoàn hảo. Đó là
                    mục đích của cuộc sống - không có gì có thể hướng chúng ta
                    tốt hơn số học.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
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
                  </motion.button>
                </div>
              </motion.div>
            )
          )}
        </Suspense>
      </main>
    </AnimatePresence>
  );
}
