const MOVIES_PATH= "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMAGE_PATH= "https://image.tmdb.org/t/p/w1280";
const SEARCH_PATH= "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const main= document.querySelector('main');
const form= document.querySelector('form');
const search= document.getElementById("search");
async function getMovies(path){
    const response= await fetch(path);
    const respData= await response.json();
    respData.results.forEach(movie => {
        if (movie.poster_path != null){
            console.log(movie);
        const {poster_path, title, vote_average, overview}= movie;
        const movieEl= document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML= `
        <img src=${IMAGE_PATH+poster_path}>
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getVoteClass(vote_average)}">${vote_average}</span>
        </div>
        `;
        main.appendChild(movieEl);
        }
    });
    
    return respData;

}
function getVoteClass(vote) {
    if (vote >= 8) {
        return 'green' ;
    }else if (vote >= 5) {
        return 'orange' ;
    }else {
        return 'red' ;
    }
}
getMovies(MOVIES_PATH);
async function getMoviesBySearch(keyword) {
    main.innerHTML= '';
    getMovies(SEARCH_PATH+keyword);
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const keyword= search.value;
    getMoviesBySearch(keyword);
});