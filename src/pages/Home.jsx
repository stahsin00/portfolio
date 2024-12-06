import React, {useState} from 'react';
import Typewriter from '../components/Typewriter';

function Home() {
    const [day, setDay] = useState(true);

    const handleClick = () => {
        setDay(!day);
    }

    const bgImage = day ? '/portfolio/assets/home-day.png' : '/portfolio/assets/home-night.png';

    return (
        <div className={`h-screen w-full bg-cover bg-[position:18%_center] lg:bg-center bg-no-repeat bg-fixed [image-rendering:pixelated]`} style={{ backgroundImage: `url(${bgImage})` }}>
            {/* <button className='fixed top-5 right-5 bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full border-2 border-white border-solid' onClick={handleClick}>TEMP</button> */}
            <div className='w-full h-full flex justify-center items-center text-center text-7xl text-black [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff]'>
                <Typewriter text={"Hello! :)"}/>
            </div>
        </div>
    );
}

export default Home;