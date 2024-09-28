import { useState, useEffect } from 'react';

function Dots() {
  const dots = ['.', '..', '...', '..'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % dots.length);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return <>{dots[index]}</>;
}

export default Dots;