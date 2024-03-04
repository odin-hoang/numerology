import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { calculateArrows } from "@/lib/utils";
import { CubeIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { getArrowMeaning, getArrowsDoc } from "@/lib/request";
interface BirthNameChartInfoProps {
  individualArrowsDoc: ArrowDoc[];
  missingArrowsDoc: ArrowDoc[];
}
export type Arrow = {
  key: string;
  value: number[];
};
export type ArrowDoc = Arrow & {
  meaning: {
    meaning: string;
  };
};

const BirthNameChartInfo = ({
  individualArrowsDoc,
  missingArrowsDoc,
}: BirthNameChartInfoProps) => {
  const nameArrowsDict = {
    "one-five-nine": ["Mũi tên trì hoãn", "Mũi tên quyết tâm"],
    "three-five-seven": ["Mũi tên hoài nghi", "Mũi tên nhạy bén"],
    "three-six-nine": ["Mũi tên trí nhớ ngắn hạn", "Mũi tên trí tuệ"],
    "two-five-eight": ["Mũi tên mẫn cảm", "Mũi tên cân bằng cảm xúc"],
    "one-four-seven": ["Mũi tên hỗn loạn", "Mũi tên thực tiễn"],
    "three-two-one": ["Mũi tên", "Mũi tên kế hoạch"],
    "six-five-four": ["Mũi tên uất giận", "Mũi tên ý chí"],
    "seven-eight-nine": ["Mũi tên bị động", "Mũi tên hoạt động"],
  };
  return (
    <div className="w-full space-y-2">
      <h4 className="bg-gradient-to-tr from-indigo-500 to-sky-500 rounded-full  leading-9 font-bold bg-clip-text text-transparent text-left">
        Mũi tên cá tính
      </h4>
      {individualArrowsDoc.length ? (
        <Accordion type="single" collapsible className="w-full">
          {individualArrowsDoc.map((ia) => (
            <AccordionItem key={ia.key} value={ia.key}>
              <AccordionTrigger>
                <ArrowRightIcon />
                {nameArrowsDict[ia.key as keyof typeof nameArrowsDict][1]}{" "}
                {ia.value.join("-")}
              </AccordionTrigger>
              <AccordionContent className="text-left ">
                {ia.meaning?.meaning}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className=" text-left">
          Việc thiếu Mũi tên không biểu thị bất kỳ thuộc tính đặc biệt nào khác
          ngoài việc chỉ ra rằng người đó cần dành nhiều thời gian và sự kiên
          trì hơn để phát triển thế mạnh của họ so với những gì có thể có. Họ
          thường là những người khá dễ thích nghi, dễ dàng phù hợp với hầu hết
          các tình huống xã hội và nghề nghiệp. Bài học chính mà họ cần phát
          triển là sự quyết đoán khôn ngoan. <br />
          Trẻ em không có Mũi tên khá dễ tính và thường khá hạnh phúc trong cuộc
          sống. Tuy nhiên, họ không nên coi đó là điều hiển nhiên. Thay vào đó,
          họ nên được khuyến khích với sự chăm sóc yêu thương để làm những việc
          mà họ thích, điều này sẽ giúp họ trở nên quyết đoán hơn về những điều
          đặc biệt quan trọng đối với họ.
        </p>
      )}
      {!!missingArrowsDoc.length && (
        <div>
          <h4 className="bg-gradient-to-r from-rose-500 to-fuchsia-400 rounded-full  leading-9 font-bold bg-clip-text text-transparent text-left">
            Mũi tên vắng mặt
          </h4>
          <Accordion type="single" collapsible className="w-full">
            {missingArrowsDoc.map((ia) => (
              <AccordionItem key={ia.key} value={ia.key}>
                <AccordionTrigger>
                  <CubeIcon />{" "}
                  {nameArrowsDict[ia.key as keyof typeof nameArrowsDict][0]}{" "}
                  {ia.value.join("-")}
                </AccordionTrigger>
                <AccordionContent className="text-left ">
                  {ia.meaning?.meaning}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default BirthNameChartInfo;
