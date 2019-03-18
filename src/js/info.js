const apiKey = '&apikey=48f5a1e7';
const info = '.info';

// render information of the selected movie
const renderInfo = async () => {
  // get the id from sessionStorage
  let id = sessionStorage.getItem('imdbID');

  try {
    // AJAX call to omdbapi for selected movie info
    const res = await axios.get('https://www.omdbapi.com/?i=' + id + apiKey);

    const data = await res.data;

    // Get the data to the dom
    let markupInfo = `
        <div class="info__poster">
        <img class="info__poster--img" src="${
          data.Poster
        }" alt="Image not found">
        <a href="https://www.imdb.com/title/${id}" target="_blank" class="info__poster--imdb">Go To IMDB.com</a>
    </div>
    
    <div class="info__title">
        <h3 class="info__title--text">
            ${data.Title}
        </h3>
        <div class="info__title__box">
            <div class="info__title--released">
                <span>Released:</span> ${data.Released}
            </div>
            <div class="info__title--rated">
                <span>Rated:</span> ${data.Rated}
            </div>
            <div class="info__title--runtime">
                <span>Runtime:</span> ${data.Runtime}s
            </div>
            <div class="info__title--imdbRating">
                <span>IMDB:</span> ${data.imdbRating}
            </div>
        </div>
    </div>
    
    <div class="info__director">
        <div class="info__director--text">
            <span>Director:</span> ${data.Director}
        </div>
        <div class="info__director--writer">
            <span>Writers:</span> ${data.Writer}
        </div>
    </div>
    
    <div class="info__plot">
        <div class="info__plot--text">
            ${data.Plot}        
        <div class="info__actors">
            <div class="info__actors--text">
                <span>Actors:</span> <br> ${data.Actors}
            </div>
        </div>
        
        <div class="info__boxOffice">
            <div class="info__boxOffice--text">
                <span>Box Office:</span> <br> ${data.BoxOffice}
            </div>
        </div>
    </div>
        `;

    // Put the markup to the DOM
    $(info).html(markupInfo);
  } catch {
    alert(`Something is wrong with OMDBapi please try again later...`);
  }
};

// When page is loaded call function to render selected movie info
$(document).ready(renderInfo());
