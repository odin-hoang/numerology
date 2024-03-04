"use client";
import { getDayMeaning } from "@/lib/request";
import React, { useEffect, useState } from "react";
interface DayNumberMeaningProps {
  dayNumber: number;
}
export default function DayNumberMeaning({ dayNumber }: DayNumberMeaningProps) {
  useEffect(() => {
    getDayMeaning(dayNumber).then((data) => {
      setMeaning(data.meaning);
    });
  }, [dayNumber]);
  const [meaning, setMeaning] = useState("");
  return (
    <div>
      <h2 className="font-bold text-center my-4 leading-10">
        <span className="font-merienda ">Con số ngày sinh </span>
        <span className="bg-gradient-to-t inline-block from-rose-400 to-emerald-400 rounded-full w-9 h-9 text-center leading-9 font-bold text-white">
          {dayNumber}
        </span>
      </h2>
      <p className="text-justify ">{meaning}</p>
    </div>
  );
}
