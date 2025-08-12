document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk toggle menu navbar (untuk mobile)
    const menuBtn = document.querySelector('#menu-btn');
    const navbar = document.querySelector('.navbar');

    if (menuBtn && navbar) {
        menuBtn.onclick = () => {
            menuBtn.classList.toggle('fa-times');
            navbar.classList.toggle('active');
        };

        // Menutup navbar saat link navigasi diklik (untuk mobile)
        document.querySelectorAll('.navbar a').forEach(link => {
            link.onclick = () => {
                menuBtn.classList.remove('fa-times');
                navbar.classList.remove('active');
            };
        });
    }

    // Menutup navbar saat user scroll (untuk mobile)
    window.onscroll = () => {
        if (navbar && menuBtn) { // Pastikan elemen ada sebelum diakses
            menuBtn.classList.remove('fa-times');
            navbar.classList.remove('active');
        }
    };

    // Auto update tahun di footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Scroll aktif pada navigasi berdasarkan posisi scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.header .navbar a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight; // Offset untuk header fixed
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Tampilkan/sembunyikan tombol "Scroll ke Atas"
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'flex'; // Menggunakan flex agar ikon di tengah
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }
    });

    // Tambahkan class 'active' ke link navigasi saat halaman dimuat
    // Untuk memastikan link home aktif saat pertama kali load
    const homeLink = document.querySelector('.navbar a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }

    // Kode untuk efek mengetik:
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const textToType = typingText.textContent;
        typingText.textContent = ''; // Hapus teks asli untuk memulai efek
        let charIndex = 0;

        const type = () => {
            if (charIndex < textToType.length) {
                typingText.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 150); // Kecepatan mengetik
            }
        };
        type();
    }

    // Kode untuk fitur Mode Gelap
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Periksa preferensi tema dari Local Storage saat halaman dimuat
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.classList.replace('fa-moon', 'fa-sun');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeToggle.classList.replace('fa-moon', 'fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                darkModeToggle.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }
});