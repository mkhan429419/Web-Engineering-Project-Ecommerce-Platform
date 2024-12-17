import { createContext, useEffect } from "react";
import PropTypes from "prop-types"; 
import mockData from "../assets/mockData";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const curr = "Rs";
    const Delivery_charges = 200;
    const [cart,setCart]=useState({});
    const [numberOfItemsInCart,setNumberOfItemsInCart]=useState(0);
    const [totalAmount,setTotalAmount]=useState(0);
    const addingAnItemToTheCart=(id,size)=>{
        if (!size) {
            toast.error("Please select a size",{
                position:"top-right",
                autoClose:2000
            },);
            return;
        }
        const cartClone=structuredClone(cart);

        if(cartClone[id]){
            if(cartClone[id][size]){
                cartClone[id][size]++;
                toast.success("Item Successfully added to the cart",{
                    position:"top-right",
                    autoClose:2000
                })
            }else{
                cartClone[id][size]=1;
                toast.success("Item Successfully added to the cart",{
                    position:"top-right",
                    autoClose:2000
                })
            }
        }else{
            cartClone[id]={};
            cartClone[id][size]=1;
            toast.success("Item Successfully added to the cart",{
                position:"top-right",
                autoClose:2000
            })
        }
        setCart(cartClone);
        findNumberOfItemsInCart(cartClone);
        findTotalAmount(cartClone);
    }
    const updateQuantity=(id,size,quantity)=>{
        let cartClone=structuredClone(cart);
        if(quantity===0){
            delete cartClone[id][size];
        }else{      
            cartClone[id][size]=quantity;
        }
        setCart(cartClone);
        findNumberOfItemsInCart(cartClone);
        findTotalAmount(cartClone);
    }
    const findNumberOfItemsInCart = (updatedCart) => {
        let totalItems = 0;
        for (const productId in updatedCart) {
            for (const size in updatedCart[productId]) {
                totalItems += updatedCart[productId][size];
            }
        }
        setNumberOfItemsInCart(totalItems);
    };
    const findTotalAmount=(cart)=>{
        let amount=0;
        for(const productId in cart){
            for(const size in cart[productId]){
                const product= mockData.find((prod)=>prod.id===parseInt(productId));
                console.log(product);
                const quantity=cart[productId][size];
                console.log(quantity);
                amount+=parseFloat(product.price.replace("$",""))*quantity;
                console.log(amount);
            }
        }
        setTotalAmount(amount.toFixed(2));
    }
    useEffect(()=>{
        console.log("Cart",cart);
        console.log("number of item in cart",numberOfItemsInCart);
        console.log("Total amount:", totalAmount);
    },[cart,numberOfItemsInCart,totalAmount])
    const value = {
        mockData,
        curr,
        Delivery_charges,
        cart,
        addingAnItemToTheCart,
        numberOfItemsInCart,
        updateQuantity,
        totalAmount,
    };
   
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

// Add prop validation for children
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validate children as a required prop
};

export default ShopContextProvider;
