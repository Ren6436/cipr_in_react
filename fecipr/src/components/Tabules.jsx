import * as React from 'react';
import { Box, Tab, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EncryptForm from './EncryptForm';
import DecryptForm from './DecryptForm';
import BreakForm from './BreakForm';


export default function LabTabs({ onSubmit }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box 
      sx={{ 
        width: '45%', 
        height: '50%', 
        position: 'absolute',
        top: 20, 
        left: 20, 
        border: '1px solid #ccc', 
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Encryption, Decryption and Breaking Encrypted Text
      </Typography>

      <TabContext value={value}>
        <Box sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
          <TabList 
            onChange={handleChange} 
            aria-label="lab API tabs example"
            textColor="primary"
            indicatorColor="primary"
            sx={{ 
              '& .MuiTab-root': {
                borderRight: '1px solid #ddd', 
                textTransform: 'none',
                color: '#9e9e9e', 
                flex: 1,
              },
              '& .Mui-selected': {
                color: 'black', 
              },
            }}
          >
            <Tab label="Encryption" value="1" />
            <Tab label="Decryption" value="2" />
            <Tab label="Break Encrypted Text" value="3" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <EncryptForm onSubmit={onSubmit} />
        </TabPanel>

        <TabPanel value="2">
          <DecryptForm onSubmit={onSubmit} />
        </TabPanel>

        <TabPanel value="3">
          <BreakForm onSubmit={onSubmit} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}