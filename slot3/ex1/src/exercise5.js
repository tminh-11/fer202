const people = [
    { name: "Ann", age: 19 },
    { name: "Bob", age: 12 },
    { name: "Cindy", age: 15 },
    { name: "David", age: 22 }
];

const teen = people
    .filter(person => person.age >= 13 && person.age <= 19)
    .map(person => `${person.name} (${person.age})`);

teen.forEach(teen => console.log(teen));