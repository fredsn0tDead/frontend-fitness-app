import React from 'react'
import { useLocation } from 'react-router-dom'
import { SlideCarousel } from '../Carousel/SlideCarousel'
import { useState,useEffect, } from 'react';
export const ExcersiseSearch = () => {


    const location = useLocation();
    const  {displayName} =  location.state || {};
    const [userDisplayName] = useState(
      localStorage.getItem('userDisplayName') || displayName || ''
    );
    useEffect(() => {
      localStorage.setItem('userDisplayName', userDisplayName);
    }, [userDisplayName]);
  
  return (
    <SlideCarousel/>
  )
}
