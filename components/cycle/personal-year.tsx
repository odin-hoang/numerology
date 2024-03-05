import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
export type TPersonalYear = {
  personalYear: number;
  month: number;
  meaning: string;
  description: string;
};
export interface PersonalYearProps {
  py: TPersonalYear[];
}
const PersonalYear = ({ py }: PersonalYearProps) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  return (
    <div>
      <p className="text-left  py-2">{py[0]?.description}</p>
      <Accordion type="single" collapsible className="w-full px-4">
        {py.map((data) => (
          <AccordionItem value={data.month.toString()} key={data.month}>
            <AccordionTrigger
              className={cn(
                "px-2 rounded-sm",
                currentMonth === data.month &&
                  "bg-gradient-to-bl from-sky-400 to-violet-400",
                theme === "dark" && "hue-rotate-90"
              )}
            >
              Tháng {data.month} / {currentYear}
              {currentMonth === data.month && (
                <span className="text-white ">Hiện tại</span>
              )}
            </AccordionTrigger>
            <AccordionContent className="text-left">
              {data.meaning}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PersonalYear;
