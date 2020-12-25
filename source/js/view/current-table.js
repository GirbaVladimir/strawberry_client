import {createElement} from "../util";

const сheckNone = (value) => {
    return value == 256 ? `-` : value
}

const createCurrentTable = (data) => {
    const {
        currentTemperature,
        currentLightingLevel,
        currentSoilMoisture,
        currentSoilAcidity,
        isTemperatureAnomal,
        isLightingLevelAnomal,
        isSoilMoistureAnomal,
        isSoilAcidityAnomal
    } = data;

    return `<section class="main__current-table current-table">
                <h1 class="current-table__header">текущие значения</h1>
                <ul class="current-table__list">
                    <li class="current-table__item">
                        <p class="current-table__parameter ${(isTemperatureAnomal === `True`) ? `current-table__bad-value` : ``}">температура</p>
                        <p class="current-table__value ${(isTemperatureAnomal === `True`) ? `current-table__bad-value` : ``}">${сheckNone(Math.floor(currentTemperature))}</p>
                    </li>
                    <li class="current-table__item">
                        <p class="current-table__parameter ${(isLightingLevelAnomal  === `True`) ? `current-table__bad-value` : ``}">уровень освещения</p>
                        <p class="current-table__value ${(isLightingLevelAnomal === `True`) ? `current-table__bad-value` : ``}">${сheckNone(Math.floor(currentLightingLevel))}</p>
                    </li>
                    <li class="current-table__item">
                        <p class="current-table__parameter ${(isSoilMoistureAnomal === `True`) ? `current-table__bad-value` : ``}">влажность почвы</p>
                        <p class="current-table__value ${(isSoilMoistureAnomal === `True`) ? `current-table__bad-value` : ``}">${сheckNone(Math.floor(currentSoilMoisture))}</p>
                    </li>
                    <li class="current-table__item">
                        <p class="current-table__parameter ${(isSoilAcidityAnomal === `True`) ? `current-table__bad-value` : ``}">кислотность почвы</p>
                        <p class="current-table__value ${(isSoilAcidityAnomal === `True`) ? `current-table__bad-value` : ``}">${сheckNone(Math.floor(currentSoilAcidity))}</p>
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
}

