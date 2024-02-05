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
export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dob: "",
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
    let sum = day + month + year;
    setNameChart(calculatePowerOfName(name));
    setBirthChart(calculateBirthChart(dobStr));
    setRullingNumber(calculateRulingNumber(sum));
  }

  const [rullingNumber, setRullingNumber] = useState(0);
  const [birthChart, setBirthChart] = useState([0, 3, 2, 0, 0, 0, 0, 0, 0]);
  const [nameChart, setNameChart] = useState([1, 1, 0, 0, 0, 0, 0, 1, 1]);
  const name = "khai";
  return (
    <main className="flex flex-col items-center justify-between px-12 gap-5 pb-12">
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
                <Input className="w-[150px]" type="date" {...field} />
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
                  Tên thường gọi của bạn: Ví dụ: An, Đức Anh, Brian, ...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Tra cứu</Button>
        </form>
      </Form>
      <Separator></Separator>
      <h2>
        Số chủ đạo{" "}
        <span className="bg-gradient-to-t inline-block p-2 from-pink-500 to bg-yellow-400 rounded-full w-10 h-10 text-center font-bold text-white background-animate">
          {rullingNumber}
        </span>
      </h2>
      <div>
        <Table className="w-[210px] h-[210px]">
          <TableCaption>
            Biểu đồ ngày sinh + <span className="text-red-500">tên</span>
          </TableCaption>
          <TableBody>
            <TableRow>
              <TableCell className="border-r ">
                <span>{"3".repeat(birthChart[2])}</span>
                <span className="text-red-500">{"3".repeat(nameChart[2])}</span>
              </TableCell>
              <TableCell className="border-r">
                <span>{"6".repeat(birthChart[5])}</span>
                <span className="text-red-500">{"6".repeat(nameChart[5])}</span>
              </TableCell>
              <TableCell>
                <span>{"9".repeat(birthChart[8])}</span>
                <span className="text-red-500">{"9".repeat(nameChart[8])}</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-r">
                <span>{"2".repeat(birthChart[1])}</span>
                <span className="text-red-500">{"2".repeat(nameChart[1])}</span>
              </TableCell>
              <TableCell className="border-r">
                <span>{"5".repeat(birthChart[4])}</span>
                <span className="text-red-500">{"5".repeat(nameChart[4])}</span>
              </TableCell>
              <TableCell>
                <span>{"8".repeat(birthChart[7])}</span>
                <span className="text-red-500">{"8".repeat(nameChart[7])}</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-r">
                <span>{"1".repeat(birthChart[0])}</span>
                <span className="text-red-500">{"1".repeat(nameChart[0])}</span>
              </TableCell>
              <TableCell className="border-r">
                <span>{"4".repeat(birthChart[3])}</span>
                <span className="text-red-500">{"4".repeat(nameChart[3])}</span>
              </TableCell>
              <TableCell>
                <span>{"7".repeat(birthChart[6])}</span>
                <span className="text-red-500">{"7".repeat(nameChart[6])}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
