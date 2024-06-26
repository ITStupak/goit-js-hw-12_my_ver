import axios from "axios";

export async function getImages(userData, currentPage) {
    try {
        axios.defaults.baseURL = 'https://pixabay.com/api/';
        const params = {    
            key: '44328072-f56b95eb73841ff5e619bc345',
            q: userData,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            page: currentPage,
        }    
        const res = await axios.get('', { params });
        return res.data;
    } catch (err) {
        console.log(`Error: ${err}`);
    }
}