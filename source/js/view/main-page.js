export const createMainPage = () => {
    return `<section class="summary">
                <h1 class="summary__header">
                    Результирующие данные
                </h1>
                <p class="summary__now">Объем урожая при текущих условиях - 11</p>
                <p class="summary__future">Объем урожая при оптимальных условиях - 13</p>
                <p class="summary__economy">Экономический эффект составляет: <span>18%</span></p>
                <p class="summary__anomaly">Аномалии в теплицах: <span>1, 4</span></p>
                <p class="summary__sensors">Состояние датчиков: <span>удовлетворительное</span></p>
                <button class="summary__call-bandito">вызвать инженеров</button>
                <div class="canvaes">
                    <canvas id="myChart" width="200" height="100" class="graph"></canvas>
                </div>
            </section>`
}

export const fillMainGraph = () => {
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [`31.03.2052`, `30.06.2052`, `30.09.2052`],
            datasets: [{
                label: `Урожайность`,
                data: [7.1, 12, 10],
                backgroundColor: `rgba(88, 252, 222, 0.3)`,
                borderColor:  '#6AB1C7',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    return myChart;
};