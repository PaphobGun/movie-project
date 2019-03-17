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
export const searchMovie = keyWord => {
  // Use axios lib to send AJAX call
  axios
    .get('http://www.omdbapi.com/?s=' + keyWord + apiKey)
    .then(response => {
      // Store the data in 'data'
      let data = response.data;
      // Render total found
      renderTotal(data);
      // Render movies to UI
      renderMovies(data);
    })
    .catch(err => {
      console.log(err);
    });
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

// Render movies to the UI
function renderMovies(data) {
  // Create markup that will be add to the UI
  let markupMovies = '';
  // Store list of movies [ array ] in movies
  let movies = data.Search;
  // Loop through movies [ array ] and add every item in markup
  $.each(movies, (index, current) => {
    // For 'movieInfo' function it live in script tag on index.html directly
    markupMovies =
      markupMovies +
      `
        <div class="movie__card">
            <img class="movie__img" src="${
              current.Poster
            }" alt="Image not found ( API failed )">
            <div class="movie__btn-box">
                <a href="#" class="movie__btn" id="${
                  current.imdbID
                }" >READ MORE</a>
            </div>
            <div class="movie__title">
                ${current.Title}
            </div>
        </div>
        `;
    // Add markup to tag movieList
    $(elements.movieList).html(markupMovies);
  });
}

// Store imdbID to session storage and open 'info.html'
function movieInfo(imdbID) {
  sessionStorage.setItem('imdbID', imdbID);
  window.location = 'info.html';
  return false;
}

$('.movie__list').on('click', e => {
  if ($(e.target).hasClass('movie__btn')) {
    movieInfo(e.target.id);
  }
});
