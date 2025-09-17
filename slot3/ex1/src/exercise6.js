const companies = [
  { name: "Company A", category: "Finance", start: 1981, end: 2003 },
  { name: "Company B", category: "Retail", start: 1992, end: 2008 },
  { name: "Company C", category: "Auto", start: 1999, end: 2007 },
  { name: "Company D", category: "Retail", start: 1989, end: 2010 },
  { name: "Company E", category: "Technology", start: 2009, end: 2014 }
];

const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);

const top3 = sortedCompanies.slice(0, 3);

top3.forEach(c => console.log(`${c.name} - ${c.end}`));
