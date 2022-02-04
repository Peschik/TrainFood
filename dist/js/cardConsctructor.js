const field = document.querySelector('.menu__field'),
    cardContainer = field.firstElementChild;
    

class Card {
    constructor(image, alt, title, description, cost, ...classes) {
        this.image = image;
        this.alt = alt;
        this.title = title;
        this.description = description;
        this.cost = cost;
        this.classes = classes || ['menu__item'];
        this.transfer = 0.15;
        this.changeToUAH();
    }
    changeToUAH(){
        this.cost = this.cost * this.transfer;
    }
    addCard() {
        const menuItem = document.createElement('div');
        this.classes.forEach(className => menuItem.classList.add(className));
        const cards = document.querySelectorAll('.menu__item')
        cards.forEach(item => {
            item.style.cssText = 'margin-right: 20px; '
        })
        menuItem.classList.add('menu__item');
        
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
const balansed = new Card("img/tabs/vegy.jpg", "vegy", 'Сбалансированное', 'Меню "Сбалансированное"\
     - это соответствие вашего рациона всем научным\
    рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у\
     создаем лучшие блюда для вас.', '500', 'menu__item')
balansed.addCard();
const a = new Card("img/tabs/vegy.jpg", "vegy", 'Сбалансированное', 'Меню "Сбалансированное"\
     - это соответствие вашего рациона всем научным\
    рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у\
     создаем лучшие блюда для вас.', '500', 'menu__item')
a.addCard();
const b = new Card("img/tabs/vegy.jpg", "vegy", 'Сбалансированное', 'Меню "Сбалансированное"\
     - это соответствие вашего рациона всем научным\
    рекомендациям. Мы тщательно просчитываем вашу потребность в к/б/ж/у\
     создаем лучшие блюда для вас.', '500', 'menu__item')
b.addCard();
