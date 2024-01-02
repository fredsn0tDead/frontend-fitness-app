import React, { useState, useEffect } from 'react';
import { ER_Card } from './ER_Card';


export const DashBoardCasrousel = ({ cards }) => {
    const [currentCard, setCurrentCard] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentCard((prevCard) => (prevCard + 1) % cards.length);
        }, 2000); // Set the interval duration in milliseconds
    
        return () => clearInterval(interval);
      }, [cards.length]);
    
      return <div>{cards[currentCard]}</div>;
    };
    
    

