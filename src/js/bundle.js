/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/calc.js":
/*!********************!*\
  !*** ./js/calc.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const calc = () => {
    // Формула расчета базовой нормы калорий:
    //для мужчин: BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
    //для женщин: BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)
    const gender = document.querySelector('#gender'),
        female = gender.children[0],
        genderChoose = gender.querySelectorAll('.calculating__choose-item')
        physique = document.querySelector('.calculating__choose_medium'),
        physiques = physique.querySelectorAll('input')
        height = physique.children[0],
        weight = physique.children[1],
        age = physique.children[2],
        numberCheck = /\D/g,
        activity = document.querySelector('.calculating__choose_big'),
        activeChoose = activity.querySelectorAll('.calculating__choose-item'),
        calcResults = document.querySelector('.calculating__result'),
        activeClass = 'calculating__choose-item_active',
        activities = [1.2, 1.375, 1.55, 1.725];

    class CalculatorEnergy {
        constructor() {
            this.genderBase;
            this.groth;
            this.weight;
            this.age;
            this.activity;
            this.calcBase();
            this.calcActive();
            this.calcGroth();
            this.calcWeight();
            this.calcAge();
        }
        calcBase() {
            if (female.classList.contains(activeClass)) {
                this.genderBase = 447.6
            } else {
                this.genderBase = 88.36
            }
        }
        calcActive() {
            activeChoose.forEach((item, index) => {
                if (item.classList.contains(activeClass)) {
                    this.activity = activities[index];
                }
            })
        }
        calcGroth() {
            if (female.classList.contains(activeClass)) {
                this.groth = 3.1 * height.value.replace(numberCheck, "");
            } else {
                this.groth = 4.8 * height.value.replace(numberCheck, "");
            }
        }
        calcWeight() {
            if (female.classList.contains(activeClass)) {
                this.weight = 9.2 * weight.value.replace(numberCheck, "");
            } else {
                this.weight = 13.4 * weight.value.replace(numberCheck, "");
            }
        }
        calcAge() {
            if (female.classList.contains(activeClass)) {
                this.age = 4.3 * age.value.replace(numberCheck, "")
            } else {
                this.age = 5.7 * age.value.replace(numberCheck, "")
            }
        }
        calcResult() {
            calcResults.textContent = Math.floor(((this.genderBase + this.groth + this.weight - this.age) * this.activity))
        }
    }
    const changeActive = (indexClicked, collection) => {
        collection.forEach((item, index) => {
            item.classList.remove(activeClass)
            if (index === indexClicked) {
                item.classList.add(activeClass)  
            }
            if (height.value && weight.value && age.value) {
                new CalculatorEnergy().calcResult();
            }
        });
    };
    const activateButton = (parent) => {
        parent.forEach((choise, index) => {
            choise.addEventListener('click', () => changeActive(index, parent))
        })
    }
    const physiqueReady = () => {
        physiques.forEach(item => {
            item.addEventListener('input', (event) => {
                event.preventDefault();
                if (height.value && weight.value && age.value) {
                    new CalculatorEnergy().calcResult();
                    valueTest();
                    setCacheResults();
                }
            })
        })

    }
    const valueTest = () => {
        physiques.forEach(item => {
            if (item.value <= 0 || item.value.replace(numberCheck, "") === "") {
                calcResults.textContent = 'Please, enter the numbers'
            }
            if (height.value.replace(numberCheck, "") > 220) {
                calcResults.textContent = "You're a very tall persone!:O"
            }
            if (weight.value.replace(numberCheck, "") > 220) {
                calcResults.textContent = "Food is ur best friend!"
            }
            if (age.value.replace(numberCheck, "") > 100) {
                calcResults.textContent = "We doubt u've entered ur age correct :| "
            }
        })
    }
    const cacheResults = () => {
        if (localStorage.getItem('male')) {
            genderChoose[0].classList.remove(activeClass)
            genderChoose[1].classList.add(activeClass)
        }
        if(localStorage.getItem('active')){
            let indexActive = localStorage.getItem('active')
            activeChoose.forEach((item, index) => {
                item.classList.remove(activeClass)
               if(index === +indexActive){ 
                   item.classList.add(activeClass)
               }
            })
        }
        physiques.forEach((item, index) => {
            item.value = localStorage.getItem(`phys${index}`)
            })   
    }
    const setCacheResults = () => {
        if (genderChoose[1].classList.contains(activeClass)) {
            localStorage.setItem('male', true)
        } else {
            localStorage.removeItem('male')
        }
        activeChoose.forEach((item, index) => {
            if(item.classList.contains(activeClass)){
            localStorage.setItem('active', index)
            }    
        })
        physiques.forEach((item, index) => {
            localStorage.setItem(`phys${index}`, item.value)
        })
    }
    activateButton(genderChoose);
    activateButton(activeChoose);
    physiqueReady();
    cacheResults()
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/cards.js":
/*!*********************!*\
  !*** ./js/cards.js ***!
  \*********************/
