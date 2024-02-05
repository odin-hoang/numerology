import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function calculateRulingNumber(sum: string) {
  let rn = sum.split("").reduce((a, b) => a + parseInt(b), 0);
  while (rn > 9 && rn !== 11 && rn !== 22) {
    console.log(rn);
    rn = +rn
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }
  return rn;
}
export function calculateBirthChart(dob: string) {
  let newBirthChart = Array(9).fill(0);
  for (let i = 0; i < dob.length; i++) {
    const num = +dob[i];
    if (!isNaN(num) && num > 0) {
      newBirthChart[num - 1] += 1;
    }
  }
  return newBirthChart;
}
export function calculatePowerOfName(name: string) {
  const numberDict = {
    1: ["a", "j", "s"],
    2: ["b", "k", "t"],
    3: ["c", "l", "u"],
    4: ["d", "m", "v"],
    5: ["e", "n", "w"],
    6: ["f", "o", "x"],
    7: ["g", "p", "y"],
    8: ["h", "q", "z"],
    9: ["i", "r"],
  };
  const nameArray = name.toLowerCase().split("");
  const nameChart = Array(9).fill(0);
  nameArray.forEach((letter) => {
    for (const [key, value] of Object.entries(numberDict)) {
      if (value.includes(letter)) {
        nameChart[+key - 1] += 1;
      }
    }
  });
  return nameChart;
}
