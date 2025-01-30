import React, {useState, useRef} from 'react';
import Carousel from '../components/Carousel';

function Home() {
    const [day, setDay] = useState(true);
    const foregroundRef = useRef(null);
    const midgroundRef = useRef(null);
    const backgroundRef = useRef(null);
    const cloudRef = useRef(null);

    const handleClick = () => {
        setDay(!day);
    }

    const handleMouseMove = (e) => {  // TODO: cleanup
        if (foregroundRef.current) {
            const { left, width } = foregroundRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            
            const moveX = -(x - 0.5) * 60;

            foregroundRef.current.style.transform = `translateX(${moveX}px)`;
        }

        if (midgroundRef.current) {
            const { left, width } = midgroundRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            
            const moveX = -(x - 0.5) * 30;

            midgroundRef.current.style.transform = `translateX(${moveX}px)`;
        }

        if (backgroundRef.current) {
            const { left, width } = backgroundRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            
            const moveX = -(x - 0.5) * 10;

            backgroundRef.current.style.transform = `translateX(${moveX}px)`;
        }

        if (cloudRef.current) {
            const { left, width } = cloudRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            
            const moveX = -(x - 0.5) * 10;

            cloudRef.current.style.transform = `translateX(${moveX}px)`;
        }
    }

    const bgImage = day ? '/assets/home-day.png' : '/assets/home-night.png';

    // className='w-full h-full flex justify-center items-center text-center text-7xl text-black [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff]'
    // <Typewriter text='Hello! :)'/>

    return (
        <div onMouseMove={handleMouseMove}>
            <div className={`fixed top-0 right-10 z-0 h-screen w-full bg-cover bg-[position:67%_center] lg:bg-center bg-no-repeat bg-fixed [image-rendering:pixelated] transform transition-transform duration-100 ease-out pointer-events-none`} style={{ backgroundImage: `url(/assets/home-background.png)` }} ref={backgroundRef}>
            </div>
            {/* <img src='/assets/cloud.png' alt='cloud' className='z-40 h-screen fixed bottom-20 hidden lg:block' style={{imageRendering: 'pixelated'}}  ref={cloudRef}></img> */}
            <div className={`h-screen w-full bg-cover bg-[position:18%_center] z-30 lg:bg-center bg-no-repeat bg-fixed [image-rendering:pixelated]`} style={{ backgroundImage: `url(${bgImage})` }}>
                {/* <button className='fixed top-5 right-5 bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full border-2 border-white border-solid' onClick={handleClick}>TEMP</button> */}
                <div className='w-full h-full flex justify-center items-center'>
                    <Carousel/>
                </div>
            </div>
            <div className={`fixed top-5 left-20 z-10 h-screen w-full bg-cover bg-[position:67%_center] lg:bg-center bg-no-repeat bg-fixed [image-rendering:pixelated] transform transition-transform duration-100 ease-out pointer-events-none`} style={{ backgroundImage: `url(/assets/home-foreground.png)` }}  ref={midgroundRef}>
            </div>
            <div className={`fixed top-0 left-0 z-20 h-screen w-full bg-cover bg-[position:67%_center] lg:bg-center bg-no-repeat bg-fixed [image-rendering:pixelated] transform transition-transform duration-100 ease-out pointer-events-none`} style={{ backgroundImage: `url(/assets/home-foreground.png)` }}  ref={foregroundRef}>
            </div>
            <div className="fixed inset-0 pointer-events-none z-40">
                <div className="w-full h-full bg-[length:100%_4px] bg-repeat opacity-50" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,255,0.15) 50%)',}}/>

                <div className="fixed inset-0 opacity-10 bg-repeat" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1580243117731-a108c2953e2c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,}}/>

                {/* TODO: Chromatic Aberration */}
            </div>
        </div>
    );
}

export default Home;