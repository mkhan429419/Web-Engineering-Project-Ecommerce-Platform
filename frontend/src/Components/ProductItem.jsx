import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const ProductItem = ({ id, name, image, price }) => {
  const { curr } = useContext(ShopContext);

  return (
    <div>
      <Link
        to={`/Product/${id}`}
        className="block m-3 p-2 border rounded-md shadow-md cursor-pointer hover:scale-105 transition-all"
      >
        <div className="relative">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-60 object-cover object-center"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-700">{name}</h2>
          <p className="text-sm text-gray-600 mt-2">
            {curr}
            {price}
          </p>
        </div>
      </Link>
    </div>
  );
};
ProductItem.propTypes = {
  id: PropTypes.number.isRequired, // ID should be a number and is required
  name: PropTypes.string.isRequired, // Title should be a string and is required
  image: PropTypes.array.isRequired, // Image should be an array and is required
  price: PropTypes.string.isRequired, // Price should be a string and is required
};

export default ProductItem;
