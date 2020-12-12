import {createElement} from "../util";

const createOptimalTable = (data) => {
    const {
        optimalTemperature,
        optimalLightingLevel,
        optimalSoilMoisture,
        optimalSoilAcidity
    } = data;

    return `<section class="main__optimal-table optimal-table">
                <h1 class="optimal-table__header">рекомендации*  <span class="optimal-table__header-tooltip"> *рекомендации для максимизации урожая, основанные на вычисленных оптимальных условиях</span></h1>
                <ul class="optimal-table__list">
                    <li class="optimal-table__item">
                        <p class="optimal-table__parameter">увеличить на</p>
                        <p class="optimal-table__value">${optimalTemperature}</p>
                    </li>
                    <li class="optimal-table__item">
                        <p class="optimal-table__parameter">уменьшить на</p>
                        <p class="optimal-table__value">${optimalLightingLevel}</p>
                    </li>
                    <li class="optimal-table__item">
                        <p class="optimal-table__parameter">значение оптимально</p>
                        <p class="optimal-table__value">${optimalSoilMoisture}</p>
                    </li>
                    <li class="current-table__item">
                        <p class="optimal-table__parameter">увеличить на</p>
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

