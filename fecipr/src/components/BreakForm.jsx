import React, { useState } from 'react';
import { Box, TextField, Button, Typography, TextareaAutosize } from '@mui/material';
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

    respon('/api/break', formPayload) 
      .then((data) => setResult(data))
      .catch(() => setErrorLoadingMessage('Try again later'))
      .finally(() => setLoading(false));
  };

  function reload() {
    setUpdateat(new Date())
    setErrorLoadingMessage('')
  }

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
        Break Encryption
      </Button>

      {selectedFile && (
        <Typography variant="body2">Chosen file: {selectedFile.name}</Typography>
      )}

      {loading && (
        <Loader />
      )}

      {!loading && result && (
        <TextareaAutosize
        maxRows={25}
          aria-label="Result"
          placeholder="Result will appear here"
          style={{ width: 400, padding: '10px' }}
          value={result}
          readOnly
        />
      )}


      {!loading && errorLoadingMessage && (
        <Box sx={{ mt: 2 }}>
        <Typography color="error">{errorLoadingMessage}</Typography>
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