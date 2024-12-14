import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';

import ProductItem from '../Components/ProductItem';
const Collection = () => {
    const { mockData } = useContext(ShopContext);
    const [ourCollection, setOurCollection] = useState([]);
    const [sortOption, setSortOption] = useState('Default');
    const [searchQuery, setSearchQuery] = useState('');
    const [cat, setCat] = useState('Default');
    useEffect(() => {
        let filteredCollection = mockData.filter((item) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                item.title.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower) ||
                item.price.toLowerCase().includes(searchLower) ||
                item.category.toLowerCase().includes(searchLower)
            );
        });


        const getPriceValue = (priceString) => {
            return parseFloat(priceString.replace('$', ''));
        };

        if (cat !== 'Default') {
            filteredCollection = filteredCollection.filter((item) => item.category === cat);
          }

        if (sortOption === 'LowToHigh') {
            filteredCollection.sort((a, b) => getPriceValue(a.price) - getPriceValue(b.price));
        } else if (sortOption === 'HighToLow') {
            filteredCollection.sort((a, b) => getPriceValue(b.price) - getPriceValue(a.price));
        }


        setOurCollection(filteredCollection);
    }, [mockData, sortOption, searchQuery,cat]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };
    const handleCategories=(e)=>{
        setCat(e.target.value);
    }
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className='bg-[var(--Light)]'>
            <div className='p-4 flex flex-wrap justify-between text-base'>
                <div className=' font-bold text-3xl text-[var(--Yellow)] py-4 md:py-0'>
                    __Our Collection______.

                </div>
                <div className=' block  md:flex '>
                    <select className='bg-[var(--Light)] pr-10 pl-2  mr-2 text-[var(--Yellow)] border border-gray-400 rounded-md' value={cat}
                        onChange={handleCategories}>
                        <option value={'Default'}>DEFAULT</option>
                        <option value={'Bottoms'}>BOTTOMS</option>
                        <option value={'Tops'}>TOPS</option>
                        <option value={'Shirts'}>SHIRTS</option>
                        <option value={'Hoodie'}>HOODIES</option>


                    </select>
                    <select className='bg-[var(--Light)] md:pr-10 md:pl-2 text-[var(--Yellow)] border border-gray-400 rounded-md' value={sortOption}
                        onChange={handleSortChange}>
                        <option value={'Default'}>DEFAULT</option>
                        <option value={'LowToHigh'}>LOW TO HIGH</option>
                        <option value={'HighToLow'}>HIGH TO LOW</option>


                    </select>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className="relative w-3/4 m-3">
                    <input
                        type="text"
                        className="w-full rounded-2xl py-1 px-3 border border-[var(--LightBrown)] text-md text-[var(--Brown)]"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--Brown)]"></i>
                </div>
            </div>
            <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4">
                {

                    ourCollection.map((item, index) => {
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

export default Collection