export function Exercise5() {
  const people = [
    { name: "Ann", age: 19 },
    { name: "Tom", age: 12 },
    { name: "Jerry", age: 15 },
    { name: "Lucy", age: 22 },
  ];

  const teens = people
    .filter((p) => p.age >= 13 && p.age <= 19)
    .map((p) => `${p.name} (${p.age})`);

  return (
    <div>
      <h3>Exercise 5 – Map + Filter</h3>
      {teens.map((t, idx) => (
        <p key={idx}>{t}</p>
      ))}
    </div>
  );
}
