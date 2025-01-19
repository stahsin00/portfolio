import React, {useState, useRef} from 'react';
import Carousel from '../components/Carousel';

function Home() {
    const [day, setDay] = useState(true);
    const foregroundRef = useRef(null);
    const midgroundRef = useRef(null);
    const backgroundRef = useRef(null);

    const handleClick = () => {
        setDay(!day);
    }

    const handleMouseMove = (e) => {
        if (foregroundRef.current) {
            const { left, width } = foregroundRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            
            const moveX = -(x - 0.5) * 30;

            foregroundRef.current.style.transform = `translateX(${moveX}px)`;
        }

        if (midgroundRef.current) {
            const { left, width } = midgroundRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            
            const moveX = -(x - 0.5) * 15;

            midgroundRef.current.style.transform = `translateX(${moveX}px)`;
        }

        if (backgroundRef.current) {
            const { left, width } = backgroundRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            
            const moveX = -(x - 0.5) * 5;

            backgroundRef.current.style.transform = `translateX(${moveX}px)`;
        }
    }

    const bgImage = day ? '/portfolio/assets/home-day.png' : '/portfolio/assets/home-night.png';

    // className='w-full h-full flex justify-center items-center text-center text-7xl text-black [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff]'
    // <Typewriter text='Hello! :)'/>

    return (
        <div onMouseMove={handleMouseMove}>
            <img src='/portfolio/assets/cloud.png' alt='cloud' className='z-20 h-screen fixed bottom-20 hidden lg:block' style={{imageRendering: 'pixelated'}}></img>
            <div className={`h-screen w-full bg-cover bg-[position:18%_center] lg:bg-center bg-no-repeat bg-fixed [image-rendering:pixelated]`} style={{ backgroundImage: `url(${bgImage})` }}>
                {/* <button className='fixed top-5 right-5 bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full border-2 border-white border-solid' onClick={handleClick}>TEMP</button> */}
                <div className='w-full h-full flex justify-center items-center'>
                    <Carousel/>
                </div>
            </div>
            <div className={`fixed top-0 right-10 z-0 h-screen w-full bg-cover bg-[position:67%_center] lg:bg-center bg-no-repeat bg-fixed [image-rendering:pixelated] transform transition-transform duration-100 ease-out`} style={{ backgroundImage: `url(/portfolio/assets/home-background.png)` }} ref={backgroundRef}>
            </div>
            <div className={`fixed top-5 left-20 z-0 h-screen w-full bg-cover bg-[position:67%_center] lg:bg-center bg-no-repeat bg-fixed [image-rendering:pixelated] transform transition-transform duration-100 ease-out`} style={{ backgroundImage: `url(/portfolio/assets/home-foreground.png)` }}  ref={midgroundRef}>
            </div>
            <div className={`fixed top-0 left-0 z-20 h-screen w-full bg-cover bg-[position:67%_center] lg:bg-center bg-no-repeat bg-fixed [image-rendering:pixelated] transform transition-transform duration-100 ease-out pointer-events-none`} style={{ backgroundImage: `url(/portfolio/assets/home-foreground.png)` }}  ref={foregroundRef}>
            </div>
        </div>
    );
}

export default Home;