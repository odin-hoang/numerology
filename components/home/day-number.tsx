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
      <h2 className="font-bold text-center leading-10">
        Con số ngày sinh{" "}
        <span className="bg-gradient-to-t inline-block from-rose-400 to-emerald-400 rounded-full w-9 h-9 text-center leading-9 font-bold text-white">
          {dayNumber}
        </span>
      </h2>
      <p className="text-justify text-sm">{meaning}</p>
    </div>
  );
}
