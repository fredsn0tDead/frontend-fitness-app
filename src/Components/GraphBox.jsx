import React from 'react'
import { LineChart } from '@mui/x-charts';

export const GraphBox = ({graphdata}) => {
  return (
    <LineChart
    xAxis={[{ 
      data: [1, 2, 3, 5, 8, 10], 
      label: 'Weeks'}]}
    
    series={[
      {
        data: [2, 5.5, 2, 8.5, 1.5, 5],
        label: 'Weight',
        area: true,
      },
    ]}
    width={300}
    height={200}
   
  />
  )
}
