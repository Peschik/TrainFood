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
export default tabsFunc;