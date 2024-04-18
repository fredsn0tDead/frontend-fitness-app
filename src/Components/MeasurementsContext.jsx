import React, { createContext, useState } from 'react';

const MeasurementsContext = createContext({
   weight: 0,
   legLength: 0,
   torsoLength: 0,
   armLength: 0,
   updateMeasurements: () => {}, 
});

export const MeasurementsProvider = ({ children }) => {
   const [measurements, setMeasurements] = useState({
      weight: 0,
      legLength: 0,
      torsoLength: 0,
      armLength: 0,
   });

   const updateMeasurements = (updateField, value) => {
      setMeasurements({ ...measurements, [updateField]: value });
   };

   return (
      <MeasurementsContext.Provider value={{ measurements, updateMeasurements }}> 
         {children} 
      </MeasurementsContext.Provider>
   );
};

export default MeasurementsContext;
