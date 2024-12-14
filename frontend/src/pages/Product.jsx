import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../Components/ProductItem';

const Product = () => {
  const { ProductId } = useParams();  
  const { mockData,curr } = useContext(ShopContext);
  const [isData, setIsData] = useState(null);  
  const [image, setImage] = useState('');

  console.log(ProductId);  

  const fetchingData = async () => {
    
    const foundItem = mockData.find(item => item.id === parseInt(ProductId)); 
    if (foundItem) {
      setIsData(foundItem);
      setImage(foundItem.image);  
    }
  };

  useEffect(() => {
    fetchingData();  
  }, [ProductId]);

  const getSimilarProducts = (category) => {
    return mockData.filter(item => item.category === category && item.id !== isData.id);
  };

  return isData ? ( 
    <div className='bg-[var(--Light)]'>
        <div className=' Block lg:flex'>
        <div className='lg:w-3/5'>
        <img src={image} alt={isData.title} className='w-full'/>
        </div>
        <div className='pb-4 px-2 lg:w-2/5'>
        <h1 className='text-[var(--Pink)] text-3xl font-bold pb-2 pt-5 lg:pt-0'>{isData.title}</h1>  
      <hr/>
      <p className='py-2 text-gray-600 text-lg'><span className='text-3xl font-bold text-gray-500'>{curr}</span>{isData.price}</p> 
      <p className='text-[var(--Brown)] text-xl'>{isData.description}</p> 
      <div className='mt-10'>
            <h1 className='text-2xl font-bold text-gray-500'>Select Size</h1>
            <div className='flex flex-wrap gap-3 my-6'>
            {
              isData.sizes.map((size, index) => {
                return (
                  <button key={index} className='p-2 border rounded-md text-lg text-gray-500 hover:bg-[var(--Pink)] hover:text-white cursor-pointer hover:scale-105 transition-all'>
                    {size}
                  </button>
                );
              })
            }

            </div>
            
            
            
        </div>
        <button className='py-2 mt-5 mb-5 px-4 border bg-[var(--Yellow)] rounded-3xl text-lg font-bold text-white hover:bg-yellow-700 cursor-pointer hover:scale-105 transition-all'>Add to Cart</button>
        
    <ul className='text-[var(--Brown)] text-lg list-disc pb-8 mx-6 my-10'>
      <li>Guarenteed Original Product</li>
      <li>Cash on delivery or card</li>
      <li>Return of product within a week</li>
    </ul>
        </div>
        

        
      
    </div>
    <h1 className="font-bold text-3xl text-center text-[var(--Yellow)] py-10">You May Also Like...</h1>
    <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4">
    {getSimilarProducts(isData.category).map((similarProduct) => (
            <ProductItem
                            key={similarProduct.id}
                            id={similarProduct.id}
                            title={similarProduct.title}
                            image={similarProduct.image} 
                            price={similarProduct.price}
                          />
          ))}
          </div>
   
    
    </div>
    
    
  ) : (
    <div>No results Found</div> 
  );
};

export default Product;
