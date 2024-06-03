import React from 'react'
import { LineChart } from '@mui/x-charts';
import { Box } from '@mui/system';


export const GraphBox = ({Datapoints,xAxialabel,yAxislabel,xdatapoints,ydatapoints,valueformat}) => {
 // Check if weightDatapoints is null or undefined

 if (xdatapoints === null || xdatapoints === undefined || xdatapoints.length === 0 ) {
  // Render chart with default values

  return (
    <Box sx={{ position: 'relative' }}> {/* Make the container relative */}

    <LineChart sx={{fontFamily: "Fjalla One"}}
      xAxis={[{
        data: [],
        label: xAxialabel
      }]}
      series={[{
        data: [], // Default values
        label: yAxislabel,
    
      }]}
      width={300}
      height={200}
      
      
    />
        <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            fontSize: '16px' // Adjust font size as needed
          }}>
          Loading Progression....
        </Box>
      
    </Box>
  );
}

// Render chart with provided weightDatapoints
return (
  <LineChart
  sx={{fontFamily: "Fjalla One"}}
    
    xAxis={[{
      data: xdatapoints, // Assuming x-axis data points are known
      label: xAxialabel,
      valueFormatter: valueformat,
      
          
    }]}
    series={[{
      data: ydatapoints,
      label: yAxislabel ,
     
    }]}
    width={300}
    height={300}
    
  >
  
  </LineChart>
);
};