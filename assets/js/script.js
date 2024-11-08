/*--------------- toogle navbar ---------------*/


let menuIcon = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navBar.classList.toggle('active');
}

/*--------------- clase active de navbar y scroll a section ---------------*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        console.log(`Section: ${id}, Offset: ${offset}, Height: ${height}`); // Verifica los valores de cada sección

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    /*--------------- remover el toggle del icon y navbar cuando hace click en el navbar link ---------------*/

    navLinks.forEach(link => {
        link.onclick = () => {
            menuIcon.classList.remove('bx-x');
            navBar.classList.remove('active');
        }
    });
};

/*--------------- scroll reveal ---------------*/

ScrollReveal({
    reset: true,
    distance: '100px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .conoceme-title, .proyectos-title, .contact-title', { origin: 'top' });
ScrollReveal().reveal('.home img, .proyectos-container,.contact form', { origin: 'bottom' });

/*--------------- typed js ---------------*/

const typed = new Typed('.multiple-text', {
    strings: ['Desarrollador Web Frontend'],
    typeSpeed: 100,
    backSpeed: 120,
    loop: true
});

