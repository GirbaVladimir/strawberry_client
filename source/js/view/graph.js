export const fillGraph = (data, labels) => {
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: `Температура`,
                data,
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

export const createGraph = () => {
    return `<section class="main__graph">
                <span class="main__graph-prew-arrow"></span>
                <canvas id="myChart" width="900" height="300"></canvas>
                <span class="main__graph-next-arrow"></span>
            </section>`;
}

