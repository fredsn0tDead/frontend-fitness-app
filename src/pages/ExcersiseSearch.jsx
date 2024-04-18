import React from 'react'
import { useLocation } from 'react-router-dom'
import { SlideCarousel } from '../Carousel/SlideCarousel'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect, } from 'react';
export const ExcersiseSearch = () => {


    const navigate = useNavigate();
    const location = useLocation();
    const  {displayName, email, uid} =  location.state || {};
    const [userDisplayName, setUserDisplayName] = useState(
      localStorage.getItem('userDisplayName') || displayName || ''
    );
    useEffect(() => {
      localStorage.setItem('userDisplayName', userDisplayName);
    }, [userDisplayName]);
  
  return (
    <SlideCarousel/>
  )
}
