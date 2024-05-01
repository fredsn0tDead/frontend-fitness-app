import React from 'react'
import { LineChart } from '@mui/x-charts';

export const GraphBox = ({Datapoints,xAxialabel,yAxislabel}) => {
 // Check if weightDatapoints is null or undefined
 if (Datapoints === null || Datapoints === undefined) {
  // Render chart with default values
  return (
    <LineChart
      xAxis={[{
        data: [1, 2, 3, 5, 8, 10],
        label: xAxialabel
      }]}
      series={[{
        data: [0, 0, 0, 0, 0, 0], // Default values
        label: yAxislabel,
        area: true
      }]}
      width={300}
      height={200}
    />
  );
}

// Render chart with provided weightDatapoints
return (
  <LineChart
    xAxis={[{
      data: [1, 2, 3, 4, 5, 6], // Assuming x-axis data points are known
      label: xAxialabel
    }]}
    series={[{
      data: Datapoints,
      label: yAxislabel ,
      area: true
    }]}
    width={300}
    height={200}
  />
);
};