const apiKey = '&apikey=48f5a1e7';
const info = '.info';

function renderInfo() {
  let id = sessionStorage.getItem('imdbID');

  axios
    .get('http://www.omdbapi.com/?i=' + id + apiKey)
    .then(response => {
      let data = response.data;

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

      $(info).html(markupInfo);
    })
    .catch(err => {
      console.log(err);
    });
}

$(document).ready(renderInfo());
