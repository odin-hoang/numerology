import { Arrow } from "@/app/birth-name-chart-info";
const baseURl = "https://numerology-qdl0.onrender.com/api";
export async function getRulingNumberMeaning(rn: number) {
  // const res = await fetch(
  //   `https://numerology-qdl0.onrender.com/api/ruling-number/${rn}`
  // );
  const res = await fetch(`${baseURl}/ruling-number/${rn}`);
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
    `${baseURl}/power-of-name/?soulUrge=${soulUrge}&outerExpression=${outerExpression}`
  );
  const data = await res.json();
  return data;
}
export async function getChartMeaning(chart: number[]) {
  const body = JSON.stringify({ chart });
  console.log(body);
  const res = await fetch(`${baseURl}/chart`, {
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
  const res = await fetch(`${baseURl}/arrow?arrow=${arrow}&filled=${filled}`);
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
