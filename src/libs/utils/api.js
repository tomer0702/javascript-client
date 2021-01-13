/* eslint-disable */
import axios from 'axios';

export default async function callApi(data, method, url) {
  const mainUrl = 'http://localhost:9000/api' + url;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
    };
  console.log('main url is', mainUrl);
  try {
    const response = await axios({
      method,
      url: mainUrl,
      data,
      headers
    });
    
    return response;
  } 
  catch (err) {
    console.log(err);
    return { status: 'error', message: 'This is a error message' };

  }
}
