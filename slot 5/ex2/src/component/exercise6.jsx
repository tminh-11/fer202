import { useState } from "react";

export function Exercise6() {
  const companies = [
    { name: "Company A", category: "Finance", start: 1981, end: 2003 },
    { name: "Company B", category: "Retail", start: 1992, end: 2008 },
    { name: "Company C", category: "Auto", start: 1999, end: 2007 },
    { name: "Company D", category: "Retail", start: 1989, end: 2010 },
    { name: "Company E", category: "Technology", start: 2009, end: 2014 },
    { name: "Company F", category: "Finance", start: 1987, end: 2010 },
  ];

  const [limit, setLimit] = useState(3);

  const sorted = [...companies].sort((a, b) => a.end - b.end);
  const top = sorted.slice(0, limit);

  return (
    <div>
      <h2>Exercise 6 - Sort + Slice</h2>
      <label>
        Hiển thị bao nhiêu công ty:{" "}
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
        </select>
      </label>
      <ul>
        {top.map((c, i) => (
          <li key={i}>
            {c.name} ({c.end})
          </li>
        ))}
      </ul>
    </div>
  );
}
