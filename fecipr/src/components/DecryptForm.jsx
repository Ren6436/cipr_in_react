import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function DecryptForm({ onSubmit }) {
  const [inputValue, setInputValue] = React.useState('');
  const [key, setKey] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      type: 'decrypt',
      text: inputValue,
      key: key,
      file: selectedFile
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography sx={{ minWidth: '100px' }}>Enter text</Typography>
        <TextField
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
          sx={{ 
            width: '300px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#9e9e9e' },
              '& input': { color: 'white' },
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography sx={{ minWidth: '100px' }}>Enter key</Typography>
        <TextField
          variant="outlined"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
          sx={{ 
            width: '300px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#9e9e9e' },
              '& input': { color: 'white' },
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography sx={{ minWidth: '100px' }}>Add file</Typography>
        <Button variant="contained" component="label" sx={{ width: '300px' }}>
          Browse
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
      </Box>

      <Button 
        variant="contained" 
        endIcon={<SendIcon />}
        type="submit"
        sx={{ width: '420px' }}
      >
        Decrypt
      </Button>

      {selectedFile && (
        <Typography variant="body2">Chosen file: {selectedFile.name}</Typography>
      )}
    </Box>
  );
}