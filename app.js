const records = [
    {
        id: 1,
        artist: "Arctic Monkeys",
        album: "AM",
        year: 2013,
        genre: "Indie",
        image: "AM.jpeg",
        description: "The album is considered a concept album about infatuation and frustration, and the uncertainty of whether feelings are reciprocated."
    },
    {
        id: 2,
        artist: "Tame Impala",
        album: "Currents",
        year: 2015,
        genre: "Indie",
        image: "Currents.jpg",
        description: "marks a shift to more dance-oriented music, with more emphasis placed on synthesisers than guitars."
    },
    {
        id: 3,
        artist: "Taylor Swift",
        album: "1989",
        year: 2014,
        genre: "Pop",
        image: "1989.webp",
        description: "Explores the feelings that come after a major move or life change"
    },
    {
        id: 4,
        artist: "The Weeknd",
        album: "After Hours",
        year: 2020,
        genre: "Pop",
        image: "After Hours .jpeg",
        description: "Discuss the Weeknd's regret of ending a relationship with a former lover, and his desire for them to reconcile and to have children."
    },
    {
        id: 5,
        artist: "Ludwig van Beethoven",
        album: "Symphony No. 9",
        year: 1824,
        genre: "Classical",
        image: "Symphony No.9.jpeg",
        description: "Bridged the gap between classical and romantic music and set the standard for future composers through his use of the choral finale combined with past musical traditions."
    },
    {
        id: 6,
        artist: "Mozart",
        album: "Requiem in D Minor",
        year: 1791,
        genre: "Classical",
        image: "Mozart.jpeg",
        description: "Mozart's final composition, a powerful and moving requiem mass."
    }
];
function createRecordCard(record) {
    return `
        <div class="record-card">
            <div class="record-cover">
                <img src="./images/" alt="${record.album}>
            </div>
            <div class="record-info">
                <h2 class="record-title">${record.album}</h2>
                <h3 class="record-artist">${record.artist}</h3>
                <div class="record-meta">
                    <span class="record-tag">${record.year}</span>
                    <span class="record-tag">${record.genre}</span>
                </div>
                <p class="record-description">${record.description}</p>
            </div>
        </div>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    const recordsGrid = document.getElementById('recordsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentGenre = 'all';

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('genre')) {
        currentGenre = urlParams.get('genre').toLowerCase();
        filterButtons.forEach(btn => {
            if (btn.dataset.genre === currentGenre) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function createRecordCard(record) {
        return `
            <div class="record-card">
                <div class="record-cover" style="background-color: ${record.color}">
                    <div style="border-color: ${record.coverColor}66">
                    </div>
                </div>
                <div class="record-info">
                    <h2 class="record-title">${record.album}</h2>
                    <h3 class="record-artist">${record.artist}</h3>
                    <div class="record-meta">
                        <span class="record-tag">${record.year}</span>
                        <span class="record-tag">${record.genre}</span>
                    </div>
                    <p class="record-description">${record.description}</p>
                </div>
            </div>
        `;
    }

    function filterRecords() {
        const filteredRecords = records.filter(record => {
            return currentGenre === 'all' || record.genre.toLowerCase() === currentGenre;
        });
    
        const cards = filteredRecords.map(record => {
            return `
                <div class="record-card">
                    <div class="record-cover">
                        <img src="images/${record.image}" alt="${record.album}" class="album-image">
                        <div class="record-disc"></div>
                    </div>
                    <div class="record-info">
                        <h2 class="record-title">${record.album}</h2>
                        <h3 class="record-artist">${record.artist}</h3>
                        <div class="record-meta">
                            <span class="record-tag">${record.year}</span>
                            <span class="record-tag">${record.genre}</span>
                        </div>
                        <p class="record-description">${record.description}</p>
                    </div>
                </div>
            `;
        });
    
        recordsGrid.innerHTML = cards.join('');
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentGenre = button.dataset.genre;
            
            const newURL = currentGenre === 'all' 
                ? window.location.pathname 
                : `${window.location.pathname}?genre=${currentGenre}`;
            window.history.pushState({}, '', newURL);
            
            filterRecords();
        });
    });

    filterRecords();
});