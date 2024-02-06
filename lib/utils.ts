import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
  console.log(compoundChart);
  console.log(individualArrows);
  console.log(missingArrows);
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
