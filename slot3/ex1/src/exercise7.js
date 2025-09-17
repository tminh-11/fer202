const companies = [
  { name: "Company A", category: "Finance", start: 1981, end: 2003 },
  { name: "Company B", category: "Retail", start: 1992, end: 2008 }
];

const company0New = { ...companies[0], start: companies[0].start + 1 };

console.log("Original:", companies[0]);  
console.log("New:", company0New);         

const concatAll = (...arrays) => arrays.flat();

console.log(concatAll([1, 2], [3], [4, 5]));
