import React from "react";
interface PowerOfNameProps {
  soulUrge: { number: number; description: string };
  outerExpression: { number: number; description: string };
}
import { motion } from "framer-motion";
const variants = {
  hiddenTitle: { opacity: 0, x: 50, scale: 0.8 },
  visibleTitle: { opacity: 1, x: 0, scale: 1, transition: { duration: 1 } },
  hiddenContent: { opacity: 0, x: -50 },
  visibleContent: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  hiddenStagger: { opacity: 0, x: -50 },
  visibleStagger: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const PowerOfName = ({ soulUrge, outerExpression }: PowerOfNameProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <motion.h4
          variants={variants}
          initial="hiddenStagger"
          whileInView="visibleStagger"
          viewport={{ once: true }}
          className="text-left"
        >
          <span className="bg-gradient-to-tr from-blue-500 to bg-green-400 rounded-full text-center leading-9 font-bold bg-clip-text text-transparent">
            Chỉ số tâm hồn{" "}
          </span>
          <span className="bg-gradient-to-tr inline-block from-blue-500 to bg-green-400 rounded-full w-9 h-9 text-center leading-9 font-bold text-white">
            {soulUrge.number}
          </span>
        </motion.h4>
        <p className=" text-justify">{soulUrge.description}</p>
      </div>
      <div className="space-y-2">
        <motion.h4
          className="text-left"
          variants={variants}
          initial="hiddenStagger"
          whileInView="visibleStagger"
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-tr from-red-400 to bg-purple-400 rounded-full text-center leading-9 font-bold bg-clip-text text-transparent">
            Chỉ số thể hiện{" "}
          </span>
          <span className="bg-gradient-to-tr inline-block from-red-400 to bg-purple-400 rounded-full w-9 h-9 text-center leading-9 font-bold text-white">
            {outerExpression.number}
          </span>
        </motion.h4>
        <p className=" text-justify">{outerExpression.description}</p>
      </div>
    </div>
  );
};

export default PowerOfName;
