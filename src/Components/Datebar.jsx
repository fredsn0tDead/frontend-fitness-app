import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
export const Datebar = ({label ,onDateChange }) => {
    const handleDateChange = (date) => {
        // Call the onDateChange function with the selected date
        onDateChange(date);
      };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label={label} 
          
          onChange={handleDateChange}  />
        </DemoContainer>
      </LocalizationProvider>
  )
}