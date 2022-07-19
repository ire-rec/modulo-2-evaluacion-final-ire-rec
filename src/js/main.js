'use strict';

//<------------variables--------------------------->
const userInput = document.querySelector ('.js-userInput');
const button = document.querySelector ('.js-button');
const resultsAnimeFav = document.querySelector ('.js-resultsAnimeFav');
const resultsAnime = document.querySelector('.js-resultsAnime');


let animes = [];
let favorites = [];


//<----------------funciones varias------------------------------->


function handleClickFav (ev){
  console.log (ev.currentTarget.id);
  const idSelected = parseInt(ev.currentTarget.id);
  const imageFound = animes.find((animeData)=>animeData.mal_id===idSelected);
  const favoriteFound = favorites.findIndex((fav)=> fav.mal_id===idSelected);
  if(favoriteFound===-1){
    favorites.push(imageFound);
  }else{
    favorites.splice(favoriteFound,1);
  }
  console.log(favorites);
  renderAnimes();
  renderFavList ();
}

function listenerTitles (){
  const liTitles = document.querySelectorAll ('.js-liTitles');
  for (const li of liTitles ){
    li.addEventListener('click',handleClickFav);
  }
}


// <------------traer datos del servidor------>
function getDataApi(){
  const userAnimeSearch = userInput.value.toLowerCase();
  fetch(`https://api.jikan.moe/v4/anime?q=${userAnimeSearch}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json.data);
      animes = json.data;
      renderAnimes();
    });
    
}

//<----------------renderizar (pintar página)------------------------------->


function renderAnimes(){
  let html ='';
  let classFavorite ='';
  for(const animeData of animes){
    const favoriteFoundIndex = favorites.findIndex((fav)=> animeData.mal_id=== fav.mal_id);
    if(favoriteFoundIndex !== -1){
      classFavorite='titleFavorite';
    } else classFavorite='';

    html += `<li ><img src ="${animeData.images.jpg.image_url}" >`;
    html += `<h4 class="liTitles js-liTitles ${classFavorite}" id="${animeData.mal_id}">${animeData.title}</h4> </li>`;
  }  
  resultsAnime.innerHTML = html;
  listenerTitles ();

}

function renderFavList (){
  let html='';
  let addFavorite='';
  for(const animeData of favorites){
    html += `<li ><img src ="${animeData.images.jpg.image_url}" >`;
    html += `<h4 class="liTitles js-liTitles" id="${animeData.mal_id}">${animeData.title}</h4> </li>`;
  }
  
  const resultsAnimeFav = document.querySelector ('.js-resultsAnimeFav');
  resultsAnimeFav.innerHTML=html;
  

}

//<---------------manejadora--------------------------------->
function handleClick(ev){
  ev.preventDefault();
  getDataApi();
  
}

button.addEventListener('click', handleClick);

