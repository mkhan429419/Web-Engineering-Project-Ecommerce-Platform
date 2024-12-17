import wendyy from '../assets/wendyy.jpg'

const Hero = () => {
  return (
    
    <div className='flex bg-[var(--Light)] flex-col  sm:flex-row p-4 '>
        <div className='flex w-full sm:w-1/2 items-center bg-[var(--Light)] border border-[var(--LightBrown)] justify-center py-10  '>
            <h1 className='font-bold text-3xl text-center text-[var(--Yellow)]'>Our Top Selling</h1>
            

        </div>
        <div className='w-full sm:w-1/2'>
            <img src={wendyy} alt='image'/>
            
        </div>
    </div>
  )
}

export default Hero