import GreenHouseButton from "./view/greenhouse-button";
import CurrentTable from "./view/current-table";
import OptimalTable from "./view/optimal-table";
import {RenderPosition, renderTemplate} from "./util";
import {render} from "./util";
import {createGraph} from "./view/graph";
import {backendGet} from "./backend-connection"
const Chart = require('chart.js');
import {fillGraph} from "./view/graph";
import {createMainPage, fillMainGraph} from "./view/main-page";

const mocks = {'data': [{'currentLightingLevel': 81.48914445107826,
        'currentSoilAcidity': 7.264549131299785,
        'currentSoilMoisture': 0.0,
        'currentTemperature': 13.1,
        'isLightingLevelAnomal': false,
        'isSoilAcidityAnomal': true,
        'isSoilMoistureAnomal': true,
        'isTemperatureAnomal': false,
        'optimalLightingLevel': -68.68644032771549,
        'optimalSoilAcidity': 0.0,
        'optimalSoilMoisture': -2.5848154402294483,
        'optimalTemperature': 14.755555555555555},
        {'currentLightingLevel:': 76.96152709453443,
            'currentSoilAcidity:': 6.391726066122582,
            'currentSoilMoisture:': 107.16860313853279,
            'currentTemperature:': -9.7,
            'isLightingLevelAnomal': false,
            'isSoilAcidityAnomal': false,
            'isSoilMoistureAnomal': true,
            'isTemperatureAnomal': false,
            'optimalLightingLevel:': -64.15882297117166,
            'optimalSoilAcidity:': 0.0,
            'optimalSoilMoisture:': -109.75341857876224,
            'optimalTemperature:': 37.55555555555556},
        {'currentLightingLevel:': 82.56174974758258,
            'currentSoilAcidity:': 6.39691860952955,
            'currentSoilMoisture:': 93.32290660538986,
            'currentTemperature:': 10.4,
            'isLightingLevelAnomal': true,
            'isSoilAcidityAnomal': false,
            'isSoilMoistureAnomal': true,
            'isTemperatureAnomal': false,
            'optimalLightingLevel:': -69.75904562421981,
            'optimalSoilAcidity:': 0.0,
            'optimalSoilMoisture:': -95.90772204561931,
            'optimalTemperature:': 17.455555555555556},
        {'currentLightingLevel:': 96.37611126090174,
            'currentSoilAcidity:': 6.532336548626914,
            'currentSoilMoisture:': 0.0,
            'currentTemperature:': 14.9,
            'isLightingLevelAnomal': false,
            'isSoilAcidityAnomal': true,
            'isSoilMoistureAnomal': true,
            'isTemperatureAnomal': false,
            'optimalLightingLevel:': -83.57340713753896,
            'optimalSoilAcidity:': 0.0,
            'optimalSoilMoisture:': -2.5848154402294483,
            'optimalTemperature:': 12.955555555555554}]};

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

    backendGet(`http://kater.fun:1515/greenhouse/${document.querySelector(`.navigator__item--active`).dataset.value}`)
        .then(
            response => renderGraph(response),
            error => alert(`Rejected: ${error}`)
        );
};

const addGreenhousesHandlers = (data) => {
    const greenhousesButtons = document.querySelectorAll(`.navigator__item`);

    greenhousesButtons.forEach((button) => {
        button.addEventListener(`click`, () => {
            disableAllActiveGreenhousesButtons();
            button.classList.add(`navigator__item--active`);
            if (button.dataset.value == 0) {
                const mainContainer = document.querySelector(`.main__wrapper`);
                mainContainer.innerHTML = ``;
                renderTemplate(document.querySelector(`.main__wrapper`), createMainPage(), RenderPosition.BEFOREEND);
                fillMainGraph();
            } else {
                renderMainContainer(data[button.dataset.value - 1]);
            }
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
    backendGet(`http://kater.fun:1515/getoptimaldata`)
        .then(
            response => renderGreenhouses(response.data), //
            error => alert(`Rejected: ${error}`)
        );
};

const renderGreenhouses = (data) => {
    const navigatorList = document.querySelector(`.navigator__list`);

    for (let i = 1; i <= data.length; i++) {
        render(navigatorList, new GreenHouseButton(i).getElement(), RenderPosition.BEFOREEND);
    }

    renderTemplate(document.querySelector(`.main__wrapper`), createMainPage(), RenderPosition.BEFOREEND)
    fillMainGraph();
    addGreenhousesHandlers(data);
};

const renderGraph = (graphDate) => {
    const chart = fillGraph(graphDate.temperatures, graphDate.date);
    let currentGraph = 0;

    function updateConfigByMutating(chartToUpdate, res, title, color) {
        chartToUpdate.data.datasets[0].data = res;
        chartToUpdate.data.datasets[0].label = title;
        chartToUpdate.data.datasets[0].backgroundColor = color;
        chartToUpdate.update();
    }

    document.querySelector(`.main__graph-next-arrow`).addEventListener(`click`, () => {

        switch (currentGraph) {
            case 0:
                updateConfigByMutating(chart, graphDate.lightningLevels,  `Уровень освещения`, `rgba(255, 230, 0, 0.3)`);
                currentGraph++;
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
                updateConfigByMutating(chart, graphDate.lightningLevels, `Уровень освещения`, `rgba(255, 230, 0, 0.3)`);
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
