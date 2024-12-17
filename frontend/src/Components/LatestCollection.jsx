import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { mockData } = useContext(ShopContext);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    setNewArrivals(mockData.slice(0, 10)); // Slice the first 9 items
  }, [mockData]);

  return (
    <div className='bg-[var(--Light)]'>
      <h1 className="font-bold text-3xl text-center text-[var(--Brown)] py-10">New Arrivals</h1>
      <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4">
        {

          newArrivals.map((item, index) => {
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
  );
};

export default LatestCollection;
