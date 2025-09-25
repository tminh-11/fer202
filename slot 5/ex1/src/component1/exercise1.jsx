export function Exercise1() {
  // Arrow function
  const double = (x) => x * 2;
  const isEven = (x) => x % 2 === 0;

  return (
    <>
      <p>Hello <strong>Exercise 1</strong></p>
      <h2>Chi tiết bài tập 1</h2>
      <p>double(7): {double(7)}</p>
      <p>isEven(10): {isEven(10) ? "True" : "False"}</p>
      <p>isEven(7): {isEven(7) ? "True" : "False"}</p>
    </>
  );
}

