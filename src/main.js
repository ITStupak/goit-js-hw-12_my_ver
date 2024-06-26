import { getImages } from "./js/pixabay-api.js";
import { createImagesList } from "./js/render-functions.js";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import imageUrlError from './img/icon-error.svg';
import imageUrlInfo from './img/Oops.png';

//!======================================================

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const options = document.querySelector('.options');
const moreBtn = document.querySelector('.load-btn');
const loader = document.querySelector('.loader');

//!======================================================

let userData = '';
let currentPage = 1;
let maxPage = 1;
const perPage = 12;

//!======================================================

const lightbox = new SimpleLightbox('.gallery-item a', {
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 500,
    animationSpeed: 200,
    widthRatio: 1,
    heightRatio: 0.95,
});
async function loadAllImages() {
    const imageLoadPromises = Array.from(gallery.querySelectorAll('img')).map(image => new Promise(resolve => {
        image.onload = resolve;
    })); await Promise.all(imageLoadPromises);
}
function showLoader() {
    loader.style.display = 'block';
}
function hideLoader() {
    loader.style.display = 'none';
}
function showLoadBtn() {
    options.classList.add('is-visible');
}
function hideLoadBtn() {
    options.classList.remove('is-visible');
}
function updateStatusBtn() {
    if (currentPage >= maxPage) {
        hideLoadBtn();
        if (maxPage) {
            iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    messageSize: '16',
                    messageLineHeight: '1,5',
                    messageColor: '#01090f',
                    backgroundColor: '#d6e288',
                    position: 'bottomRight',
                    close: true,
                    closeOnClick: true,
                    closeOnEscape: true,
                    progressBar: true,
                    progressBarColor: '#9aa406',
                    transitionIn: 'fadeInDown',
                    transitionOut: 'fadeOutUp',
                    iconUrl: imageUrlInfo,
                    iconColor: '#fafafb',
            });
        }
    } else {
        showLoadBtn();
    }
}
function scrollDown() {
    const liElem = gallery.children[0];
    const height = liElem.getBoundingClientRect().height;
    window.scrollBy({
        top: height*3,
        behavior: 'smooth',
    });
}

//!======================================================

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    userData = e.target.elements.request.value.trim();

    if (!userData) {
        iziToast.error({
                        title: 'Error!',
                        titleColor: '#fafafb', 
                        message: 'Enter your Request!',
                        messageSize: '16',
                        messageColor: '#fafafb',        
                        backgroundColor: '#ef4040',
                        position: 'topRight',
                        theme: 'dark',
                        close: true,
                        closeOnEscape: true,
                        closeOnClick: true,
                        progressBar: true,
                        progressBarColor: '#b51b1b',
                        transitionIn: 'fadeInDown',
                        transitionOut: 'fadeOutUp',
                        iconUrl: imageUrlError,
                        iconColor: '#fafafb',
                        timeout: 3000,
        });
        return;
    }

    currentPage = 1;
    showLoader();
    hideLoadBtn();
    
    try {
        const data = await getImages(userData, currentPage);
        maxPage = Math.ceil(data.totalHits / perPage);
        
        if (maxPage === 0) {
            iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    messageSize: '16',
                    messageLineHeight: '1,5',
                    messageColor: '#fafafb',
                    backgroundColor: '#ef4040',
                    position: 'topRight',
                    theme: 'dark',
                    close: true,
                    closeOnEscape: true,
                    closeOnClick: true,
                    progressBar: true,
                    progressBarColor: '#b51b1b',
                    transitionIn: 'fadeInDown',
                    transitionOut: 'fadeOutUp',
                    iconUrl: imageUrlError,
                    iconColor: '#fafafb',
            });
            hideLoader();
            updateStatusBtn();
            form.reset();
            return;
        }
        
        const markup = createImagesList(data.hits);
        gallery.innerHTML = markup;
        lightbox.refresh();
        await loadAllImages();
    } catch (err) {
        console.log(`Error: ${err}`);
    }

    hideLoader();
    updateStatusBtn();
    form.reset();
});

moreBtn.addEventListener('click', async () => {
    currentPage++;
    hideLoadBtn();
    showLoader();
    
    try {
        const data = await getImages(userData, currentPage);
        const markup = createImagesList(data.hits);
        gallery.insertAdjacentHTML('beforeend', markup);        
        lightbox.refresh();
        scrollDown();        
    } catch {
        console.log(`Error: ${err}`);
    }
    updateStatusBtn();
    hideLoader();
});