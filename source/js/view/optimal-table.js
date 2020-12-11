import {createElement} from "../util";

const createOptimalTable = (data) => {
    const {
        optimalTemperature,
        optimalLightingLevel,
        optimalSoilMoisture,
        optimalSoilAcidity
    } = data;

    return `<section class="main__optimal-table optimal-table">
                <h1 class="optimal-table__header">оптимальные значения</h1>
                <ul class="optimal-table__list">
                    <li class="optimal-table__item">
                        <p class="optimal-table__parameter">температура</p>
                        <p class="optimal-table__value">${optimalTemperature}</p>
                    </li>
                    <li class="optimal-table__item">
                        <p class="optimal-table__parameter">уровень освещения</p>
                        <p class="optimal-table__value">${optimalLightingLevel}</p>
                    </li>
                    <li class="optimal-table__item">
                        <p class="optimal-table__parameter">влажность почвы</p>
                        <p class="optimal-table__value">${optimalSoilMoisture}</p>
                    </li>
                    <li class="current-table__item">
                        <p class="optimal-table__parameter">кислотность почвы</p>
                        <p class="optimal-table__value">${optimalSoilAcidity}</p>
                    </li>
                </ul>
            </section>`;
};

export default class OptimalTable {
    constructor(data) {
        this._data = data;

        this._element = null;
    }

    getTemplate() {
        return createOptimalTable(this._data);
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

