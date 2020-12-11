import {createElement} from "../util";

const createGreenHouseButton = (value) => {
    return `<li class="navigator__item" data-value="${value}">
        <a class="navigator__link" href="#${value}" >теплица ${value}</a>
     </li>`
};

export default class GreenHouseButton {
    constructor(value) {
        this._value = value;

        this._element = null;
    }

    getTemplate() {
        return createGreenHouseButton(this._value);
    }

    getElement() {
        if (!this._element) {
            this._element = createElement(this.getTemplate());
        }

        return this._element;
    }

    removeElement() {
        this._element = null;
    }
};