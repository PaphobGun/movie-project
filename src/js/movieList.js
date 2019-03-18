import { elements, apiKey } from './base';
import $ from 'jquery';
import axios from 'axios';

// Get value from search field input
export const getInput = () => {
  // Store value from search input in KeyWord
  let keyWord = $(elements.searchText).val();
  // Clear search input field
  clearInput();
  // Return keyWord (value of input)
  return keyWord;
};

// Clear search input field
function clearInput() {
  $(elements.searchText).val('');
}

// Send AJAX call for searching movies by movie's title
export const searchMovie = async keyWord => {
  try {
    // Use axios lib to send AJAX call and store to res
    const res = await axios.get(
      'https://www.omdbapi.com/?s=' + keyWord + apiKey
    );
    // pick the actual data from api to 'data'
    const data = await res.data;
    // Render total found
    renderTotal(data);
    // Render list of movies
    renderMovies(data);
  } catch (err) {
    // If something goes wrong with API, alert it
    alert(`Something wrong with OMDBapi please try again later...`);
  }
};

// Render total found
function renderTotal(data) {
  // Markup for render total movies found
  const markupFound = `
    <div class="movie__result">
        <div class="movie__result--text">
            Found <span>${data.Search.length} movies</span> in total of <span>${
    data.totalResults
  }</span>
        </div>
    </div>`;
  // Add markup to tag movie
  $(elements.movieResult).html(markupFound);
}

// // Render movies to the UI
// function renderMovies(data) {
//   // Create markup that will be add to the UI
//   let markupMovies = '';
//   // Store list of movies [ array ] in movies
//   let movies = data.Search;
//   // Loop through movies [ array ] and add every item in markup
//   $.each(movies, (index, current) => {
//     markupMovies =
//       markupMovies +
//       `
//         <div class="movie__card">
//             <img class="movie__img" src="${
//               current.Poster
//             }" alt="Image not found ( API failed )">
//             <div class="movie__btn-box">
//                 <a href="#" class="movie__btn" id="${
//                   current.imdbID
//                 }" >READ MORE</a>
//             </div>
//             <div class="movie__title">
//                 ${current.Title}
//             </div>
//         </div>
//         `;
//     // Add markup to tag movieList
//     $(elements.movieList).html(markupMovies);
//   });
// }

// Render movies to the UI
function renderMovies(data) {
  // Create markup that will be add to the UI
  let markupMovies = '';
  // Store list of movies [ array ] in movies
  let movies = data.Search;
  // Loop through movies [ array ] and add every item in markup
  $.each(movies, (index, current) => {
    markupMovies =
      markupMovies +
      `<div class="movie__card">
          <img class="movie__card--img" src="${
            current.Poster
          }" alt="Image not found ( API failed )">
          <div class="movie__btn-box">
            <a href="#" class="movie__btn" id="${current.imdbID}">READ MORE</a>
          </div>
          <div class="movie__title">
            <h4>${current.Title}</h4>
          </div>
        </div>`;

    // Add markup to tag movieList
    $(elements.movieList).html(markupMovies);
  });
}

// Store imdbID to session storage and open 'info.html'
// this imdbID in session will be passed on info.html to render the data of selected movie
function movieInfo(imdbID) {
  sessionStorage.setItem('imdbID', imdbID);
  window.location = 'info.html';
  return false;
}

// Handle event click on the movie list
$('.movie__list').on('click', e => {
  // If target has a classname = 'movie__btn' ( the a tag that we wanted.. )
  if ($(e.target).hasClass('movie__btn')) {
    // pass the id of selected movie to save it in session storage
    movieInfo(e.target.id);
  }
});
