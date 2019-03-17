import '../scss/main.scss';

import $ from 'jquery';
import { elements } from './base';
import * as movieList from './movieList';

// When whole document is ready ( loaded )
$(document).ready(() => {
  // Focus on input field when page loaded
  $(elements.searchText).focus();
  // Listen for submit event on search form
  $(elements.searchForm).on('submit', e => {
    // Prevent default behavior
    e.preventDefault();
    // Store value from search input in KeyWord
    const keyWord = movieList.getInput();
    // Send AJAX call to OMDB API and render the result
    movieList.searchMovie(keyWord);
  });
});
