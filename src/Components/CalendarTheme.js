// CalendarTheme.js
import { createTheme } from '@mui/system';

const calendarTheme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green color
    },
    secondary: {
      main: '#2196F3 ', // Blue color
    },
    background: {
      default: '#8e44ad', // Purple background for the calendar
    },
    text: {
      primary: '#333', // Dark text color
      secondary: '#777', // Lighter text color
    },
    
  },
  // ... (other style definitions)

  overrides: {
    // ... (other overrides)
    
    MuiPickersCalendar: {
      transitionContainer: {
        backgroundColor: '#8e44ad', // Purple background for the calendar
      },
    },
    MuiPickersDay: {
      day: {
        color: '#2196F3', // Blue color for individual days
      },
      daySelected: {
        backgroundColor: '#2196F3', // Blue background for selected day
        '&:hover': {
          backgroundColor: '#2196F3',
        },
      },
      current: {
        color: '#2196F3', // Blue color for the current day
      },
    },
  },
});

export default calendarTheme;