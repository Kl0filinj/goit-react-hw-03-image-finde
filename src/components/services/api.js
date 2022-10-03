import axios from 'axios'; //
const API_KEY = '29111135-c68df28752f5bff5a67727daa';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export default async function getImages(query) {
  try {
    const response = await axios.get(
      `?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (!response.ok) {
      return response.data;
    }
    return Promise.reject(
      new Error('Что-то пошло не так ,:( , перезагрузите страничку')
    );
  } catch (error) {
    console.log(error);

    return error;
  }
}
