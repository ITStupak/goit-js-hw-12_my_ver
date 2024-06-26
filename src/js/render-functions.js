function createImage(image) {
  let { largeImageURL, webformatURL, tags, comments, downloads, likes, views } = image;
  return `<li class="gallery-item">
    <a class="gallery-link" href=${largeImageURL}>
      <div class="img-container">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
      </div>
      <ul class="gallery-text">
      <li class="gallery-text-property">
        <p class="gallery-text-dscr">Likes</p>
        <p class="gallery-text-count">${likes}</p>
      </li>
      <li class="gallery-text-property">
        <p class="gallery-text-dscr">Views</p>
        <p class="gallery-text-count">${views}</p>
      </li>
      <li class="gallery-text-property">
        <p class="gallery-text-dscr">Comments</p>
        <p class="gallery-text-count">${comments}</p>
      </li>
      <li class="gallery-text-property">
        <p class="gallery-text-dscr">Downloads</p>
        <p class="gallery-text-count">${downloads}</p>
      </li>
    </ul>
    </a>     
  </li>`;
};

export function createImagesList(images) {
  return images.map(createImage).join('');
};