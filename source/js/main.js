import GreenHouseButton from "./view/greenhouse-button";
import CurrentTable from "./view/current-table";
import OptimalTable from "./view/optimal-table";
import {RenderPosition, renderTemplate} from "./util";
import {render} from "./util";
import {createGraph} from "./view/graph";

const GREENHOUSES_AMOUNT = 3;

const mocks = [{
    currentTemperature: 100,
    currentLightingLevel: 3,
    currentSoilMoisture: `60%`,
    currentSoilAcidity: 11,
    optimalTemperature: 10,
    optimalLightingLevel: 3000,
    optimalSoilMoisture: `60%`,
    optimalSoilAcidity: 7
}, {
    currentTemperature: 13,
    currentLightingLevel: 2000,
    currentSoilMoisture: `10%`,
    currentSoilAcidity: 2,
    optimalTemperature: 30,
    optimalLightingLevel: 11,
    optimalSoilMoisture: `65%`,
    optimalSoilAcidity: 7
}, {
    currentTemperature: 100,
    currentLightingLevel: 3,
    currentSoilMoisture: `60%`,
    currentSoilAcidity: 11,
    optimalTemperature: 10,
    optimalLightingLevel: 3000,
    optimalSoilMoisture: `60%`,
    optimalSoilAcidity: 7
}];

const navigatorList = document.querySelector(`.navigator__list`);

for (let i = 1; i <= GREENHOUSES_AMOUNT; i++) {
    render(navigatorList, new GreenHouseButton(i).getElement(), RenderPosition.BEFOREEND);
}

const renderMainContainer = (data) => {
    const mainContainer = document.querySelector(`.main__wrapper`);
    mainContainer.innerHTML = ``;

    render(mainContainer, new CurrentTable(data).getElement(), RenderPosition.BEFOREEND);
    render(mainContainer, new OptimalTable(data).getElement(), RenderPosition.BEFOREEND);
    renderTemplate(mainContainer, createGraph(), RenderPosition.BEFOREEND);
};

if (document.querySelector(`.navigator__item`)) {
    document.querySelector(`.navigator__item`).classList.add(`navigator__item--active`);
}

renderMainContainer(mocks[0]);

const addGreenhousesHandlers = () => {
    const greenhousesButtons = document.querySelectorAll(`.navigator__item`);

    greenhousesButtons.forEach((button) => {
        button.addEventListener(`click`, () => {
            disableAllActiveGreenhousesButtons();
            button.classList.add(`navigator__item--active`);
            renderMainContainer(mocks[button.dataset.value - 1]);
        });
    });
};

const disableAllActiveGreenhousesButtons = () => {
    document.querySelectorAll(`.navigator__item`).forEach((el) => {
        if (el.classList.contains(`navigator__item--active`)) {
            el.classList.remove(`navigator__item--active`);
        }
    });
};

addGreenhousesHandlers();
