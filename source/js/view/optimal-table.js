import {createElement} from "../util";

const checkOptimalValue = (val, current) => {
    if (current == 256) {
        return `-`
    } else {
        if (val < 0) {
            return `уменьшить на`;
        } else if (val > 0) {
            return `увеличить на`;
        }
    }

    return `значение оптимально`;
}

const сheckNone = (value, res) => {
    return value == 256 ? `-` : res
}

const createOptimalTable = (data) => {
    const {
        currentTemperature,
        currentLightingLevel,
        currentSoilMoisture,
        currentSoilAcidity,
        optimalTemperature,
        optimalLightingLevel,
        optimalSoilMoisture,
        optimalSoilAcidity
    } = data;

    return `<section class="main__optimal-table optimal-table">
                <h1 class="optimal-table__header">рекомендации*  <span class="optimal-table__header-tooltip"> *рекомендации для максимизации урожая, основанные на вычисленных оптимальных условиях</span></h1>
                <ul class="optimal-table__list">
                    <li class="optimal-table__item">
                        <p class="optimal-table__parameter">${checkOptimalValue(optimalTemperature, currentTemperature)}</p>
                        <p class="optimal-table__value">${сheckNone(currentTemperature, Math.abs(Math.floor(optimalTemperature)))}</p>
                    </li>
                    <li class="optimal-table__item">
                        <p class="optimal-table__parameter">${checkOptimalValue(optimalLightingLevel, currentLightingLevel)}</p>
                        <p class="optimal-table__value">${сheckNone(currentLightingLevel, Math.abs(Math.floor(optimalLightingLevel)))}</p>
                    </li>
                    <li class="optimal-table__item">
                        <p class="optimal-table__parameter">${checkOptimalValue(optimalSoilMoisture,  currentSoilMoisture)}</p>
                        <p class="optimal-table__value">${сheckNone(currentSoilMoisture, Math.abs(Math.floor(optimalSoilMoisture)))}</p>
                    </li>
                    <li class="current-table__item">
                        <p class="optimal-table__parameter">${checkOptimalValue(optimalSoilAcidity,  currentSoilAcidity)}</p>
                        <p class="optimal-table__value">${сheckNone(currentSoilAcidity, Math.abs(Math.floor(optimalSoilAcidity)))}</p>
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

