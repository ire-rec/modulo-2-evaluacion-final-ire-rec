'use strict';
// const textSearch = document.querySelector ('.js-textSearch"');
// const button = document.querySelector ('.js-button');
// const reset = document.querySelector ('.js-reset');
const listUl = document.querySelector('.js-animeUl');
let datas = [];

function renderAnimes(){
  let html ='';
  for(const animeData of datas){
    html += `<li>${animeData.title} <img src ="${animeData.images.jpg.image_url}"></li>`;
  }
  listUl.innerHTML = html;
}
fetch('https://api.jikan.moe/v4/anime')
  .then(response => response.json())
  .then((json) => {
    console.log(json.data);
    datas = json.data;

    renderAnimes();
  });
