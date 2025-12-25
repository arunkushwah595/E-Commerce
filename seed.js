const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: "Iphone 15pro",
        img: "https://images.unsplash.com/photo-1710023038502-ba80a70a9f53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lJTIwMTUlMjBwcm98ZW58MHx8MHx8fDA%3D",
        price: 130000,
        desc: "Very costly... Aukad ke bahar nahi hai"
    },
    {
        name: "MacBook M4",
        img: "https://images.unsplash.com/photo-1745999133158-6589548672dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hY2Jvb2slMjBtNHxlbnwwfHwwfHx8MA%3D%3D",
        price: 100000,
        desc: "Professional Laptop"
    },
    {
        name: "Ipad",
        img: "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D",
        price: 50000,
        desc: "For Student's Purpose"
    },
    {
        name: "Apple Watch",
        img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
        price: 26900,
        desc: "Wrist Watch"
    },
    {
        name: "Airpods pro",
        img: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWlycG9kcyUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
        price: 18999,
        desc: "Good Music Sound"
    }
]


async function seedDB() {
    // await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Data Seeded Successfully");
}

module.exports = seedDB;