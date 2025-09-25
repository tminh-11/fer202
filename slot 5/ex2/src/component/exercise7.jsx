import { useState } from "react";

export function Exercise7() {
  const companies = [
    { name: "Company A", category: "Finance", start: 1981, end: 2003 },
    { name: "Company B", category: "Retail", start: 1992, end: 2008 },
  ];

  const company0New = { ...companies[0], start: companies[0].start + 1 };

  const concatAll = (...arrays) => arrays.reduce((acc, cur) => [...acc, ...cur], []);

  // Tính năng mới: nhập chuỗi số rồi gộp
  const [input1, setInput1] = useState("1,2");
  const [input2, setInput2] = useState("3");
  const [input3, setInput3] = useState("4,5");
  const [merged, setMerged] = useState([]);

  const handleMerge = () => {
    const arr1 = input1.split(",").map(Number);
    const arr2 = input2.split(",").map(Number);
    const arr3 = input3.split(",").map(Number);
    setMerged(concatAll(arr1, arr2, arr3));
  };

  return (
    <div>
      <h2>Exercise 7 - Spread vs Rest</h2>
      <p>
        companies[0]: {companies[0].name}, start {companies[0].start}
      </p>
      <p>
        company0New: {company0New.name}, start {company0New.start}
      </p>

      <div>
        <h3>Nhập mảng để gộp:</h3>
        <input value={input1} onChange={(e) => setInput1(e.target.value)} />{" "}
        <input value={input2} onChange={(e) => setInput2(e.target.value)} />{" "}
        <input value={input3} onChange={(e) => setInput3(e.target.value)} />{" "}
        <button onClick={handleMerge}>Gộp mảng</button>
        <p>Kết quả: {merged.join(", ")}</p>
      </div>
    </div>
  );
}
