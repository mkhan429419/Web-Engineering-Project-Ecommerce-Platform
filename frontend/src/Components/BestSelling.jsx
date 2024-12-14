import React,{useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const BestSelling = () => {

    const {mockData}=useContext(ShopContext);
    const [bestSelling,setbestSelling]=useState([]);

    useEffect(() => {
        const best =mockData.filter((item)=>item.BestSell === true);
        setbestSelling(best.slice(0, 4)); 
      }, [mockData]);

    
  return (
    <div className='bg-[var(--Light)]'>

<h1 className="font-bold text-3xl text-center text-[var(--Brown)] py-10">Best Selling</h1>
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4">
        {

          bestSelling.map((item, index) => {
            return (
              <ProductItem
                key={index}
                id={item.id}
                title={item.title}
                image={item.image} 
                price={item.price}
              />
            );
          })
        }
      </div>
    </div>
  )
}

export default BestSelling