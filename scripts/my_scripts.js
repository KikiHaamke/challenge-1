document.addEventListener("DOMContentLoaded", function () {
    createDoughnut('myChart', '#417EC8', '°C');
    createDoughnut('myChart2', '#F9D958', 'psia');
    createDoughnut('myChart3', '#D5433B', 'mmHg');
    createDoughnut('myChart4', '#5FC19F', 'km/h');
    createMap('collisionChart');
    createLine('tempLine');
});


function createDoughnut(elementId, colorCode, metric) {
    let data = Array.from({length: 2}, () => Math.floor(Math.random() * (28000 - 0.07) + 0.07));
    var ctx = document.getElementById(elementId).getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            datasets: [{
                backgroundColor: [colorCode, '#A7A9AC'],
                borderWidth: 0,
                data: data,
            }]
        },

        // Configuration options go here
        options: {
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            cutoutPercentage: 80,
            circumference: (2 * Math.PI) * (0.6),
            rotation: (2 * Math.PI) * 1.45,
        },
        centerText: {
            display: true,
            text: data[0] + ' ' + metric,
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
    var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

    ctx.restore();
    ctx.font = '26px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';

    var text = chart.config.centerText.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 1.5;

    ctx.fillText(text, textX, textY);
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
    var myBubbleChart = new Chart(ctx, {
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
                        gridLines: {color: 'white'},
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                            display: false,
                        },
                        gridLines: {color: 'white'},
                    }
                ]
            }
        }
    });
}

function createLine (elementId){
    let data = Array.from({length: 10}, () => Math.floor(Math.random() * (280 - 260) + 260) * -1);
    console.log(data);

    var ctx = document.getElementById(elementId).getContext('2d');
    var tempLine = new Chart(ctx, {
        type: 'line',
        data: {
            type: 'line',
            labels: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
            datasets: [{
                data: data,
                fill: true,
                lineTension: 0.25,
                pointRadius: 3,
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
                        // autoSkip: true,
                        maxTicksLimit: 3,
                        // max: -210,
                        // min: -330,
                    }
                }],
                xAxes: [{
                    display: false,
                }]
            }
        },
    });

}