import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function removeVietnameseDiacritics(str: string) {
  str = str.toLowerCase();
  // Chuyển đổi các ký tự có dấu sang không dấu
  str = str.replace(/[àáảãạăắằẳẵặâầấẩẫậ]/g, "a");
  str = str.replace(/[èéẻẽẹêềếểễệ]/g, "e");
  str = str.replace(/[ìíỉĩị]/g, "i");
  str = str.replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, "o");
  str = str.replace(/[ùúủũụưừứửữự]/g, "u");
  str = str.replace(/[ỳýỷỹỵ]/g, "y");
  str = str.replace(/đ/g, "d");
  // Loại bỏ các ký tự không phải chữ cái, số hoặc dấu cách
  str = str.replace(/[^a-z0-9\s]/g, "");
  return str;
}
export function calculateRulingNumber(sum: string) {
  let rn = sum.split("").reduce((a, b) => a + parseInt(b), 0);
  while (rn > 11 && rn !== 22) {
    console.log(rn);
    rn = +rn
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }
  return rn;
}
export function calculateWorldYear(year: string) {
  let wy = year.split("").reduce((a, b) => a + parseInt(b), 0);
  while (wy > 9) {
    wy = +wy
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }
  return wy;
}
export function calculateBottomPeaks(number: string) {
  console.log(number);
  let num = number.split("").reduce((a, b) => a + parseInt(b), 0);
  while (num > 9) {
    num = +num
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }
  return num;
}
export function calculateCompleteNameNumber(num: number) {
  while (num > 11 && num !== 22) {
    console.log(num);
    num = +num
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }
  return num;
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
function isVowel(name: string) {
  const vowels = ["a", "e", "i", "o", "u", "y"];
  return vowels.includes(name.toLowerCase());
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
  let soulUrge = 0;
  let outerExpression = 0;
  nameArray.forEach((letter) => {
    for (const [key, value] of Object.entries(numberDict)) {
      if (value.includes(letter)) {
        nameChart[+key - 1] += 1;
        if (isVowel(letter)) {
          soulUrge += +key;
          console.log("soulUrge: ", soulUrge);
        } else {
          outerExpression += +key;
          console.log("outerExpression: ", outerExpression);
        }
      }
    }
  });
  soulUrge = calculateCompleteNameNumber(soulUrge);
  outerExpression = calculateCompleteNameNumber(outerExpression);
  const completeNameNumber = calculateCompleteNameNumber(
    soulUrge + outerExpression
  );
  return { nameChart, soulUrge, outerExpression, completeNameNumber };
}

export function calculateArrows(compoundChart: number[]) {
  const arrowsDict = {
    "one-five-nine": [1, 5, 9],
    "three-five-seven": [3, 5, 7],
    "three-six-nine": [3, 6, 9],
    "two-five-eight": [2, 5, 8],
    "one-four-seven": [1, 4, 7],
    "three-two-one": [3, 2, 1],
    "six-five-four": [6, 5, 4],
    "seven-eight-nine": [7, 8, 9],
  };
  let individualArrows = [];
  let missingArrows = [];
  for (const [key, value] of Object.entries(arrowsDict)) {
    let count = value.filter((num) => compoundChart[num - 1]).length;
    if (count === value.length) {
      individualArrows.push({ key, value });
    } else if (count === 0) {
      missingArrows.push({ key, value });
    }
  }
  console.log("compoundChart", compoundChart);
  console.log("individualArrows", individualArrows);
  console.log("missingArrows", missingArrows);
  return { individualArrows, missingArrows };
}
export function calculateIsolatedNumber(compoundChart: number[]) {
  const isolatedDict = {
    1: [2, 4, 5],
    3: [2, 5, 6],
    7: [4, 5, 8],
    9: [5, 6, 8],
  };
  let isolatedNumbers: number[] = [];
  for (const [key, value] of Object.entries(isolatedDict)) {
    let count = value.filter((num) => compoundChart[num - 1]).length;
    if (count === 0 && compoundChart[+key - 1]) {
      isolatedNumbers.push(+key);
    }
  }
  return isolatedNumbers;
}
