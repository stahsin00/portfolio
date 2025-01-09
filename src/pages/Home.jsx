import React, {useState} from 'react';
import Carousel from '../components/Carousel';

function Home() {
    const [day, setDay] = useState(true);

    const handleClick = () => {
        setDay(!day);
    }

    const bgImage = day ? '/portfolio/assets/home-day.png' : '/portfolio/assets/home-night.png';

    // className='w-full h-full flex justify-center items-center text-center text-7xl text-black [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff]'
    // <Typewriter text='Hello! :)'/>

    return (
        <>
            <img src='/portfolio/assets/cloud.png' alt='cloud' className='z-20 h-screen fixed bottom-20 hidden lg:block' style={{imageRendering: 'pixelated'}}></img>
            <div className={`h-screen w-full bg-cover bg-[position:18%_center] lg:bg-center bg-no-repeat bg-fixed [image-rendering:pixelated]`} style={{ backgroundImage: `url(${bgImage})` }}>
                {/* <button className='fixed top-5 right-5 bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full border-2 border-white border-solid' onClick={handleClick}>TEMP</button> */}
                <div className='w-full h-full flex justify-center items-center'>
                    <Carousel/>
                </div>
            </div>
            <div className={`fixed top-0 left-0 z-20 h-screen w-full bg-cover bg-[position:67%_center] lg:bg-center bg-no-repeat bg-fixed [image-rendering:pixelated]`} style={{ backgroundImage: `url(/portfolio/assets/home-foreground.png)` }}>
            </div>
        </>
    );
}

export default Home;