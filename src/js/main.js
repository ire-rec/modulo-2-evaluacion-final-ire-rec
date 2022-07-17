'use strict';

//<------------querySelectors--------------------------->
const userInput = document.querySelector ('.js-userInput');
const button = document.querySelector ('.js-button');
const reset = document.querySelector ('.js-reset');
const listUl = document.querySelector('.js-animeUl');


let animes = [];

//<----------------renderizar------------------------------->
function renderAnimes(){
  let html ='';
  for(const animeData of animes){
    html += `<li><img src ="${animeData.images.jpg.image_url}">`;
    html += `<h3>${animeData.title}</h3> </li>`;
  }
  listUl.innerHTML = html;
}

// <------------traer datos del servidor------>
function getDataApi(){
  const userAnimeSearch = userInput.value.toLowerCase();
  fetch(`https://api.jikan.moe/v4/anime?q=${userAnimeSearch}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json.data);
      animes = json.data;
    });
}

getDataApi();

//<---------------manejadora--------------------------------->
function handleClick(ev){
  ev.preventDefault();
  renderAnimes();
}

//<-------------escuchar eventos------------------------------>
button.addEventListener('click', handleClick);
