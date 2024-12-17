import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
const Total = () => {
      const { Delivery_charges,curr ,totalAmount} = useContext(ShopContext);
  return (
    <div>    <h2 className="font-bold text-2xl mb-10">Total Amount</h2>
    <div className="my-1 flex justify-between"><p>Subtotal:</p>
    <p>{curr}{totalAmount}</p></div><hr/>
    <div className="my-1 flex justify-between"><p>Delivery Charges:</p>
    <p>{curr}{Delivery_charges}</p></div><hr/>
    <div className="my-1 flex justify-between"><p>Total:</p>
    <p>{curr}{(parseFloat(totalAmount) + parseFloat(Delivery_charges)).toFixed(2)}</p></div></div>
  )
}

export default Total;