/***/ ((module) => {


const cards = () => {
    const field = document.querySelector('.menu__field'),
    cardContainer = field.firstElementChild;
    
//learning about constructors
class Card {
    constructor(image, alt, title, description, cost, ...classes) {
        this.image = image;
        this.alt = alt;
        this.title = title;
        this.description = description;
        this.cost = cost;
        this.classes = ['menu__item'];
        this.transfer = 0.15;
        this.changeToUAH();
    }
    changeToUAH(){
        this.cost = (this.cost * this.transfer).toFixed(2);
    }
    addCard() {
        const menuItem = document.createElement('div');
        this.classes.forEach(className => menuItem.classList.add(className));
        // const cards = document.querySelectorAll('.menu__item')
        // cards.forEach(item => {
        //     item.style.cssText = 'margin-right: 20px; '
        // })
        
        menuItem.innerHTML = `<img src="${this.image}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">Меню “${this.title}”</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.cost}</span> $/день</div>
        </div>`;
        cardContainer.append(menuItem);
    }
}   
const render = (data) => {
    //without constructors

    data.forEach((item) => {
        cardContainer.insertAdjacentHTML(
        'beforeend',`<div class = 'menu__item'>
        <img src="${item.img}" alt="${item.alt}">
        <h3 class="menu__item-subtitle">“${item.title}”</h3>
        <div class="menu__item-descr">${item.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${item.price}</span> $/день</div>
        </div>
        </div>`)
    })
    // data.forEach(({img, altimg, title, descr, price}) => {
    //     new Card(img, altimg, title, descr, price).addCard()
    // })
}
    // axios.get('http://localhost:3000/menu')
    // .then((data) => {
    //     data.data.forEach(({img, altimg, title, descr, price}) => {
    //                 new Card(img, altimg, title, descr, price).addCard()
    //             })
    // })
const getGoods = () => {
        fetch('http://localhost:3000/menu')
        .then((responce) => {
            if (responce.ok) {
                return responce.json()
            } else {
                throw new Error('The Data was taken with an error');
            }
        })
        .then((data) => {
            render(data);
        })
        .catch((error) => {
            console.error(error.message)
        })
    }

    getGoods();
}
module.exports = cards;

/***/ }),

/***/ "./js/modal.js":
/*!*********************!*\
  !*** ./js/modal.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./js/services/services.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_services_services__WEBPACK_IMPORTED_MODULE_0__);
    
    const modal = () => {
        const btns = document.querySelectorAll('.btn'),
            modal = document.querySelector('.modal');

        btns.forEach(item => {
            if (item.textContent.includes('Связаться с нами')) {
                item.setAttribute('data-modal', '')
            }
        })
        const modalClose = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        const modalOpen = () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        const btnsOpenModal = document.querySelectorAll("[data-modal]")
        btnsOpenModal.forEach(item => {
            item.addEventListener('click', () => {
                modalOpen();
            })
        })
        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.classList.contains("modal__close")) {
                modalClose();
            }
        })
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.style.display === 'flex') {
                modalClose();
            }
        })
        // const modalTimerId = setTimeout(modalOpen, 3000);

        function showModalByScroll (){
            
                if(window.pageYOffset + document.documentElement.clientHeight >= 
                    document.documentElement.scrollHeight){
                    modalOpen();
                    window.removeEventListener('scroll', showModalByScroll);
                }
        }
        window.addEventListener('scroll', showModalByScroll)

        //Forms

        const forms = document.querySelectorAll('form');

        const message = {
            loading: 'img/spinner/spinner.svg',
            success: "Wow! We did it! Without u it wouldn't work!",
            failure: "Oh no, we've got some problems there, let's solve 'em,\
             eeh, u can get a cup of tea and.. wait a bit, please"
        }
        forms.forEach(item => {
            postData(item);
        })

        
        function postData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                
                const statusMessage = document.createElement('img');
                statusMessage.setAttribute('src', message.loading);
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage);

                //in input must be set atribute 'name' not important what 
                //is in it, else we can't get the form's content

                const formData = new FormData(form);

                const json = JSON.stringify(Object.fromEntries(formData.entries()))


                //If we use the combination of XMLHttpRequest and FormData
                //we don't need to setRequestHeader, it creates by auto

                
                
                ;(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.sendData)('http://localhost:3000/requests', json)
                .then(data => {
                        console.log(data);
                        showThanksModal(message.success);
                        statusMessage.remove();
                        form.reset();
                })
                .catch(() => {
                        showThanksModal(message.failure)

                })
                .finally(() => {
                    form.reset()
                })
            
            })
        }
        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');
            prevModalDialog.style.display = 'none';
            modalOpen();

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class= "modal__content">
                    <div class="modal__close">✖︎</div>
                    <div class="modal__title">${message}</div>
                    
                </div>
            `;
            
            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.style.display = 'block';
                modalClose();
            }, 4000)
            
        }
       fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res))
    }
    
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);    


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (() => {



/***/ }),

