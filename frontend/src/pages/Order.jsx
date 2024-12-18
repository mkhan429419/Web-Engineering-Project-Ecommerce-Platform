import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Order = () => {
  const { products, curr } = useContext(ShopContext);
  return (
    <div className="p-5 bg-gray-300">
      <h1 className="font-bold text-2xl">Your Orders</h1>
      <div className="w-full bg-white mt-10 p-5 sm:p-10 rounded-md shadow-lg">
        {products.map((product) => {
          return (
            <div
              key={product._id}
              className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-10 mt-5 items-center"
            >
              <div className="flex gap-5 col-span-1 md:col-span-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-24 sm:w-32 md:w-40 rounded-md shadow-md"
                />
                <div className="flex flex-col">
                  <p className="text-gray-500">{product.category}</p>
                  <p className="font-bold text-lg">{product.title}</p>
                  <p>
                    {curr}
                    {product.price.toString()} Quantity: 1 Size: Medium
                  </p>
                  <p className="text-gray-400">Date: 25, August, 2024</p>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <button className="px-4 py-2 bg-[var(--Brown)]  text-white font-semibold rounded-md">
                  Ready To Ship
                </button>
              </div>
              <div className="flex justify-center md:justify-end">
                <button className="px-4 py-2 bg-[var(--Brown)]  text-white font-semibold rounded-md">
                  Track Your Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;