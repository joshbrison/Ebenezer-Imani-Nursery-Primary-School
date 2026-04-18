// ===== School Songs & Anthems Music Player =====
document.addEventListener('DOMContentLoaded', function () {
    // Song data
    const songs = [
        {
            title: 'Ebenezer Imani School Song',
            artist: 'Official School Song',
            src: 'images/ebenezer primary imani - ebenezer imani nursery and primary school.mp3',
        },
        {
            title: 'Cultural Song',
            artist: 'Empisa - Ebenezer Imani Nursery and Primary',
            src: 'images/empisa - ebenezer imani nursery and primary school.mp3',
        },
        {
            title: 'School Choir Performance',
            artist: 'Choir performance during last year\'s music festival',
            src: 'images/katambule - ebenezer imani nursery and primary school.mp3',
        },
        {
            title: 'Cultural Songs',
            artist: 'Traditional songs and dances from different tribes',
            src: 'images/ebenezer primary imani - ebenezer imani nursery and primary school.mp3',
        },
    ];

    // Player elements
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const playlistEl = document.getElementById('playlist');

    let currentSong = 0;
    let isPlaying = false;

    // Load playlist
    function renderPlaylist() {
        playlistEl.innerHTML = '';
        songs.forEach((song, idx) => {
            const item = document.createElement('div');
            item.className = 'playlist-item' + (idx === currentSong ? ' active' : '');
            item.innerHTML = `<span class="playlist-title">${song.title}</span><span class="playlist-artist">${song.artist}</span>`;
            item.addEventListener('click', () => {
                loadSong(idx);
                playSong();
            });
            playlistEl.appendChild(item);
        });
    }

    // Load song
    function loadSong(idx) {
        currentSong = idx;
        audioPlayer.src = songs[idx].src;
        songTitle.textContent = songs[idx].title;
        songArtist.textContent = songs[idx].artist;
        renderPlaylist();
        updatePlayPauseIcon();
    }

    // Play
    function playSong() {
        audioPlayer.play();
        isPlaying = true;
        updatePlayPauseIcon();
    }

    // Pause
    function pauseSong() {
        audioPlayer.pause();
        isPlaying = false;
        updatePlayPauseIcon();
    }

    // Toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    // Next song
    function nextSong() {
        currentSong = (currentSong + 1) % songs.length;
        loadSong(currentSong);
        playSong();
    }

    // Previous song
    function prevSong() {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        loadSong(currentSong);
        playSong();
    }

    // Update progress bar
    function updateProgress() {
        if (!audioPlayer.duration) return;
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        durationEl.textContent = formatTime(audioPlayer.duration);
    }

    // Seek
    function seek(e) {
        if (!audioPlayer.duration) return;
        const percent = e.target.value;
        audioPlayer.currentTime = (percent / 100) * audioPlayer.duration;
    }

    // Format time
    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    // Update play/pause icon
    function updatePlayPauseIcon() {
        if (isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
        // Highlight active song in playlist
        document.querySelectorAll('.playlist-item').forEach((el, idx) => {
            el.classList.toggle('active', idx === currentSong);
        });
    }

    // Event listeners
    playPauseBtn && playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn && nextBtn.addEventListener('click', nextSong);
    prevBtn && prevBtn.addEventListener('click', prevSong);
    progressBar && progressBar.addEventListener('input', seek);
    audioPlayer && audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer && audioPlayer.addEventListener('ended', nextSong);

    // Initial load
    if (audioPlayer && playPauseBtn && playlistEl) {
        loadSong(currentSong);
        renderPlaylist();
        updateProgress();
    }
});
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Hero Slider
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentSlide = index;
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// Auto slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Tab Switching for Media Gallery
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Sample News Data (in production, this would come from an API)
const newsData = [
    {
        title: "School Opening Date",
        date: "January 15, 2024",
        excerpt: "Term 1 begins on February 5th, 2024. All students should report by 8:00 AM.",
        category: "Announcement"
    },
    {
        title: "Sports Day Success",
        date: "December 10, 2023",
        excerpt: "Our annual sports day was a huge success with record participation.",
        category: "Event"
    },
    {
        title: "New Computer Lab",
        date: "November 25, 2023",
        excerpt: "We have opened a new computer lab with 30 computers for our students.",
        category: "Development"
    }
];

// Populate News Section
function populateNews() {
    const newsGrid = document.querySelector('.news-grid');
    newsData.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <div class="news-category">${news.category}</div>
            <h3>${news.title}</h3>
            <div class="news-date">${news.date}</div>
            <p>${news.excerpt}</p>
            <a href="#" class="read-more">Read More →</a>
        `;
        newsGrid.appendChild(newsItem);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateNews();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form Validation Example (for contact form)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if(!form) return true;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if(!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

