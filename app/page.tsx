"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  calculatePowerOfName,
  calculateRulingNumber,
  cn,
} from "@/lib/utils";
import Header from "@/components/header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import RulingInfo from "../components/rulingInfo";
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
    setNameChart(calculatePowerOfName(name));
    setBirthChart(calculateBirthChart(dobStr));
    setRulingNumber(calculateRulingNumber(dobStr));
  }

  const [rulingNumber, setRulingNumber] = useState(0);
  const [birthChart, setBirthChart] = useState([0, 3, 2, 0, 0, 0, 0, 0, 0]);
  const [nameChart, setNameChart] = useState([1, 1, 0, 0, 0, 0, 0, 1, 1]);
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
                <div className="w-[160px]">
                  <Input className="" type="date" {...field} />
                </div>
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
            <span className="bg-gradient-to-t inline-block p-2 from-pink-500 to bg-yellow-400 rounded-full w-10 h-10 text-center font-bold text-white background-animate ">
              {rulingNumber}
            </span>
          </h2>
          <blockquote className="text-justify text-sm">
            Khi chúng ta ghi nhận vị trí chỉ huy của nó ở đầu mặt phẳng tâm trí,
            chúng ta nhận ra lý do tại sao rất nhiều sự nhấn mạnh được đặt vào
            suy nghĩ và lý luận của những người có số chủ đạo là 3. Đây là những
            người có số ngày sinh tổng cộng 12, 21, 30, 39 hoặc 48.
            <svg
              className="w-8 h-8 text-gray-400 dark:text-gray-600 mt-4 text-center"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
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
          <div>
            <Table className="w-[210px] h-[210px]">
              <TableCaption className="">
                Biểu đồ ngày sinh + <span className="text-red-500">tên</span>
              </TableCaption>
              <TableBody>
                <TableRow>
                  <TableCell className="border-r  ">
                    <span>{"3".repeat(birthChart[2])}</span>
                    <span className="text-red-500">
                      {"3".repeat(nameChart[2])}
                    </span>
                  </TableCell>
                  <TableCell className="border-r  ">
                    <span>{"6".repeat(birthChart[5])}</span>
                    <span className="text-red-500">
                      {"6".repeat(nameChart[5])}
                    </span>
                  </TableCell>
                  <TableCell className=" ">
                    <span>{"9".repeat(birthChart[8])}</span>
                    <span className="text-red-500 ">
                      {"9".repeat(nameChart[8])}
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-r  ">
                    <span>{"2".repeat(birthChart[1])}</span>
                    <span className="text-red-500">
                      {"2".repeat(nameChart[1])}
                    </span>
                  </TableCell>
                  <TableCell className="border-r  ">
                    <span>{"5".repeat(birthChart[4])}</span>
                    <span className="text-red-500">
                      {"5".repeat(nameChart[4])}
                    </span>
                  </TableCell>
                  <TableCell className=" ">
                    <span>{"8".repeat(birthChart[7])}</span>
                    <span className="text-red-500">
                      {"8".repeat(nameChart[7])}
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-r  ">
                    <span>{"1".repeat(birthChart[0])}</span>
                    <span className="text-red-500">
                      {"1".repeat(nameChart[0])}
                    </span>
                  </TableCell>
                  <TableCell className="border-r  ">
                    <span>{"4".repeat(birthChart[3])}</span>
                    <span className="text-red-500">
                      {"4".repeat(nameChart[3])}
                    </span>
                  </TableCell>
                  <TableCell className=" ">
                    <span>{"7".repeat(birthChart[6])}</span>
                    <span className="text-red-500">
                      {"7".repeat(nameChart[6])}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <h2 className="font-bold">Ý nghĩa từng con số trong biểu đồ</h2>
        </div>
      )}
    </main>
  );
}
