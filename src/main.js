import { getImages } from "./js/pixabay-api.js";
import { createImagesList } from "./js/render-functions.js";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import imageUrl from './img/icon-error.svg';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', sendUserRequest);
            
function sendUserRequest(e) {
    e.preventDefault();
    
    const userData = e.target.elements.request.value.trim();
    if (userData !== '') {       
        gallery.innerHTML = '';        

        const loader = document.querySelector('.loader');
        loader.style.display = 'block';
        
        getImages(userData)
            .then(data => {
                if (data.total !== 0) {
                    const markup = createImagesList(data);
                    gallery.insertAdjacentHTML('beforeend', markup);

                    const lightbox = new SimpleLightbox('.gallery-item a', {
                        captions: true,
                        captionSelector: 'img',
                        captionType: 'attr',
                        captionsData: 'alt',
                        captionPosition: 'bottom',
                        captionDelay: 250,
                        animationSpeed: 300,
                        widthRatio: 1,
                        heightRatio: 0.95,
                        disableRightClick: true,
                    });
                    lightbox.refresh();
                    
                    const imageLoadPromises = Array.from(gallery.querySelectorAll('img')).map(image =>
                    new Promise(resolve => {
                        image.onload = resolve;
                    })
                    );
                    return Promise.all(imageLoadPromises);
                    
                } else {
                    console.log('Sorry, there are no images matching your search query. Please try again!');
                    iziToast.error({
                        message: 'Sorry, there are no images matching your search query. Please try again!',
                        messageSize: '16',
                        messageLineHeight: '1,5',
                        messageColor: '#fafafb',        
                        backgroundColor: '#ef4040',
                        imageWidth: 302,
                        position: 'topRight',
                        theme: 'dark',
                        close: true,
                        closeOnEscape: true,
                        closeOnClick: true,
                        progressBar: true,
                        progressBarColor: '#b51b1b',
                        transitionIn: 'fadeInDown',
                        transitionOut: 'fadeOutUp',
                        iconUrl: imageUrl,
                        iconColor: '#fafafb',
                    });
                 }
            })
            .then(() => loader.style.display = 'none')
            .catch((error) => {
                console.log(error);
                loader.style.display = 'none';
            })
        form.reset();
    } else {
        console.log('Enter your Request!');
        iziToast.error({
                        title: 'Error!',
                        titleColor: '#fafafb', 
                        message: 'Enter your Request!',
                        messageSize: '16',
                        messageColor: '#fafafb',        
                        backgroundColor: '#ef4040',
                        imageWidth: 432,
                        position: 'topRight',
                        theme: 'dark',
                        close: true,
                        closeOnEscape: true,
                        closeOnClick: true,
                        progressBar: true,
                        progressBarColor: '#b51b1b',
                        transitionIn: 'fadeInDown',
                        transitionOut: 'fadeOutUp',
                        iconUrl: imageUrl,
                        iconColor: '#fafafb',
                        timeout: 3000,
                    });
     }
}
