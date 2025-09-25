import { useState } from "react";

export function Exercise8() {
  const [ages, setAges] = useState([33, 12, 20, 16, 19, 25, 13, 40]);
  const [newAge, setNewAge] = useState("");

  const stats = ages.reduce(
    (acc, age) => {
      acc.total += age;
      acc.min = Math.min(acc.min, age);
      acc.max = Math.max(acc.max, age);

      if (age >= 13 && age <= 19) acc.buckets.teen++;
      else if (age >= 20) acc.buckets.adult++;

      return acc;
    },
    { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } }
  );

  const handleAddAge = () => {
    const num = Number(newAge);
    if (!isNaN(num)) {
      setAges([...ages, num]);
      setNewAge("");
    }
  };

  return (
    <div>
      <h2>Exercise 8 - Reduce Nâng Cao</h2>
      <p>
        Total: {stats.total}, Min: {stats.min}, Max: {stats.max}
      </p>
      <p>Buckets: teen: {stats.buckets.teen}, adult: {stats.buckets.adult}</p>

      <h3>Danh sách tuổi hiện tại:</h3>
      <p>{ages.join(", ")}</p>

      <input
        value={newAge}
        onChange={(e) => setNewAge(e.target.value)}
        placeholder="Nhập tuổi mới"
      />
      <button onClick={handleAddAge}>Thêm tuổi</button>
    </div>
  );
}
