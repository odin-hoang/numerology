import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
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
  return (
    <div>
      <p className="text-justify text-sm py-2">{py[0]?.description}</p>
      <Accordion type="single" collapsible className="w-full px-4">
        {py.map((data) => (
          <AccordionItem value={data.month.toString()} key={data.month}>
            <AccordionTrigger
              className={cn(
                "px-2 rounded-sm",
                currentMonth === data.month &&
                  "bg-gradient-to-tr from-cyan-300 to-sky-400"
              )}
            >
              Tháng {data.month}
            </AccordionTrigger>
            <AccordionContent className="text-justify">
              {data.meaning}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PersonalYear;
