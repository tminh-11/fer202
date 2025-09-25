export function Exercise4() {
  const ages = [33, 12, 20, 16];

  const [first, , third = 0, ...restAges] = ages;

  return (
    <div>
      <h3>Exercise 4 – Destructuring Array</h3>
      <p>First: {first}</p>
      <p>Third: {third}</p>
      <p>RestAges: {restAges.join(", ")}</p>
    </div>
  );
}
