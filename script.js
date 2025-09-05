document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    // --- PRELOADER ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // --- LOGIKA DARK MODE ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    darkModeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // --- ANIMASI KARTU SAAT SCROLL ---
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".book-card", {
        duration: 0.8,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: ".card-grid",
            start: "top 80%",
            toggleActions: "play none none none",
        },
    });

    // --- LOGIKA MODAL ---
    const modal = document.querySelector('.book-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const bookCards = document.querySelectorAll('.book-card');

    bookCards.forEach(card => {
        card.querySelector('.listen-btn').addEventListener('click', () => {
            const data = card.dataset;
            modal.querySelector('.modal-cover img').src = data.img;
            modal.querySelector('.modal-title').textContent = data.title;
            modal.querySelector('.modal-author').textContent = "oleh " + data.author;
            modal.querySelector('.modal-description').textContent = data.desc;
            modal.querySelector('.modal-audio').src = data.audio;
            modal.classList.add('visible');
        });
    });

    const closeModal = () => {
        modal.classList.remove('visible');
        modal.querySelector('.modal-audio').pause();
    };

    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- LOGIKA TOMBOL KEMBALI KE ATAS ---
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

});