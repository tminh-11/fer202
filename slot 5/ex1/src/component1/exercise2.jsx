export function Exercise2() {
  // Khai báo mảng số nguyên
  const numbers = [1, -20, 13, 4, -5, 6, 9, -10, 8, 7, -15];
  // Khai báo mảng chuỗi name
  const names = ["An", "Tinh", "Cuong", "Phuuc", "Hung"];
  // Khai báo mảng people gồm 10 phần tử
  const people = [
    { id: 1, name: "An", age: 20 },
    { id: 2, name: "Tinh", age: 12 },
    { id: 3, name: "Cuong", age: 19 },
    { id: 4, name: "Phuuc", age: 15 },
    { id: 5, name: "Hung", age: 23 },
    { id: 6, name: "Lan", age: 18 },
    { id: 7, name: "Hoa", age: 18 },
    { id: 8, name: "Mai", age: 19 },
    { id: 9, name: "Diep", age: 11 },
    { id: 10, name: "Vy", age: 23 },
  ];

  // Lọc ra những người tuổi teen
  const teensList = people.filter((p) => p.age >= 13 && p.age <= 19);
  // Tính tổng các phần tử trong mảng
  const sum = numbers.reduce((acc, cur) => acc + cur, 0);

  return (
    <div>
      <h2>Bài exercise 2</h2>

      <p>Các phần tử của mảng:</p>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>

      <p>Tổng các phần tử của mảng: <strong>{sum}</strong></p>
      <p>Số lượng phần tử: {numbers.length}</p>

      <p>Hiển thị danh sách tên tăng dần:</p>
      <ul>
        {names.sort().map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>

      <p>Hiển thị danh sách người tuổi teen:</p>
      <ul>
        {teensList.map((person) => (
          <li key={person.id}>
            {person.name} ({person.age})
          </li>
        ))}
      </ul>
    </div>
  );
}
