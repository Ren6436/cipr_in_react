const BASE_URL = 'http://localhost:5555';

export function respon(url, data) {
  const formData = new FormData();
  formData.append('text', data.text);
  if (data.key) {
    formData.append('key', data.key);
  };
  if (data.file) {
    formData.append('file', data.file);
  };

  return fetch(BASE_URL + url, {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      return response.text();
    }
  });
}