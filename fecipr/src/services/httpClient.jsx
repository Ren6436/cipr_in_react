const BASE_URL = 'http://localhost:5000';

export function respon(url, data) {
  const formData = new FormData();
  formData.append('text', data.text);
  if (data.file) {
    formData.append('file', data.file);
  }

  return fetch(BASE_URL + url, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.text(); 
    });
}
