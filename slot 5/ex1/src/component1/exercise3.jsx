export function Exercise3() {
  const person = {
    name: "John",
    address: {
      street: "123 Main St",
    },
  };

  const {
    address: { street, city = "Unknown City" },
  } = person;

  return (
    <div>
      <h3>Exercise 3 – Destructuring Object</h3>
      <p>Street: {street}</p>
      <p>City: {city}</p>
    </div>
  );
}
