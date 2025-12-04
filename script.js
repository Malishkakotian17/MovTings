const movies = [
    { title: "3 Idiots", rating: 8.4, genre: "Comedy", year: 2009, poster: "https://tse2.mm.bing.net/th?q=3+Idiots+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },
    { title: "Chennai Express", rating: 6.8, genre: "Comedy", year: 2013, poster: "https://tse2.mm.bing.net/th?q=Chennai+Express+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },
    { title: "Hera Pheri", rating: 8.1, genre: "Comedy", year: 2000, poster: "https://tse2.mm.bing.net/th?q=Hera+Pheri+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },

    { title: "Dilwale Dulhania Le Jayenge", rating: 8.0, genre: "Romance", year: 1995, poster: "https://tse2.mm.bing.net/th?q=Dilwale+Dulhania+Le+Jayenge+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },
    { title: "Yeh Jawaani Hai Deewani", rating: 7.3, genre: "Romance", year: 2013, poster: "https://tse2.mm.bing.net/th?q=Yeh+Jawaani+Hai+Deewani+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },
    { title: "Aashiqui 2", rating: 7.0, genre: "Romance", year: 2013, poster: "https://tse2.mm.bing.net/th?q=Aashiqui+2+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },

    { title: "Dangal", rating: 8.3, genre: "Action", year: 2016, poster: "https://tse2.mm.bing.net/th?q=Dangal+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },
    { title: "War", rating: 6.5, genre: "Action", year: 2019, poster: "https://tse2.mm.bing.net/th?q=War+2019+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },
    { title: "Pathaan", rating: 6.2, genre: "Action", year: 2023, poster: "https://tse2.mm.bing.net/th?q=Pathaan+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },

    { title: "Drishyam", rating: 8.2, genre: "Thriller", year: 2015, poster: "https://tse2.mm.bing.net/th?q=Drishyam+2015+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },
    { title: "Andhadhun", rating: 8.2, genre: "Thriller", year: 2018, poster: "https://tse2.mm.bing.net/th?q=Andhadhun+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },
    { title: "Kahaani", rating: 8.1, genre: "Thriller", year: 2012, poster: "https://tse2.mm.bing.net/th?q=Kahaani+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },

    { title: "Sanju", rating: 7.7, genre: "Drama", year: 2018, poster: "https://tse2.mm.bing.net/th?q=Sanju+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },
    { title: "Barfi!", rating: 8.1, genre: "Drama", year: 2012, poster: "https://tse2.mm.bing.net/th?q=Barfi!+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" },
    { title: "Taare Zameen Par", rating: 8.3, genre: "Drama", year: 2007, poster: "https://tse2.mm.bing.net/th?q=Taare+Zameen+Par+Movie+Poster&w=300&h=450&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=moderate" }
];

function updateDashboard() {
    const genre = document.getElementById("genreFilter").value;
    const year = document.getElementById("yearFilter").value;

    let filtered = movies.filter(m =>
        (genre === "All" || m.genre === genre) &&
        (year === "All" || m.year == year)
    );

    document.getElementById("avgRating").innerText =
        (filtered.reduce((a, b) => a + b.rating, 0) / filtered.length).toFixed(2);

    document.getElementById("totalMovies").innerText = filtered.length;

    filtered.sort((a, b) => b.rating - a.rating);
    document.getElementById("bestMovie").innerText = filtered[0]?.title || "-";

    const list = document.getElementById("movieList");
    list.innerHTML = "";

    filtered.forEach(movie => {
        list.innerHTML += `
            <div class="movie-card">
                <img src="${movie.poster || 'https://via.placeholder.com/300x450?text=Poster+Not+Added'}">
                <p class="movie-title">${movie.title}</p>
                ⭐ ${movie.rating}/10
            </div>
        `;
    });

    updateChart(filtered);
}

let chart;

function updateChart(filtered) {
    const ctx = document.getElementById("ratingChart");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: filtered.map(m => m.title),
            datasets: [{
                label: "Ratings",
                data: filtered.map(m => m.rating),
                backgroundColor: "#00eaff88",
                borderColor: "#00eaff",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#fff', font: { family: 'Outfit' } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#fff', font: { family: 'Outfit' } }
                },
                x: {
                    ticks: { display: false },
                    grid: { display: false }
                }
            }
        }
    });
}

const yearFilter = document.getElementById("yearFilter");
const years = [...new Set(movies.map(m => m.year))].sort((a, b) => b - a);
years.forEach(y => {
    yearFilter.innerHTML += `<option value="${y}">${y}</option>`;
});

document.getElementById("genreFilter").addEventListener("change", updateDashboard);
document.getElementById("yearFilter").addEventListener("change", updateDashboard);

updateDashboard();