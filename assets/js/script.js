
/*--------------- languaje ---------------*/
const langButtons = document.querySelectorAll("[data-language]");
const textsToChange = document.querySelectorAll("[data-section]");
const spansToChange = document.querySelectorAll("span[data-section]");
console.log(textsToChange);
console.log(spansToChange);


langButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        try {
            const res = await fetch(`../languages/${button.dataset.language}.json`);
            const data = await res.json();
            
            textsToChange.forEach((el) => {
                const section = el.dataset.section;
                const value = el.dataset.value;

                el.innerHTML = data[section][value];
            });

            spansToChange.forEach((span=> {
                const section = span.dataset.section;
                const value = span.dataset.value;

                span.innerHTML = data[section][value];
            }));

            if (button.dataset.language === 'es') {
                typed.strings = ['Desarrollador Web Frontend'];
            } else {
                typed.strings = ['Frontend Web Developer'];
            }
            typed.reset();
        } catch (error) {
            console.log('error al cargar el archivo', error);
        }
    });
});


/*--------------- dark-ligth mood ---------------*/

const preferedColorTheme = window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';
const slider= document.getElementById('slider');
const changeTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

if (slider){ 
slider.addEventListener('click', () => {
    let switchTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    changeTheme(switchTheme);
});
}

changeTheme(localStorage.getItem('theme') || preferedColorTheme);




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
    strings: ['Desarrollador Web Frontend', 'Frontend Web Developer'],
    typeSpeed: 100,
    backSpeed: 150,
    loop: true
});


/*--------------- form validation ---------------*/

const showError = (element, msj) => {  
    element.textContent = msj;
    element.style.display = 'block';

    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    inputs.forEach(input => {
        input.style.boxShadow = '0 0 1rem var(--error-color)';
        input.addEventListener('focus', () => {
            unshowError(element);
            input.style.boxShadow = '0 0 1rem var(--main-color)';
    });
    });
}
const unshowError = (element, msj) => { 
    element.textContent = '';
    element.style.display = 'none';

    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    inputs.forEach(input => {
        input.style.boxShadow = 'none';
    });
}

const submitFunction = (event) => {
    if(!validationForm()){
        event.preventDefault();
    } 
}

document.getElementById('form').addEventListener('submit', submitFunction) 

function validationForm(){
    const textAreas = document.querySelectorAll('input[type="text"]');
    let correctValidation = true;

    textAreas.forEach(area => {
        let errorArea = document.getElementById('error' + area.id.charAt(0).toUpperCase() + area.id.slice(1)) 
        if (area.value.length == ''){
            showError(errorArea, 'Este campo es obligatorio')
            correctValidation = false
        }else if(area.value.length < 3){
            showError(errorArea, 'Este campo debe tener al menos 3 caracteres')
            correctValidation = false
        } else {
            unshowError(errorArea)
        }
    });

    const email = document.getElementById('Email');
    let errorEmail = document.getElementById('errorEmail');

    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ 
        unshowError(errorEmail)
    } else {
        showError(errorEmail, 'Debes ingresar un formato de mail valido')
    }

    return correctValidation;
};




