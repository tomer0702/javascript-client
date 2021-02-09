/* eslint-disable */
import axios from 'axios';

const callApi= async (data, method, url) => {
  const mainUrl = 'http://localhost:9000/api' + url;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
    };
  console.log('main url is', mainUrl);
  try {
    const res = await axios({
      method,
      url: mainUrl,
      data,
      headers
    });
    
    return res;
  } 
  catch (err) {
    console.log(err);
    return { status: 'error call api', message: 'This is a error message' };

  }
}
export default callApi;
