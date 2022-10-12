import axios from 'axios'; //
const API_KEY = '29111135-c68df28752f5bff5a67727daa';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export default async function getImages(query, page) {
  try {
    const response = await axios.get(
      `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
