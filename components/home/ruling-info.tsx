import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
interface RulingInfoProps {
  summary: React.ReactNode;
  lifePurpose: React.ReactNode;
  bestExpression: React.ReactNode;
  distinctiveTraits: React.ReactNode;
  negativeTendenciesToBeSurmounted: React.ReactNode;
  recommendedDevelopment: React.ReactNode;
  mostSuitableVocations: React.ReactNode;
}
const RulingInfo = ({
  summary,
  lifePurpose,
  bestExpression,
  distinctiveTraits,
  negativeTendenciesToBeSurmounted,
  recommendedDevelopment,
  mostSuitableVocations,
}: RulingInfoProps) => {
  return (
    <motion.div
      className="w-full"
      initial={{
        opacity: 0,
        x: -50,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
        },
      }}
      viewport={{ once: true }}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="summary">
          <AccordionTrigger>Tóm tắt</AccordionTrigger>
          <AccordionContent className="text-justify">
            {summary}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="lifePurpose">
          <AccordionTrigger>Mục đích sống</AccordionTrigger>
          <AccordionContent className="text-justify">
            {lifePurpose}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="bestExpression">
          <AccordionTrigger>Biểu hiện tốt nhất</AccordionTrigger>
          <AccordionContent className="text-justify">
            {bestExpression}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="distinctiveTraits">
          <AccordionTrigger>Đặc điểm nổi bật</AccordionTrigger>
          <AccordionContent className="text-justify">
            {distinctiveTraits}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="negativeTendenciesToBeSurmounted">
          <AccordionTrigger>Xu hướng tiêu cực cần vượt qua</AccordionTrigger>
          <AccordionContent className="text-justify">
            {negativeTendenciesToBeSurmounted}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recommendedDevelopment">
          <AccordionTrigger>Đề xuất phát triển</AccordionTrigger>
          <AccordionContent className="text-justify">
            {recommendedDevelopment}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="mostSuitableVocations">
          <AccordionTrigger>Nghề nghiệp phù hợp</AccordionTrigger>
          <AccordionContent className="text-justify">
            {mostSuitableVocations}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default RulingInfo;
