"use client";
import React, { useEffect, useState } from "react";
import peaks from "@/public/peaks.svg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import NewYear from "@/components/cycle/new-year";
import {
  calculateBottomPeaks,
  calculateCompleteNameNumber,
  calculateWorldYear,
  cn,
} from "@/lib/utils";
import PersonalYear, {
  type TPersonalYear,
} from "@/components/cycle/personal-year";
import { getPersonalYearMeaning } from "@/lib/request";
import Peak from "@/components/cycle/peak";
import { Metadata } from "next";
import { useTheme } from "next-themes";
const Cycle = () => {
  const searchParams = useSearchParams();
  const day = searchParams.get("day") || "";
  const month = searchParams.get("month") || "";
  const year = searchParams.get("year") || "";
  const rulingNumber = searchParams.get("rulingNumber") || 0;
  const worldYear = new Date().getFullYear();
  const personalYear = calculateBottomPeaks(
    (calculateWorldYear(worldYear.toString()) + +day + +month).toString()
  );
  useEffect(() => {
    (async () => {
      const data = await getPersonalYearMeaning(personalYear);
      setData(data);
    })();
  }, [personalYear]);
  const [data, setData] = useState<TPersonalYear[]>([]);
  const { resolvedTheme } = useTheme();
  return (
    <div className="">
      <h1 className="text-center pb-0 font-bold text-lg">Đỉnh cao cuộc đời</h1>
      <p className="text-center  text-balance pb-4 text-slate-400 ">
        Định hướng nên làm trong năm đỉnh cao
      </p>
      <p className=" text-left pb-4">
        Bốn kim tự tháp được xây dựng để đại diện cho cuộc sống của con người
        qua những năm trưởng thành. Chúng đại diện cho khoảng thời gian 27 năm,
        bao gồm ba chu kỳ, mỗi chu kỳ gồm 9 năm. Độ tuổi mà mỗi người bắt đầu đi
        lên Kim tự tháp được tìm thấy bằng hiệu của con số thần bí 36 và con số
        chủ đạo.
      </p>
      <div className="relative w-80 h-72 mx-auto">
        <div className="absolute left-[50%] w-80 h-72 translate-x-[-50%]">
          <Image
            src={peaks}
            alt="peaks"
            className={cn(
              "w-full h-full object-cover",
              resolvedTheme === "dark" && "filter invert"
            )}
          />
        </div>
        {/* bottom */}
        <h2 className="bottom-[3px] left-[23px] absolute">{month}</h2>
        <h2 className="bottom-[3px] right-[24px] absolute">{year}</h2>
        <h2 className="bottom-[3px] left-[50%] translate-x-[-50%] absolute">
          {calculateBottomPeaks(day)}
        </h2>
        {/* mid */}
        <Peak peak={calculateBottomPeaks(month + day)}>
          <h2 className="absolute bottom-[98px] left-[78px] font-bold bg-gradient-to-t from-teal-500 cursor-pointer rounded-full w-8 text-center leading-8 h-8">
            {calculateBottomPeaks(month + day)}
          </h2>
          <span className="absolute bottom-[98px] left-[78px] font-bold bg-gradient-to-t from-teal-500 cursor-pointer rounded-full w-8 text-center leading-8 h-8 animate-ping"></span>
        </Peak>
        <Peak peak={calculateBottomPeaks(day + year)}>
          <h2 className="absolute bottom-[98px] right-[82px] text-center rounded-full bg-gradient-to-t from-red-500 font-bold w-8 h-8 leading-8 cursor-pointer">
            {calculateBottomPeaks(day + year)}
          </h2>
          <span className="absolute bottom-[98px] right-[82px] text-center rounded-full bg-gradient-to-t from-red-500 font-bold w-8 h-8 leading-8 cursor-pointer animate-ping"></span>
        </Peak>
        <Peak
          peak={calculateCompleteNameNumber(
            calculateBottomPeaks(month + day) + calculateBottomPeaks(day + year)
          )}
        >
          <h2 className="absolute top-[60px] translate-x-[-50%] left-[50%]  text-center rounded-full bg-gradient-to-t from-amber-500 font-bold w-8 h-8 leading-8 cursor-pointer">
            {calculateCompleteNameNumber(
              calculateBottomPeaks(month + day) +
                calculateBottomPeaks(day + year)
            )}
          </h2>
          <span className="absolute top-[60px] translate-x-[-50%] left-[50%]  text-center rounded-full bg-gradient-to-t from-amber-500 font-bold w-8 h-8 leading-8 cursor-pointer ring-offset-1 ring ring-gray-400 animate-pulse"></span>
        </Peak>

        {/* top */}
        <Peak peak={calculateCompleteNameNumber(+month + +year)}>
          <h2 className="absolute top-0 translate-x-[-50%] left-[50%] font-bold w-8 h-8 leading-8 cursor-pointer text-center rounded-full bg-gradient-to-t from-neutral-400">
            {calculateCompleteNameNumber(+month + +year)}
          </h2>
          <span className="absolute top-0 translate-x-[-50%] left-[50%] font-bold w-8 h-8 leading-8 cursor-pointer text-center rounded-full bg-gradient-to-t ring-offset-1 ring ring-slate-400 from-neutral-400 animate-pulse"></span>
        </Peak>

        {/* Age mid */}
        <h2 className="absolute bottom-[70px] left-[83px] ">
          {36 - +rulingNumber}
        </h2>
        <h2 className="absolute bottom-[70px] right-[85px] ">
          {36 - +rulingNumber + 9}
        </h2>
        <h2 className="absolute top-[100px] translate-x-[-50%] left-[50%] ">
          {36 - +rulingNumber + 18}
        </h2>
        {/* top */}
        <h2 className="absolute top-[35px] translate-x-[-50%] left-[50%] ">
          {36 - +rulingNumber + 27}
        </h2>
      </div>
      <h1 className="text-center pt-4 pb-2 font-bold">
        Con số năm cá nhân {worldYear}
      </h1>
      <div className="text-center">
        <span
          className={cn(
            "bg-gradient-to-bl inline-block  from-sky-400 to-violet-400 rounded-full w-10 h-10 text-center leading-10 font-bold text-white background-animate ring",
            resolvedTheme === "dark" && "filter hue-rotate-90"
          )}
        >
          {personalYear}
        </span>
      </div>
      <PersonalYear py={data}></PersonalYear>
    </div>
  );
};

export default Cycle;
