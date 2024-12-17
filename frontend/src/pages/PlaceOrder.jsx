import Total from "../Components/Total";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const navigate=useNavigate();
  return (
    <div className="p-5 bg-[var(--Light)] grid lg:grid-cols-3 lg:gap-5 sm:grid-cols-1">
      <div className="lg:col-span-2 mb-10">
        <h1 className="font-bold text-2xl mb-5">Shipping Information</h1>
        <div className="border-2 border-[var(--Pink)] p-5 shadow-lg rounded-md">
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-lg font-bold" htmlFor="fname">First Name:</label>
              <input type="text" name="fname" id="fname" className="h-10 rounded-md p-4" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold" htmlFor="lname">Last Name:</label>
              <input type="text" name="lname" id="lname" className="h-10 rounded-md p-4" />
            </div>
            <div className="flex flex-col lg:col-span-2">
              <label className="text-lg font-bold" htmlFor="email">Email Address:</label>
              <input type="email" name="email" id="email" className="h-10 rounded-md p-4" />
            </div>
            <div className="flex flex-col lg:col-span-2">
              <label className="text-lg font-bold" htmlFor="street">Street Address:</label>
              <input type="text" name="street" id="street" className="h-10 rounded-md p-4" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold" htmlFor="city">City:</label>
              <input type="text" name="city" id="city" className="h-10 rounded-md p-4" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold" htmlFor="state">State:</label>
              <input type="text" name="state" id="state" className="h-10 rounded-md p-4" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold" htmlFor="zipcode">ZipCode:</label>
              <input type="text" name="zipcode" id="zipcode" className="h-10 rounded-md p-4" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold" htmlFor="country">Country:</label>
              <input type="text" name="country" id="country" className="h-10 rounded-md p-4" />
            </div>
            <div className="flex flex-col lg:col-span-2">
              <label className="text-lg font-bold" htmlFor="phone">Phone Number:</label>
              <input type="tel" name="phone" id="phone" className="h-10 rounded-md p-4" />
            </div>
          </form>
        </div>
      </div>
      <div className="bg-white p-10 rounded-md shadow-lg">
        <Total />
        <button className="bg-[var(--LightBrown)] p-2 rounded-md mt-3" onClick={()=>navigate('/Order')}>Place Order</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
