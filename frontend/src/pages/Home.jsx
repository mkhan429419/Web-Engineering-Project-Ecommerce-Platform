import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSelling from '../Components/BestSelling'

const Home = () => {
  return (
    <div>
        <Hero/>
        <LatestCollection/>
        <BestSelling/>
    </div>
  )
}

export default Home