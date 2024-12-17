import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../Components/ProductItem';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Product = () => {
  const { ProductId } = useParams();  
  const { products, curr, addingAnItemToTheCart } = useContext(ShopContext);
  const [isData, setIsData] = useState(null);  
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState("");  
  console.log(ProductId);  

  const fetchingData = async () => {
    const foundItem = products.find(item => item._id.toString() === ProductId); 
    if (foundItem) {
      setIsData(foundItem);
      setImage(foundItem.image);  
    }
  };

  useEffect(() => {
    fetchingData();  
  }, [ProductId]);  // Add ProductId as a dependency to prevent infinite loop

  const getSimilarProducts = (category) => {
    return products.filter(item => item.category === category && item._id !== isData._id);  // Fix the ID check
  };

  return isData ? ( 
    <div className='bg-[var(--Light)]'>
      <div className='block lg:flex'>
        <div className='lg:w-3/5'>
          <TransformWrapper>
            <TransformComponent
              wrapperStyle={{
                height: "100%",
                width: "100%",
              }}
              contentStyle={{
                height: "100%",
                width: "100%",
              }}
            >
              <img src={image} alt={isData.title} className='w-full'/>
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div className='pb-4 px-2 lg:w-2/5'>
          <h1 className='text-[var(--Pink)] text-3xl font-bold pb-2 pt-5 lg:pt-0'>{isData.title}</h1>  
          <hr/>
          <p className='py-2 text-gray-600 text-lg'>
            <span className='text-3xl font-bold text-gray-500'>{curr}</span>{isData.price}
          </p> 
          <p className='text-[var(--Brown)] text-xl'>{isData.description}</p> 
          
          <div className='mt-10'>
            <h1 className='text-2xl font-bold text-gray-500'>Select Size</h1>
            <div className='flex flex-wrap gap-3 my-6'>
              {
                isData.sizes.map((size, index) => {
                  return (
                    <button 
                      key={index} 
                      className={`p-2 border rounded-md text-lg text-gray-500 hover:bg-[var(--Pink)] hover:text-white cursor-pointer hover:scale-105 transition-all ${size === selectedSize ? 'border-yellow-600' : ''}`} 
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  );
                })
              }
            </div>
          </div>

          <button 
            className='py-2 mt-5 mb-5 px-4 border bg-[var(--Yellow)] rounded-3xl text-lg font-bold text-white hover:bg-yellow-700 cursor-pointer hover:scale-105 transition-all' 
            onClick={() => addingAnItemToTheCart(ProductId, selectedSize)}
            aria-label="Add this item to your cart"
          >
            Add to Cart
          </button>
          
          <ul className='text-[var(--Brown)] text-lg list-disc pb-8 mx-6 my-10'>
            <li>Guaranteed Original Product</li>
            <li>Cash on delivery or card</li>
            <li>Return of product within a week</li>
          </ul>
        </div>
      </div>

      <div className='p-10'>
        <p className="font-bold text-2xl text-[var(--Yellow)]">Reviews(144)</p>
        <div className='text-gray-500 bg-white p-5 mt-5 rounded-md shadow-md hover:scale-[1.02] transition-all'>
          <p className='text-justify text-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, nam. Odit, aliquid perferendis autem beatae est cum repudiandae dignissimos voluptas magnam vitae et ducimus tempora cupiditate, unde, fugiat quidem voluptates.</p>
        </div>
        <div className='text-gray-500 bg-white p-5 mt-5 rounded-md shadow-md hover:scale-[1.02] transition-all'>
          <p className='text-justify text-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, nam. Odit, aliquid perferendis autem beatae est cum repudiandae dignissimos voluptas magnam vitae et ducimus tempora cupiditate, unde, fugiat quidem voluptates.</p>
        </div>
      </div> 

      <h1 className="font-bold text-3xl text-center text-[var(--Yellow)] py-10">You May Also Like...</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {getSimilarProducts(isData.category).map((similarProduct) => (
          <ProductItem
            key={similarProduct._id}
            id={similarProduct._id}
            title={similarProduct.title}
            image={similarProduct.image} 
            price={similarProduct.price.toString()}
          />
        ))}
      </div>
    </div>
  ) : (
    <div>No results Found</div> 
  );
};

export default Product;
