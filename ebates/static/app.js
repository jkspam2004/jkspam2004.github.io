{
    const endpoint = "https://api.viki.io/v4/search.json?app=100266a";
    const movieURL = "http://viki.com";
    const pages = 5;
    const with_people = true;
    const with_paywall = 1;
    const movies = [];


    /* findMatches: search movie matching string */
    function findMatches() {
        if (!this.value) { 
            suggestions.innerHTML = "";
            return; 
        }
        const wordToMatch = this.value;
        const finalEndpoint = `${endpoint}&per_page=${pages}&with_people=${with_people}&with_paywall=${with_paywall}&c=${wordToMatch}&t=${new Date().getTime()}`;
        fetch(finalEndpoint)
            .then(blob => blob.json())
            .then(data => displayMatches(data));
    }

    /* displayMatches: render suggestions below search box */
    function displayMatches(movies) {
        if (!movies.length) { return; } 
        const html = movies.map((movie) => {
            return `
                <li>
                    <span class="image"><img src=${movie.i} alt=${movie.i}></span>
                    <span class="title"><a href="${movieURL}${movie.u.w}">${movie.tt}</a></span>
                </li>
            `; 
        }).join('');
        suggestions.innerHTML = html;
    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    searchInput.addEventListener('change', findMatches);
    searchInput.addEventListener('keyup', findMatches);
}
