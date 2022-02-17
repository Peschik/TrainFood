
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