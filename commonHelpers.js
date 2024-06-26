import{S as f,i as n}from"./assets/vendor-0fc460d7.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();function m(s){const a=`https://pixabay.com/api/?${new URLSearchParams({key:"44328072-f56b95eb73841ff5e619bc345",q:s,image_type:"photo",orientation:"horizontal",per_page:"24",safesearch:!1})}`;return fetch(a).then(r=>r.json())}function y({largeImageURL:s,webformatURL:o,tags:a,comments:r,downloads:e,likes:t,views:l}){return`<li class="gallery-item">
    <a class="gallery-link" href=${s}>
      <img
        class="gallery-image"
        src=${o}
        alt=${a}
      />
    </a>
    <ul class="gallery-text">
      <li class="gallery-text-property">
        <p class="gallery-text-dscr">Likes</p>
        <p class="gallery-text-count">${t}</p>
      </li>
      <li class="gallery-text-property">
        <p class="gallery-text-dscr">Views</p>
        <p class="gallery-text-count">${l}</p>
      </li>
      <li class="gallery-text-property">
        <p class="gallery-text-dscr">Comments</p>
        <p class="gallery-text-count">${r}</p>
      </li>
      <li class="gallery-text-property">
        <p class="gallery-text-dscr">Downloads</p>
        <p class="gallery-text-count">${e}</p>
      </li>
    </ul> 
  </li>`}function d(s){return s.hits.map(y).join("")}const c="/goit-js-hw-12_my_ver/assets/icon-error-40fa32d5.svg",u=document.querySelector(".form"),i=document.querySelector(".gallery");u.addEventListener("submit",h);function h(s){s.preventDefault();const o=s.target.elements.request.value.trim();if(o!==""){i.innerHTML="";const a=document.querySelector(".loader");a.style.display="block",m(o).then(r=>{if(r.total!==0){const e=d(r);i.insertAdjacentHTML("beforeend",e),new f(".gallery-item a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250,animationSpeed:300,widthRatio:1,heightRatio:.95,disableRightClick:!0}).refresh();const l=Array.from(i.querySelectorAll("img")).map(p=>new Promise(g=>{p.onload=g}));return Promise.all(l)}else console.log("Sorry, there are no images matching your search query. Please try again!"),n.error({message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16",messageLineHeight:"1,5",messageColor:"#fafafb",backgroundColor:"#ef4040",imageWidth:302,position:"topRight",theme:"dark",close:!0,closeOnEscape:!0,closeOnClick:!0,progressBar:!0,progressBarColor:"#b51b1b",transitionIn:"fadeInDown",transitionOut:"fadeOutUp",iconUrl:c,iconColor:"#fafafb"})}).then(()=>a.style.display="none").catch(r=>{console.log(r),a.style.display="none"}),u.reset()}else console.log("Enter your Request!"),n.error({title:"Error!",titleColor:"#fafafb",message:"Enter your Request!",messageSize:"16",messageColor:"#fafafb",backgroundColor:"#ef4040",imageWidth:432,position:"topRight",theme:"dark",close:!0,closeOnEscape:!0,closeOnClick:!0,progressBar:!0,progressBarColor:"#b51b1b",transitionIn:"fadeInDown",transitionOut:"fadeOutUp",iconUrl:c,iconColor:"#fafafb",timeout:3e3})}
//# sourceMappingURL=commonHelpers.js.map
