const slider = () => {

let offset = 0;
let slideIndex = 1;

const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector('.offer__slider-inner');

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent =  `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent =  slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = '650px';
});

next.addEventListener('click', () => {
    if (offset == 650 * (slides.length - 1)) {
        offset = 0;
        dotActivate()

    } else {
        offset += 650; 
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    


    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    currentSlideChange()
    dotActivate();
});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = 650 * (slides.length - 1);

    } else {
        offset -= 650;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;


    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }
    dotActivate()

    currentSlideChange();
});
const mainSlider = document.querySelector('.offer__slider')
const indicator = document.createElement('ol');
      

      indicator.classList.add('carousel-indicators');
      
      mainSlider.style.position = 'relative'
mainSlider.prepend(indicator);

for(let i = 0; i < slides.length; i++){
    const dot = document.createElement('li')
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i + 1);
    indicator.append(dot)
}


const dots = document.querySelectorAll('.dot');

const dotActivate = () => {
    dots.forEach((dot, index) => {
        const dotNumber = dot.getAttribute('data-slide-to')
        if(slideIndex === +dotNumber){
            dot.classList.add('activeDot')
        } else {
            dot.classList.remove('activeDot');
        }
    })
    
}

const dotSlideChange = () => {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            offset = 650 * index;
            slideIndex = index + 1;
            slidesField.style.transform = `translateX(-${offset}px)`;
            dotActivate()
            currentSlideChange()
        })
    })
}

const currentSlideChange = () => {
    if (slides.length < 10) {
        current.textContent =  `0${slideIndex}`;
    } else {
        current.textContent =  slideIndex;
    }
}
dotActivate()
dotSlideChange()
}
export default slider;