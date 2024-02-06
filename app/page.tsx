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
  calculateBirthChart,
  calculateCompleteNameNumber,
  calculateIsolatedNumber,
  calculatePowerOfName,
  calculateRulingNumber,
} from "@/lib/utils";
import Header from "@/components/header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import RulingInfo from "../components/ruling-info";
import PowerOfName from "@/components/power-of-name";
import BirthNameChartInfo from "@/components/birth-name-chart-info";
import MeaningOfNumber from "@/components/meaning-of-number";
export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dob: "2024-01-01",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    const date = new Date(data.dob);
    const name = data.name;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let dobStr = `${day}${month}${year}`;
    const { nameChart, outerExpression, soulUrge } = calculatePowerOfName(name);
    setNameChart(nameChart);
    setBirthChart(calculateBirthChart(dobStr));
    setRulingNumber(calculateRulingNumber(dobStr));
    setCompleteNameNumber({
      soulUrge: calculateCompleteNameNumber(soulUrge),
      outerExpression: calculateCompleteNameNumber(outerExpression),
    });
  }

  const [rulingNumber, setRulingNumber] = useState(0);
  const [birthChart, setBirthChart] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [nameChart, setNameChart] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [compoundChart, setCompoundChart] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const isolatedNumbers = calculateIsolatedNumber(compoundChart);
  const [completeNameNumber, setCompleteNameNumber] = useState({
    soulUrge: 0,
    outerExpression: 0,
  });
  useEffect(() => {
    const newCompoundChart = birthChart.map(
      (value, index) => value + nameChart[index]
    );
    setCompoundChart(newCompoundChart);
  }, [birthChart, nameChart]);
  return (
    <main className="flex flex-col items-center justify-between px-12 gap-5 pb-12 ">
      <Header />
      <h1 className="mt-24 font-bold">Tra cứu thần số học</h1>
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
                <FormDescription>Ngày sinh dương lịch của bạn</FormDescription>
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
                    placeholder="Nhập tên không dấu"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Tên thường gọi của bạn <br />{" "}
                  <i>Ví dụ: An, Đức Anh, Olivia, Đăng Quang,...</i>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Tra cứu</Button>
        </form>
      </Form>

      {!!rulingNumber && (
        <div className="sm:w-[600px] lg:w-[900px] flex items-center flex-col gap-5">
          <Separator></Separator>
          <h2 className="font-bold ">
            Số chủ đạo{" "}
            <span className="bg-gradient-to-t inline-block  from-pink-500 to bg-yellow-400 rounded-full w-10 h-10 text-center leading-10 font-bold text-white background-animate ">
              {rulingNumber}
            </span>
          </h2>
          <blockquote className="text-justify text-sm">
            Khi chúng ta ghi nhận vị trí chỉ huy của nó ở đầu mặt phẳng tâm trí,
            chúng ta nhận ra lý do tại sao rất nhiều sự nhấn mạnh được đặt vào
            suy nghĩ và lý luận của những người có số chủ đạo là 3. Đây là những
            người có số ngày sinh tổng cộng 12, 21, 30, 39 hoặc 48.
            <QuoteIcon />
          </blockquote>
          <RulingInfo
            lifePurpose={
              "Những người này có một khả năng đặc biệt để làm việc với và dưới sự hướng dẫn của lãnh đạo năng động. Nếu không có điều này, họ có thể cảm thấy lạc lõng. Họ thường không phải là nhà lãnh đạo, hiếm khi sở hữu mong muốn lãnh đạo, nhưng họ có một khả năng độc đáo để tìm kiếm và liên kết với loại người hoặc tổ chức mà khả năng siêng năng của họ có thể được đánh giá cao nhất. Vai trò đặc biệt của họ là bổ sung bằng cách cung cấp hỗ trợ trung thành, trực quan."
            }
            bestExpression={
              "Mặc dù cực kỳ có khả năng và tự tin khi được phép làm việc với tốc độ ổn định của riêng họ, Phán quyết 2 có thể cảm thấy không an toàn nếu gánh nặng căng thẳng và cấp bách dai dẳng. Họ phải được phép tiến bộ theo tốc độ tự nhiên của riêng họ, vì họ thích củng cố khi họ đi. Họ đặc biệt danh dự và không thích sự chính trực của họ bị nghi ngờ - điều này cũng sẽ làm suy yếu sự tự tin của họ. Biểu hiện tốt nhất của họ thường là thông qua việc sử dụng bàn tay nhạy cảm, chẳng hạn như trong nghệ thuật hoặc bằng văn bản, nhưng luôn luôn khi được hướng dẫn bởi trực giác trung thành của họ."
            }
            distinctiveTraits={
              "Họ là những người trực quan, nhạy cảm, đáng tin cậy, siêng năng và từ bi. Họ là những người kiến tạo hòa bình, đôi khi đến mức cải cách (và trong thời đại nhận thức đang nổi lên hiện nay, đây là một khả năng rất có giá trị). Cầm quyền 2 ít bị thúc đẩy bởi cái tôi hơn hầu hết mọi người, thể hiện sự nhạy bén vị tha và cao quý khi có thể hợp nhất cái tôi của họ với cái tôi của người khác khi mong muốn hoặc cần thiết."
            }
            negativeTendenciesToBeSurmounted={
              "Một số người cầm quyền 2 không nhận ra rằng sự phát triển vốn có của họ phải là kết quả của sự tham gia cá nhân. Chủ nghĩa duy vật hoặc một cảm giác sai lầm về tính ích kỷ sẽ thúc đẩy họ trở nên bất mãn, cáu kỉnh và thất vọng. Nhưng những đặc điểm này vừa hiếm vừa không tự nhiên đối với họ. Trong trường hợp tình huống như vậy xảy ra, cuối cùng họ sẽ nhận ra sự khởi đầu từ con đường phát triển tự nhiên của họ. Một lĩnh vực khác của sự thất vọng xuất phát từ việc dựa quá nhiều vào sự hợp lý hóa với chi phí trực giác của họ, vì điều này sẽ dẫn đến sai lầm trong phán đoán."
            }
            recommendedDevelopment={
              "Cầm quyền 2 nên sử dụng khả năng trực giác mạnh mẽ của họ để phát triển sự tự tin và chọn làm bạn bè và cộng sự những người chấp nhận và đánh giá cao những đặc điểm đặc biệt của họ. Điều này rất quan trọng cho sự phát triển cá nhân của họ. Khi trưởng thành, Ruling 2 tự nhiên khám phá ra tầm quan trọng của việc kiểm soát cảm xúc, học cách sử dụng nó như một sự trợ giúp cho biểu hiện nhạy cảm của họ. Nó sẽ mang lại lợi ích đáng kể cho họ để phát triển các khả năng tinh thần của họ, đặc biệt là khả năng suy luận và trí nhớ của họ. Sự phát triển như vậy sẽ neo vững chắc lòng tự trọng của họ và mang lại hạnh phúc cá nhân lớn hơn."
            }
            mostSuitableVocations={
              "Những người này phù hợp nhất để làm trợ lý cá nhân cho quản trị viên, đặc biệt là trong các hoạt động từ thiện hoặc giáo dục. Họ cũng nghệ thuật, với sự nhạy cảm được thể hiện trong hội họa, âm nhạc, bài hát hoặc khiêu vũ, nhưng họ cảm thấy thoải mái hơn khi là một phần của một nhóm, thay vì một nghệ sĩ độc tấu. Họ đôi khi được tìm thấy là các nhà ngoại giao, nhân viên xã hội, thư ký có khả năng và, nếu bị hạn chế bởi thiếu giáo dục, nhân viên xử lý."
            }
            summary={
              "Phán quyết 2 là nhạy cảm, trực quan, hỗ trợ, đáng tin cậy, kiến tạo hòa bình, từ bi và nghệ thuật."
            }
          />
          <h2 className="font-bold">
            Sức mạnh của cái tên{" "}
            <span className="bg-gradient-to-bl inline-block  from-sky-400 to-violet-400 rounded-full w-10 h-10 text-center leading-10 font-bold text-white background-animate ">
              {calculateCompleteNameNumber(
                completeNameNumber.soulUrge + completeNameNumber.outerExpression
              )}
            </span>
          </h2>
          <blockquote className="text-justify text-sm">
            Một trong số những âm thanh được thừa nhận nhất đối với tai của mọi
            người là tên của họ. Chắc chắn bạn đã nhận thấy rằng, cho dù môi
            trường xung quanh ồn ào đến đâu, khi ai đó gọi tên bạn, sự chú ý của
            bạn ngay lập tức chuyển hướng sang họ. Tên của chúng ta đã trở thành
            một âm thanh rất quan trọng đối với chúng ta, cho dù đó là tên, tên
            thú cưng, biệt danh hay bất kỳ tên gọi nào chúng ta thích sử dụng.
            Trên thực tế, tên của chúng ta phải được coi là một phần được chấp
            nhận trong tính cách và biểu hiện của chúng ta. Một cái tên rất quan
            trọng vì những rung động của nó trở nên hợp nhất với chính chúng ta.
            Thuật ngữ rung động ngụ ý không chỉ tần số sóng âm thanh mà thậm chí
            rộng hơn là các rung động biểu tượng của tên như được biểu thị bằng
            mẫu số học của nó. Những rung động này ảnh hưởng đến chính tính cách
            và cá tính của chúng ta.
            <QuoteIcon />
          </blockquote>
          <PowerOfName
            soulUrge={completeNameNumber.soulUrge}
            outerExpression={completeNameNumber.outerExpression}
          />
          <h2 className="font-bold">Kết hợp tên và ngày sinh</h2>
          <blockquote className="text-justify text-sm">
            Khía cạnh thứ ba của số học tên là chìa khóa cho sức mạnh chung của
            tên. Đây được gọi là Số tên đầy đủ. Nó có liên quan đến, nhưng ít
            mạnh hơn Số cầm quyền. Số tên hoàn chỉnh có được bằng cách cộng tất
            cả các số của một tên, sau đó tính tổng chúng theo cách tương tự như
            đã được thực hiện để có được Số cầm quyền. (Hãy nhớ sử dụng tên bạn
            xác định rõ nhất, cho dù đó là tên, biệt hiệu, tên đệm hay tên mới
            mà bạn đã chọn để áp dụng.)
            <br /> Biểu đồ tên có cung cấp bất kỳ điểm mạnh nào cân bằng điểm
            yếu trên Biểu đồ sinh không? Đây là chức năng mong muốn nhất của
            Biểu đồ tên. Ví dụ, nếu Biểu đồ sinh có Mũi tên quá mẫn cảm (số 2, 5
            và 8) và Biểu đồ tên có Mũi tên cân bằng cảm xúc (2, 5 và 8), thì
            chúng ta có sự cân bằng mong muốn nhất. Nếu Biểu đồ tên chỉ có một
            hoặc hai số trên Soul Plane, điều này vẫn có thể cung cấp một số cân
            bằng có giá trị.
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
                      content={
                        "Với sự tỉnh táo tinh thần tăng lên này là một sự nhấn mạnh rõ rệt về trí tưởng tượng của một người và tăng khả năng văn học. Quyền lực như vậy phải được kỷ luật cẩn thận để tạo điều kiện cho sự thể hiện hữu ích nhất và cân bằng nhất của nó, và để tránh những gì có thể trở thành hành vi chống đối xã hội nếu được phép gây bạo loạn. Để tạo điều kiện cho kỷ luật tự giác, việc thực hành thiền định là có giá trị, cùng với việc rèn luyện trí nhớ và phát triển trực giác. Điều này cho phép phát triển các quá trình suy nghĩ mang tính xây dựng hơn. Nếu không, bộ não hoạt động mạnh mẽ của cả 3 sẽ tập trung quá nhiều vào trí tưởng tượng gây bất lợi cho việc lập kế hoạch khách quan, điều tra và hiểu biết tích cực. Khi làm như vậy, họ có xu hướng đánh mất thực tế. Hầu hết những người có hai hoặc ba số 3 trên Biểu đồ sinh của họ có khả năng viết đáng kể, mặc dù họ hiếm khi nhận ra điều này mà không có sự giúp đỡ từ bên ngoài. Họ cần được khuyến khích đặt những suy nghĩ và tưởng tượng của họ lên giấy, vì điều này sẽ kích thích một biểu hiện văn học tự do. Đổi lại, biểu hiện như vậy sẽ giúp những người này chuyển chất lượng có khả năng tràn lan này, và có lẽ dễ dàng biến nó thành một nguồn thu nhập sinh lợi."
                      }
                    >
                      <span>{"3".repeat(birthChart[2])}</span>
                      <span className="text-cyan-600">
                        {"3".repeat(nameChart[2])}
                      </span>
                    </MeaningOfNumber>
                  </TableCell>
                  <TableCell className="border-r font-bold  ">
                    <MeaningOfNumber content={"Hello"}>
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
                            Khi các số 5, 6 và 8 bị thiếu trong Biểu đồ sinh và
                            người đó có một hoặc nhiều số 9 (như tất cả trong
                            thế kỷ 20), cá nhân đó thể hiện chủ nghĩa lý tưởng
                            không thực tế, tham vọng đơn phương hoặc cả hai.
                            Điều này thường phụ thuộc vào số 9 trên Biểu đồ
                            sinh. Nếu một số 9 duy nhất, nó thường là dấu hiệu
                            của tham vọng chưa được thực hiện; nếu một số 9 kép,
                            chủ nghĩa duy tâm không thực tế; Nếu ba hoặc bốn số
                            9, cả hai đều có thể chiếm ưu thế. Từ các biện pháp
                            khắc phục được khuyến nghị cho các số bị cô lập
                            khác, kỹ thuật này rõ ràng rất dễ thực hiện. Trong
                            trường hợp này, phẩm chất của 5, sau đó là 6 và 8
                            cần được khắc sâu vào biểu hiện của người đó. Trong
                            số này, có lẽ 5 là quan trọng nhất nếu người đó
                            không có số 7 trên Biểu đồ sinh của họ, vì năm người
                            sẽ liên kết số 9 với biểu hiện thông qua bản ngã của
                            số 1. Nếu chúng cũng có 7, thì lũy thừa của cả hai
                            số (5 và 8) nên được phát triển để kết nối tối ưu
                            giữa chủ nghĩa lý tưởng tham vọng của 9 và Mặt phẳng
                            thực hành vật lý.
                          </p>
                        )
                      }
                      content={
                        "Tham vọng, trách nhiệm và chủ nghĩa lý tưởng - đây là ba phẩm chất chính của 9. Sức mạnh này đã là nền tảng của động lực của nhân loại trong thế kỷ qua, chịu trách nhiệm cho nỗ lực của chúng ta để tìm hiểu thêm về cuộc sống và kiểm soát nó nhiều hơn. Không phải là nó dường như đã thành công rất tốt. Mặc dù chúng ta biết vô hạn nhiều hơn về môi trường của chúng ta và con người là gì so với đầu thế kỷ 20, chúng ta cũng có nhiều suy thoái môi trường, bệnh tật và đau khổ của con người và nạn đói và nghèo đói lan rộng hơn bất cứ lúc nào trong hai thế kỷ qua. Chuyện gì đã xảy ra? Có thể là quá nhiều sự tập trung đã được đặt vào tham vọng và không đủ vào trách nhiệm và chủ nghĩa lý tưởng?"
                      }
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
                    <MeaningOfNumber content={""}>
                      <span>{"2".repeat(birthChart[1])}</span>
                      <span className="text-cyan-600">
                        {"2".repeat(nameChart[1])}
                      </span>
                    </MeaningOfNumber>
                  </TableCell>
                  <TableCell className="border-r font-bold  ">
                    <MeaningOfNumber content={""}>
                      <span>{"5".repeat(birthChart[4])}</span>
                      <span className="text-cyan-600">
                        {"5".repeat(nameChart[4])}
                      </span>
                    </MeaningOfNumber>
                  </TableCell>
                  <TableCell className=" font-bold">
                    <MeaningOfNumber content={""}>
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
                            Khi các số 2, 5 và 4 bị thiếu trong Biểu đồ sinh, số
                            1 sẽ bị cô lập với tất cả các số khác. Vì 1 là con
                            số tượng trưng cho sự thể hiện của bản ngã con
                            người, sự cô lập của nó trên Biểu đồ sinh cho thấy
                            lý do tại sao những người này thường cảm thấy bị cô
                            lập và hiểu lầm khi họ cố gắng giải thích cảm xúc
                            của mình cho người khác, đặc biệt nếu họ có 1 1 duy
                            nhất. Biểu đồ sinh như vậy sẽ có sự tập trung nhiều
                            của các con số trên Mặt phẳng Tâm trí và / hoặc trên
                            Mũi tên Hoạt động. Sự tập trung nhiều của các con số
                            trên Mũi tên hoạt động chỉ ra rằng người đó gặp khó
                            khăn trong việc giải thích rõ ràng cho người khác
                            các khái niệm và / hoặc hành động họ chọn thực hiện.
                            Nếu số lượng của họ tập trung nhiều hơn vào Mặt
                            phẳng Tâm trí, người đó có thể bị coi là lười biếng
                            hoặc không đáng tin cậy vì rất nhiều điều đang diễn
                            ra trong đầu họ sẽ không được chuyển thành biểu hiện
                            thực tế hoặc vì họ cam kết làm những việc hiếm khi
                            được thực hiện. Điều này có thể khiến người khác
                            nghĩ rằng những người bị cô lập là không đáng tin
                            cậy khi, nếu có hiệu lực, họ hầu như không nhận thức
                            được khía cạnh này trong bản chất của họ. Trừ khi nó
                            được sửa chữa, nó có thể dẫn đến sự cô đơn để bản
                            ngã bị cô lập phóng đại thành một người bị cô lập.
                            Sửa chữa là dễ dàng. Đối với mỗi số bị cô lập, một
                            chất lượng còn thiếu sẽ tích hợp Biểu đồ sinh và khử
                            cô lập từng số được đại diện bởi số 5 ở trung tâm
                            của Biểu đồ sinh. Nói chung, điều này ngụ ý sự cần
                            thiết cho bất kỳ người nào có một hoặc nhiều số bị
                            cô lập để phát triển tình yêu và lòng trắc ẩn hơn
                            trong biểu hiện của họ, và học cách tự do thể hiện
                            cảm xúc tích cực của họ hơn là đóng chai chúng. Khi
                            chỉ có số 1 bị cô lập, việc phát triển các phẩm chất
                            được chỉ ra bởi 2 hoặc 4 cũng có thể giúp ích. Ví
                            dụ, phát triển trực giác của 2 để biểu hiện của bản
                            ngã có thể được kết nối với sức mạnh của phân tích
                            (3), và thực hành với logic được cải thiện, kiên
                            nhẫn và thực tế của 4.
                          </p>
                        )
                      }
                      content={""}
                    >
                      <span>{"1".repeat(birthChart[0])}</span>
                      <span className="text-cyan-600">
                        {"1".repeat(nameChart[0])}
                      </span>
                    </MeaningOfNumber>
                  </TableCell>
                  <TableCell className="border-r font-bold  ">
                    <MeaningOfNumber content={""}>
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
                            Khi một hoặc nhiều số 7 chiếm góc dưới bên phải của
                            Biểu đồ sinh mà không có 4, 5 hoặc 8 tiếp xúc với
                            họ, những hy sinh và bài học mà người đó học được
                            thường nhất thiết phải lặp lại. Kinh nghiệm học tập
                            phải được dịch sang tâm trí, để bài học của nó được
                            nhận ra và hiểu. Nhưng khi khu vực học tập này bị cô
                            lập khỏi Mặt phẳng Tâm trí, những bài học tương tự
                            hoặc tương tự phải được lặp lại cho đến khi, bằng
                            tần suất, chúng được nhận ra. Điều này ngụ ý rằng
                            những người này có thể mất sức khỏe, tình yêu hoặc
                            tài sản tiền bạc trong những dịp lặp đi lặp lại cho
                            đến khi bài học thích hợp được mang về nhà cho họ.
                            Mặc dù điều này thường gây tổn thương cho người hy
                            sinh, nhưng họ có xu hướng chấp nhận nó như là định
                            mệnh hoặc không thể tránh khỏi. Nỗi đau thường có vẻ
                            tồi tệ hơn đối với bạn bè và những người thân yêu
                            của người phải hy sinh. Hãy nhớ rằng, 7 là số lượng
                            hiểu biết triết học, vì vậy người có 7 hoặc 7 bị cô
                            lập có thể hiểu rõ hơn về những gì đã xảy ra với họ
                            sau đó là những người xung quanh. Để giảm thiểu tổn
                            thương hoặc hy sinh, người đó cần phát triển sức
                            mạnh vốn có trong các số 4, 5 và 8. Chúng tôi đã đề
                            cập đến các phẩm chất của 4 và 5 với các số bị cô
                            lập nói trên, nhưng bây giờ chúng tôi thấy rằng sự
                            phát triển của 4 giúp 7 bị cô lập thống nhất với
                            biểu hiện bản ngã của 1 để cảm thấy ổn khi yêu cầu
                            giúp đỡ hoặc hướng dẫn. Đồng thời, điều này phát
                            triển Mũi tên thực tiễn để người đó phát triển một
                            cách tiếp cận thực tế đối với trải nghiệm cuộc sống
                            của họ. Để phát triển sức mạnh của số 8 trên Biểu đồ
                            sinh, 7 người bị cô lập phải trở nên khôn ngoan hơn
                            khi áp dụng trực giác thực tế thông qua hành động
                            yêu thương. Điều này cũng giúp phát triển ý thức độc
                            lập của họ, và cuối cùng xây dựng Mũi tên hoạt động.
                            Ở đây, 5 và 8 hoạt động hoàn toàn hài hòa, cung cấp
                            một cơ hội tuyệt vời cho sự phát triển của Mặt phẳng
                            linh hồn của người đó.
                          </p>
                        )
                      }
                      content={
                        <p>
                          Là con số cao nhất của Mặt phẳng Vật lý, 7 đại diện
                          cho một chức năng đặc biệt của cuộc sống con người. Nó
                          chỉ ra số lượng học tập mà một người phải tích lũy,
                          nói chung thông qua hình thức kinh nghiệm cá nhân khó
                          quên được gọi là hy sinh. Ý nghĩa triết học sâu sắc
                          hơn của nó nằm ở hai lĩnh vực, về mặt vật lý, 7 đại
                          diện cho hoạt động thực tiễn như là phương tiện để học
                          tập và giảng dạy hoàn hảo; Về mặt tâm linh, số 7 là
                          con số đền thờ, kho lưu trữ triết học, sự thật và trí
                          tuệ. Điều này càng cho thấy sự cần thiết phải tách rời
                          khỏi tài sản thế gian để hợp nhất thể xác và linh hồn.
                        </p>
                      }
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
            compoundChart={compoundChart}
          ></BirthNameChartInfo>
        </div>
      )}
    </main>
  );
}
