import { TPeak } from "@/components/cycle/peak";
import { TPersonalYear } from "@/components/cycle/personal-year";
import { Arrow } from "@/components/home/birth-name-chart-info";
const baseURL = "https://numerology-qdl0.onrender.com/api";
// const baseURL = "http://localhost:2024/api";
export async function getRulingNumberMeaning(rn: number) {
  // const res = await fetch(
  //   `https://numerology-qdl0.onrender.com/api/ruling-number/${rn}`
  // );
  const res = await fetch(`${baseURL}/ruling-number/${rn}`);
  const data = await res.json();
  return data;
}
export async function getPowerOfNameMeaning(
  soulUrge: number,
  outerExpression: number
) {
  // const res = await fetch(
  //   `https://numerology-qdl0.onrender.com/api/power-of-name/${soulUrge}/${outerExpression}`
  // );
  const res = await fetch(
    `${baseURL}/power-of-name/?soulUrge=${soulUrge}&outerExpression=${outerExpression}`
  );
  const data = await res.json();
  return data;
}
export async function getChartMeaning(chart: number[]) {
  const body = JSON.stringify({ chart });
  console.log(body);
  const res = await fetch(`${baseURL}/chart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  const data = await res.json();
  return data;
}

export async function getArrowMeaning(arrow: string, filled: boolean) {
  const res = await fetch(`${baseURL}/arrow?arrow=${arrow}&filled=${filled}`);
  const data = await res.json();
  return data;
}
export async function getArrowsDoc(
  individualArrows: Arrow[],
  missingArrows: Arrow[]
) {
  console.log("individualArrows", individualArrows);
  console.log("missingArrows", missingArrows);
  const individualArrowsDocPromises = individualArrows.map(async (arrow) => {
    const arrowMeaning = await getArrowMeaning(arrow.key, true);
    return {
      key: arrow.key,
      value: arrow.value,
      meaning: arrowMeaning,
    };
  });

  const missingArrowsDocPromises = missingArrows.map(async (arrow) => {
    const arrowMeaning = await getArrowMeaning(arrow.key, false);
    return {
      key: arrow.key,
      value: arrow.value,
      meaning: arrowMeaning,
    };
  });

  const individualArrowsDoc = await Promise.all(individualArrowsDocPromises);
  const missingArrowsDoc = await Promise.all(missingArrowsDocPromises);
  console.log("individualArrowsDoc", individualArrowsDoc);
  console.log("missingArrowsDoc", missingArrowsDoc);

  return { individualArrowsDoc, missingArrowsDoc };
}
export async function getDayMeaning(number: number) {
  const res = await fetch(`${baseURL}/day?number=${number}`);
  return await res.json();
}
export async function getPersonalYearMeaning(py: number) {
  const res = await fetch(`${baseURL}/personal-year?personalYear=${py}`);
  const data = (await res.json()) as TPersonalYear[];
  return data;
}
export async function getPeakMeaning(peak: number) {
  const res = await fetch(`${baseURL}/peak?number=${peak}`);
  const data = (await res.json()) as TPeak;
  return data;
}
