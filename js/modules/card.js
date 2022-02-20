import { getCards } from "../services/services";
function cards() {
    class Card {
        constructor(title, descr, price, img, alt, parentSelector, ...classes) {
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.img = img;
            this.parentSelector = document.querySelector(parentSelector);
            this.alt = alt;
            this.trasfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.trasfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parentSelector.append(element);
        }
    }

    

    getCards('http://localhost:3000/menu').then(data => {
        data.forEach(({title, descr, price, img, altimg}) => {
            new Card(title, descr, price, img, altimg, '.menu .container').render();
        });
    });
}

export default cards;