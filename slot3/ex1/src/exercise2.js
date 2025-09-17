/*Rest parameter – tính tổng và trung bình
//Mục tiêu: Nhận số lượng tham số bất kỳ bằng ...args.
Yêu cầu:
Viết sum(...nums) trả về tổng các số hợp lệ (bỏ NaN, string không số).
Viết avg(...nums) trả về trung bình (2 chữ số thập phân), nếu rỗng trả 0.
In: sum(1,2,3), sum(1,'x',4), avg(1,2,3,4), avg().
Ràng buộc: Dùng rest parameter + reduce.*/

const sum = (...nums) => {
    return nums
    .filter(n => typeof n === "number" && !isNaN(n))
    .reduce((acc, val) => acc + val, 0);
};

const avg = (...nums) => {
    const validNums = nums.filter(n => typeof n ==="number" && !isNaN(n));
    if (validNums.length === 0) return 0;
    const total = validNums.reduce((acc, val) => acc + val, 0);
    return (total / validNums.length).toFixed(2);
}

console.log(sum(1, 2, 3));
console.log(sum(1, 'x', 4));
console.log(avg(1, 2, 3, 4));
console.log(avg());