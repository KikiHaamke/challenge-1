document.addEventListener("DOMContentLoaded", function () {
    let doughnut1 = new Chart(document.getElementById('doughnut1').getContext('2d'), createDoughnut('#2196f3', '°C', 10, 40));
    let doughnut2 = new Chart(document.getElementById('doughnut2').getContext('2d'), createDoughnut('#F9D958', 'psia', 0, 114));
    let doughnut3 = new Chart(document.getElementById('doughnut3').getContext('2d'), createDoughnut('#D5433B', 'mmHg', 1, 4));
    let doughnut4 = new Chart(document.getElementById('doughnut4').getContext('2d'), createDoughnut('#5FC19F', 'km/s', 0, 10));
    let map = new Chart(document.getElementById('collisionChart') , createMap());
    createLine('tempLine');

    // timer interval for updating charts every 3 sec
    setInterval(function () {
        updateDoughnuts([doughnut1, doughnut2, doughnut3, doughnut4]);
        updateMap(map);
    }, 3000)
});

/***
 * Function for creating doughnut chart
 * @param colorCode
 * @param metric
 * @param min
 * @param max
 * @returns {{centerText: {metric, display: boolean, text: unknown}, data: {datasets: [{backgroundColor: [*, string], borderColor: string, data: unknown[], borderWidth: number}]}, plugins: [{beforeDraw: function(*=): void}], options: {legend: {display: boolean}, cutoutPercentage: number, circumference: number, rotation: number, tooltips: {enabled: boolean}}, type: string}}
 */
function createDoughnut(colorCode, metric, min, max) {
    // create array with random data
    let data = Array.from({length: 2}, () => Math.round((Math.random() * (max - min) + min) * 100) / 100);
    return {
        type: 'doughnut',
        data: {
            datasets: [{
                backgroundColor: [colorCode, '#A7A9AC'],
                borderWidth: 3,
                borderColor: '#15162c',
                data: data,
            }]
        },
        options: {
            min: min,
            max: max,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            cutoutPercentage: 80,
            circumference: (2 * Math.PI) * (0.8),
            rotation: (2 * Math.PI) * 1.35,
        },
        centerText: {
            display: true,
            text: data[0],
            metric: metric,
        },
        plugins: [{
            beforeDraw: function (chart) {
                drawTotals(chart);
            }
        }]
    }
}

/***
 * Add text to doughnut canvas
 * @param chart
 */
function drawTotals(chart) {
    let width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

    ctx.restore();
    ctx.font = '24px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';

    var text = chart.config.centerText.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

    ctx.fillText(text, textX, textY);

    ctx.font = '16px sans-serif';

    var text2 = chart.config.centerText.metric,
        textX2 = Math.round((width - ctx.measureText(text2).width) / 2),
        textY2 = height / 1.4;

    ctx.fillText(text2, textX2, textY2);
    ctx.save();
}

/***
 * Function for creating map chart
 */
function createMap() {
    // set images
    var rocket = new Image();
    rocket.src = 'images/rocket.png';
    var rock = new Image();
    rock.src = 'images/rock.png';
    var ufo = new Image();
    ufo.src = 'images/ufo.png';
    var car = new Image();
    car.src = 'images/tesla.png';

    return  {
        type: 'bubble',
        data: {
            datasets: [
                {
                    data: [{x: 50, y: 50, r: 0}],
                    pointStyle: rocket,
                },
                {
                    data: Array.from({length: 10}, () => {
                        // random between 0 - 100
                        return {x: Math.random() * 100, y: Math.random() * 100, r: 0}
                    }),
                    pointStyle: rock,
                },
                {
                    data: Array.from({length: 2}, () => {
                        // random between 0 - 100
                        return {x: Math.random() * 100, y: Math.random() * 100, r: 0}
                    }),
                    pointStyle: ufo,
                },
                {
                    data: Array.from({length: 1}, () => {
                        // random between 0 - 100
                        return {x: Math.random() * 100, y: Math.random() * 100, r: 0}
                    }),
                    pointStyle: car,
                },
            ]
        },
        options: {
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                            display: false,
                        },
                        gridLines: {color: '#30354a'},
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                            display: false,
                        },
                        gridLines: {color: '#30354a'},
                    }
                ]
            }
        }
    }
}

/***
 * Function for creating line chart
 * @param elementId
 */
function createLine(elementId) {
    // array with random data between 280 - 260
    let data = Array.from({length: 10}, () => Math.floor(Math.random() * (280 - 260) + 260) * -1);

    var ctx = document.getElementById(elementId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            type: 'line',
            labels: Array.from({length: 10}, () => 'a'),
            datasets: [{
                data: data,
                fill: false,
                lineTension: 0.25,
                pointRadius: 3,
                borderColor: '#F9D958',
                pointBorderColor: '#F9D958',
                pointBackgroundColor: '#F9D958'
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
               enabled: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: -300,
                        max: -200,
                        stepSize: 20,
                        fontColor: '#fff'
                    },
                    gridLines: {color: '#30354a'},
                }],
                xAxes: [{
                    display: false,
                    gridLines: {color: '#30354a'},
                }]
            }
        },
    });
}

/***
 * Create new data for doughnut charts
 * @param charts
 */
function updateDoughnuts(charts) {
    // loop through each doughnut chart
    for (let i = 0; i < charts.length; i++) {
        let chart = charts[i];
        // set new random data
        chart.data.datasets[0].data = Array.from({length: 2}, () => Math.round((Math.random() * (chart.config.options.max - chart.config.options.min) + chart.config.options.min) * 100) / 100);
        // set text for canvas
        chart.config.centerText.text = chart.data.datasets[0].data[0];
        chart.update();
    }
}

/***
 * Create new data for map chart
 * @param chart
 */
function updateMap(chart) {
    chart.data.datasets[1].data = Array.from({length: 10}, () => { return {x: Math.random() * 100, y: Math.random() * 100, r: 0}});
    chart.data.datasets[2].data = Array.from({length: 2}, () => { return {x: Math.random() * 100, y: Math.random() * 100, r: 0}});
    chart.data.datasets[3].data = Array.from({length: 1}, () => { return {x: Math.random() * 100, y: Math.random() * 100, r: 0}});
    // update without animation
    chart.update(0);
}