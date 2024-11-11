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


/*--------------- form validation ---------------*/

const showError = (element, msj) => {  
    element.textContent = msj;
    element.style.display = 'block';
}
const unshowError = (element, msj) => { 
    element.textContent = '';
    element.style.display = 'none';
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

const validateCaptcha = () => {
    const captchaResponse = grecaptcha.getResponse();
    const errorCaptcha = document.getElementById('errorCaptcha');

    if (captchaResponse.length === 0) {
        showError(errorCaptcha, 'Por favor, completa el captcha.');
        return false;
    } else {
        unshowError(errorCaptcha);
        return true;
    }
}

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    const isFormValid = validateForm();
    const isCaptchaValid = validateCaptcha();

    if (isFormValid && isCaptchaValid) {
        event.target.submit();
    }
});


