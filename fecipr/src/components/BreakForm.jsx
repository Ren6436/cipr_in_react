import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { respon } from '../services/httpClient';
import { Loader } from './Loader/Loader';

export default function BreakForm({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorLoadingMessage, setErrorLoadingMessage] = useState('');
  const [update, setUpdateat] = useState(new Date());

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formPayload = {
      text: inputValue,
      file: selectedFile
    };

    onSubmit({
      type: 'breaking',
      ...formPayload
    });

    setLoading(true);
    setErrorLoadingMessage('');
    setResult(null);
    setInputValue('');

    respon('/api/break', formPayload)
      .then((data) => setResult(data))
      .catch(() => setErrorLoadingMessage('Try again later'))
      .finally(() => setLoading(false));
  };

  function reload() {
    setUpdateat(new Date());
    setErrorLoadingMessage('');
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 3, 
        width: '100%', 
        maxWidth: '100%',
        p: 1
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ minWidth: '100px' }}>Enter text</Typography>
        <TextField
          id="outlined-textarea"
          label="Enter text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
          multiline
          fullWidth
          sx={{ 
            minWidth: '100px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#9e9e9e' },
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ minWidth: '100px' }}>Add file</Typography>
        <Button 
          variant="contained" 
          component="label" 
          fullWidth
          sx={{ minWidth: '100px' }}
        >
          Browse
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button 
          variant="contained" 
          endIcon={<SendIcon />}
          type="submit"
          fullWidth
          sx={{ minWidth: '100px' }}
        >
          Break Encryption
        </Button>
        {selectedFile && (
          <Typography variant="body2">
            Chosen file: {selectedFile.name}
          </Typography>
        )}
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Loader />
        </Box>
      )}

      {!loading && result && (
        <TextField
          id="result-field"
          label="Result"
          aria-label="Result"
          placeholder="Result will appear here"
          value={result}
          multiline
          readOnly
          fullWidth
          sx={{ 
            mt: 2,
            minWidth: '100px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#9e9e9e' },
              '& textarea': { color: 'white' },
            },
          }}
        />
        
      )}

      {!loading && errorLoadingMessage && (
        <Box sx={{ mt: 2 }}>
          <Typography color="error">
            {errorLoadingMessage}
          </Typography>
          <Button 
            variant="outlined" 
            onClick={reload}
            sx={{ mt: 1 }}
          >
            Retry
          </Button>
        </Box>
      )}
    </Box>
  );
}
