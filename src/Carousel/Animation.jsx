import React from 'react'
import  { useState, useEffect } from 'react';

export const Animation = ({text, delay}) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        if (currentIndex < text.length) {// if the current index is less than the length of the text
          const timeout = setTimeout(() => {// setTimeout is a function that takes a function and a delay
            setCurrentText(prevText => prevText + text[currentIndex]); // prevText is the previous state of the text
            setCurrentIndex(prevIndex => prevIndex + 1);//      
          }, delay);
      
          return () => clearTimeout(timeout);
        }
      }, [currentIndex, delay, text]);

  return <div className='heading'>{currentText}</div>;
  
}
