"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  dob: z.date({
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
import { toast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "Tra cứu thần số học cho " + data.name,
      description: (
        <p className="mt-2 w-[120px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {data.dob.getDay() +
              "/" +
              data.dob.getMonth() +
              "/" +
              data.dob.getFullYear()}
          </code>
        </p>
      ),
    });
    console.log(data);
  }

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <h1 className="mb-4 font-bold">Tra cứu thần số học</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày sinh</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd-MM-yyyy")
                        ) : (
                          <span>Chọn 1 ngày</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
                <FormLabel>Tên thường gọi</FormLabel>
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
    </main>
  );
}
