import { useState, useEffect } from 'react';

function Typewriter({text = ''}) {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [typing, setTyping] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typing) {
        if (index < text.length) {
            setDisplayedText(prev => prev + text[index]);
            setIndex(prev => prev + 1);
        } else {
            setTyping(false);
        }
      } else {
        if (index > 0) {
            setDisplayedText(prev => prev.slice(0, -1));
            setIndex(prev => prev - 1);
        } else {
            setTyping(true);
        }
      }
    }, 300);

    return () => clearInterval(interval);
  }, [index, typing]);

  return <>{displayedText}</>;
}

export default Typewriter;