/***/ "./js/slider.js":
/*!**********************!*\
  !*** ./js/slider.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/tabs.js":
/*!********************!*\
  !*** ./js/tabs.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const tabsFunc = () => {
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabContent = document.querySelector('.tabcontent');
    const tabsImage = tabContent.querySelector('img');
    const tabsDescr = document.querySelector('.tabcontent__descr');
    const tabsTitle = document.querySelector('.tabheader__item');

    const tabOptions = [{
                title: 'Фитнес',
                image: 'img/tabs/vegy.jpg',
                description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей\
                 и фруктов. Для людей, которые интересуются спортом; активных и здоровых. Это абсолютно \
                 новый продукт с оптимальной ценой и высоким качеством!',
            },
            {
                title: 'Премиум',
                image: 'img/tabs/elite.jpg',
                description: 'Меню “Премиум” - мы используем не только красивый дизайн упаковки, \
                но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты -\
                 ресторанное меню без похода в ресторан!',
            },
            {
                title: 'Постное',
                image: 'img/tabs/post.jpg',
                description: 'Наше специальное “Постное меню” - это тщательный подбор ингредиентов: \
                полное отсутствие продуктов животного происхождения. Полная гармония с собой\
                 и природой в каждом элементе! Все будет Ом!',
            },
            {
                title: 'Сбалансированное',
                image: 'img/tabs/vegy.jpg',
                description: 'Меню "Сбалансированное" - это соответствие вашего рациона всем научным\
                 рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у\
                  и создаем лучшие блюда для вас.',
            }
        ]

        const changeContent = (index) => {
            tabsImage.setAttribute('src', tabOptions[index].image);
            tabsDescr.textContent = `${tabOptions[index].description}`;
        };
        const changeActiveTabs = (indexClickedTab) => {
            tabs.forEach((tabhead, index) => {
                tabhead.classList.remove('tabheader__item_active')
                if(index === indexClickedTab){
                    tabhead.classList.add('tabheader__item_active')
                }
            });
            changeContent(indexClickedTab);
        }
        tabs.forEach((tabhead, index) => {
            tabhead.addEventListener('click', () => changeActiveTabs(index))
        })
        changeContent(0);

} 
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabsFunc);

/***/ }),

/***/ "./js/timeOut.js":
/*!***********************!*\
  !*** ./js/timeOut.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const timeOut = () => {
    const timer = setInterval(function () {
        const days = document.getElementById('days'),
            hours = document.getElementById('hours'),
            minutes = document.getElementById('minutes'),
            seconds = document.getElementById('seconds'),
            timeBlocks = document.querySelectorAll('.timer__block'),
    
            endData = new Date(2022, 4, 20),
            now = new Date(),
            difference = endData - now;
    
        days.textContent = Math.floor(difference / (1000 * 60 * 60 * 24));
        if (days.textContent > 100){
            timeBlocks[0].style.width = `140px`;
        }
    
        hours.textContent = Math.floor((difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
    
        if (hours.textContent < 10){
            hours.textContent = '0' + hours.textContent;
        }
    
        minutes.textContent = Math.floor((difference % (1000 * 60 * 60) / (1000 * 60)));
        if (minutes.textContent < 10){
            minutes.textContent = '0' + minutes.textContent;
        }
    
        seconds.textContent = Math.floor((difference % (1000 * 60) / 1000));
        if (seconds.textContent < 10){
            seconds.textContent = '0' + seconds.textContent;
        }
    }, 1000);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timeOut);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs */ "./js/tabs.js");
/* harmony import */ var _calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calc */ "./js/calc.js");
/* harmony import */ var _timeOut__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timeOut */ "./js/timeOut.js");
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cards */ "./js/cards.js");
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_cards__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./slider */ "./js/slider.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modal */ "./js/modal.js");






window.addEventListener('DOMContentLoaded', () => {
 
        (0,_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
        (0,_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
        (0,_timeOut__WEBPACK_IMPORTED_MODULE_2__["default"])();
        _cards__WEBPACK_IMPORTED_MODULE_3___default()();
        (0,_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
        (0,_modal__WEBPACK_IMPORTED_MODULE_5__["default"])()
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map