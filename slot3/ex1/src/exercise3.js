const person = {
    name:"Alice",
    age: 25,
    address: {
        street: "123 District"
    }
};

const {
    address: {
        street,
        city = "Unknown City"
    } = {}
} = person;

console.log(street);
console.log(city);