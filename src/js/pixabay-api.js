
export function getImages(userData) {
    const searchParams = new URLSearchParams({
    key: '44328072-f56b95eb73841ff5e619bc345',
    q: userData,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '24',
    safesearch: false,
    });

    const url = `https://pixabay.com/api/?${searchParams}`;
    
    return fetch(url).then(res => res.json());
}