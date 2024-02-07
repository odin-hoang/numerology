import React from "react";
interface PowerOfNameProps {
  soulUrge: { number: number; description: string };
  outerExpression: { number: number; description: string };
}
const PowerOfName = ({ soulUrge, outerExpression }: PowerOfNameProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <h4 className="text-left">
          <span className="bg-gradient-to-tr from-blue-500 to bg-green-400 rounded-full text-center leading-9 font-bold bg-clip-text text-transparent">
            Chỉ số tâm hồn{" "}
          </span>
          <span className="bg-gradient-to-tr inline-block from-blue-500 to bg-green-400 rounded-full w-9 h-9 text-center leading-9 font-bold text-white">
            {soulUrge.number}
          </span>
        </h4>
        <p className="text-sm text-justify">{soulUrge.description}</p>
      </div>
      <div className="space-y-2">
        <h4 className="text-left">
          <span className="bg-gradient-to-tr from-red-400 to bg-purple-400 rounded-full text-center leading-9 font-bold bg-clip-text text-transparent">
            Chỉ số thể hiện{" "}
          </span>
          <span className="bg-gradient-to-tr inline-block from-red-400 to bg-purple-400 rounded-full w-9 h-9 text-center leading-9 font-bold text-white">
            {outerExpression.number}
          </span>
        </h4>
        <p className="text-sm text-justify">{outerExpression.description}</p>
      </div>
    </div>
  );
};

export default PowerOfName;
