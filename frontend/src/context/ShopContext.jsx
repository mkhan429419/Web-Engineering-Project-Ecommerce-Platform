import React, { createContext } from "react";
import PropTypes from "prop-types"; 
import mockData from "../assets/mockData";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const curr = "Rs";
    const Delivery_charges = 200;

    const value = {
        mockData,
        curr,
        Delivery_charges,
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
