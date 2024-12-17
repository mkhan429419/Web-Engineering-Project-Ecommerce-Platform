const mockData = [
  {
    _id: "6761301a540a4d33d4cb4342",
    name: "Product 1",
    description: "This is a description of product 1.",
    price: 29.99,
    image: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
    category: "Tops",
    subCategory: "Casual",
    sizes: ["S", "M", "L"],
    date: Date.now(),
    __v: 0,
  },
  {
    _id: "6761301a540a4d33d4cb4343",
    name: "Product 2",
    description: "This is a description of product 2.",
    price: 39.99,
    image: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
    category: "Bottoms",
    subCategory: "Jeans",
    sizes: ["M", "L"],
    date: Date.now(),
    __v: 0,
  },
  // Add more products following the same structure
];

export default mockData;
