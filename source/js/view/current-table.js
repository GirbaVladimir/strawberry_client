import {createElement} from "../util";

const checkBadTemperature = (val) => {
    if (val <= 0 || val >= 100) {
        return `current-table__bad-value`;
    }
    return ``;
}

const checkBadLightingLevel = (val) => {
    if (val <= 2 || val >= 50) {
        return `current-table__bad-value`;
    }
    return ``;
}

const checkBadSoilMoisture = (val) => {
    val = parseInt(val, 10);
    if (val <= 30 || val >= 70) {
        return `current-table__bad-value`;
    }
    return ``;
}

const checkBadSoilAcidity = (val) => {
    if (val <= 0 || val >= 10) {
        return `current-table__bad-value`;
    }
    return ``;
}

const createCurrentTable = (data) => {
    const {
        currentTemperature,
        currentLightingLevel,
        currentSoilMoisture,
        currentSoilAcidity
    } = data;

    return `<section class="main__current-table current-table">
                <h1 class="current-table__header">текущие значения</h1>
                <ul class="current-table__list">
                    <li class="current-table__item">
                        <p class="current-table__parameter ${checkBadTemperature(currentTemperature)}">температура</p>
                        <p class="current-table__value ${checkBadTemperature(currentTemperature)}">${currentTemperature}</p>
                    </li>
                    <li class="current-table__item">
                        <p class="current-table__parameter ${checkBadLightingLevel(currentLightingLevel)}">уровень освещения</p>
                        <p class="current-table__value ${checkBadLightingLevel(currentLightingLevel)}">${currentLightingLevel}</p>
                    </li>
                    <li class="current-table__item">
                        <p class="current-table__parameter ${checkBadSoilMoisture(currentSoilMoisture)}">влажность почвы</p>
                        <p class="current-table__value ${checkBadSoilMoisture(currentSoilMoisture)}">${currentSoilMoisture}</p>
                    </li>
                    <li class="current-table__item">
                        <p class="current-table__parameter ${checkBadSoilAcidity(currentSoilAcidity)}">кислотность почвы</p>
                        <p class="current-table__value ${checkBadSoilAcidity(currentSoilAcidity)}">${currentSoilAcidity}</p>
                    </li>
                </ul>
            </section>`;
};

export default class CurrentTable {
    constructor(data) {
        this._data = data;

        this._element = null;
    }

    getTemplate() {
        return createCurrentTable(this._data);
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

