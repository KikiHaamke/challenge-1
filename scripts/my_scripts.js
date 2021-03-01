document.addEventListener("DOMContentLoaded", function () {
    createDoughnut('myChart', '#2196f3', '°C', 10, 40);
    createDoughnut('myChart2', '#F9D958', 'psia', 0, 114);
    createDoughnut('myChart3', '#D5433B', 'mmHg', 1, 4);
    createDoughnut('myChart4', '#5FC19F', 'km/s', 0, 10);
    createMap('collisionChart');
    createLine('tempLine');
});


function createDoughnut(elementId, colorCode, metric, min, max) {
    let data = Array.from({length: 2}, () => Math.round((Math.random() * (max - min) + min) * 100) / 100);
    let ctx = document.getElementById(elementId).getContext('2d');
    new Chart(ctx, {
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
    });
}

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

function createMap(elementId) {
    var rocket = new Image();
    rocket.src = 'images/rocket.png';
    var rock = new Image();
    rock.src = 'images/rock.png';
    var ufo = new Image();
    ufo.src = 'images/ufo.png';

    var ctx = document.getElementById(elementId).getContext('2d');
    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [
                {
                    data: [{x: 50, y: 50, r: 0}],
                    pointStyle: rocket,
                },
                {
                    data: Array.from({length: 9}, () => {
                        return {x: Math.random() * 100, y: Math.random() * 100, r: 0}
                    }),
                    pointStyle: rock,
                },
                {
                    data: Array.from({length: 2}, () => {
                        return {x: Math.random() * 100, y: Math.random() * 100, r: 0}
                    }),
                    pointStyle: ufo,
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
    });
}

function createLine(elementId) {
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