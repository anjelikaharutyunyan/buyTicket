import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';


export default function Calendar() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar', 'DateCalendar']}>
        <Box
          sx={{
            width: 350,
            '& .MuiPickersCalendarHeader-root': {
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #ddd',
            },
            '& .MuiPickersDay-root': {
              color: '#333',
            },
            '& .Mui-selected': {
              backgroundColor: '#F9BE32 !important',
              color: '#fff !important',
            },
            '& .MuiPickersDay-dayWithMargin': {
              borderRadius: '50%',
            },
            '& .MuiPickersDay-day': {
              fontWeight: 'bold',
            },
          }}
        >
          <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
        </Box>
      </DemoContainer>
    </LocalizationProvider>
  );
}