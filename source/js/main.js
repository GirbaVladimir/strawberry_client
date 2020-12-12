import GreenHouseButton from "./view/greenhouse-button";
import CurrentTable from "./view/current-table";
import OptimalTable from "./view/optimal-table";
import {RenderPosition, renderTemplate} from "./util";
import {render} from "./util";
import {createGraph} from "./view/graph";
import {backendGet} from "./backend-connection"
const Chart = require('chart.js');
import {fillGraph} from "./view/graph";

const mocks = {data: [{
    currentTemperature: 30,
    currentLightingLevel: 3,
    currentSoilMoisture: `60%`,
    currentSoilAcidity: 5,
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
}]};

const graphMock = {
    temperatures: [30, 120, -30, 10, 40, NaN, 120, -30, 10, 40, 30, 120, -30, 10, 40, 30, 120, -30, 10, 40, 30, 120, -30, 10, 40, 30, 120, -30, 10, 40],
    lightingLevels: [2, 2, 3, 4, 5],
    soilMoisture: [100, 2, 3, 4, 5],
    soilAcidity: [-10, 2, 3, 4, 5],
    date: [`10-10-2020`, `17-10-2020`, `24-10-2020`, `30-10-2020`, `6-10-2020`,`10-10-2020`, `17-10-2020`, `24-10-2020`, `30-10-2020`, `6-10-2020`,`10-10-2020`, `17-10-2020`, `24-10-2020`, `30-10-2020`, `6-10-2020`,`10-10-2020`, `17-10-2020`, `24-10-2020`, `30-10-2020`, `6-10-2020`,`10-10-2020`, `17-10-2020`, `24-10-2020`, `30-10-2020`, `6-10-2020`,`10-10-2020`, `17-10-2020`, `24-10-2020`, `30-10-2020`, `6-10-2020`]
};

const renderMainContainer = (data) => {
    const mainContainer = document.querySelector(`.main__wrapper`);
    mainContainer.innerHTML = ``;

    render(mainContainer, new CurrentTable(data).getElement(), RenderPosition.BEFOREEND);
    render(mainContainer, new OptimalTable(data).getElement(), RenderPosition.BEFOREEND);
    renderTemplate(mainContainer, createGraph(), RenderPosition.BEFOREEND);

    console.log(document.querySelector(`.navigator__item--active`).dataset.value);

    backendGet(`https://21.javascript.pages.academy/keksobooking/data`)
        .then(
            response => renderGraph(graphMock),
            error => alert(`Rejected: ${error}`)
        );
};

const addGreenhousesHandlers = () => {
    const greenhousesButtons = document.querySelectorAll(`.navigator__item`);

    greenhousesButtons.forEach((button) => {
        button.addEventListener(`click`, () => {
            disableAllActiveGreenhousesButtons();
            button.classList.add(`navigator__item--active`);
            renderMainContainer(mocks.data[button.dataset.value - 1]);
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

const initializePage = () => {
    backendGet(`https://21.javascript.pages.academy/keksobooking/data`)
        .then(
            response => renderGreenhouses(mocks.data), // response
            error => alert(`Rejected: ${error}`)
        );
};

const renderGreenhouses = (data) => {
    const navigatorList = document.querySelector(`.navigator__list`);

    for (let i = 1; i <= data.length; i++) {
        render(navigatorList, new GreenHouseButton(i).getElement(), RenderPosition.BEFOREEND);
    }

    if (document.querySelector(`.navigator__item`)) {
        document.querySelector(`.navigator__item`).classList.add(`navigator__item--active`);
    }

    renderMainContainer(data[0]);
    addGreenhousesHandlers();
};

const renderGraph = (graphDate) => {
    const chart = fillGraph(graphDate.temperatures, graphDate.date);
    let currentGraph = 0;

    function updateConfigByMutating(chart, res, title, color) {
        chart.data.datasets[0].data = res;
        chart.data.datasets[0].label = title;
        chart.data.datasets[0].backgroundColor = color;
        chart.update();
    }

    document.querySelector(`.main__graph-next-arrow`).addEventListener(`click`, () => {

        switch (currentGraph) {
            case 0:
                updateConfigByMutating(chart, graphDate.lightingLevels, `Уровень освещения`, `rgba(255, 230, 0, 0.3)`);
                currentGraph++;
                console.log(1);
                break;
            case 1:
                updateConfigByMutating(chart, graphDate.soilMoisture, `Влажность почвы`, `rgba(61, 173, 255, 0.3)`);
                currentGraph++;
                break;
            case 2:
                updateConfigByMutating(chart, graphDate.soilAcidity, `Кислотность почвы`, `rgba(159, 255, 180, 0.3)`);
                currentGraph++;
                break;
            case 3:
                updateConfigByMutating(chart, graphDate.temperatures, `Температура`, `rgba(88, 252, 222, 0.3)`);
                currentGraph = 0;
                break;
        };
    });

    document.querySelector(`.main__graph-prew-arrow`).addEventListener(`click`, () => {

        switch (currentGraph) {
            case 0:
                updateConfigByMutating(chart, graphDate.soilAcidity, `Кислотность почвы`, `rgba(159, 255, 180, 0.3)`);
                currentGraph = 3;
                break;
            case 1:
                updateConfigByMutating(chart, graphDate.temperatures, `Температура`, `rgba(88, 252, 222, 0.3)`);
                currentGraph--;
                break;
            case 2:
                updateConfigByMutating(chart, graphDate.lightingLevels, `Уровень освещения`, `rgba(255, 230, 0, 0.3)`);
                currentGraph--;
                break;
            case 3:
                updateConfigByMutating(chart, graphDate.soilMoisture, `Влажность почвы`, `rgba(61, 173, 255, 0.3)`);
                currentGraph--;
                break;
        };
    });
};

initializePage();
