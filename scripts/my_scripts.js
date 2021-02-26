document.addEventListener("DOMContentLoaded", function (){
    createDoughnut()
});


function createDoughnut () {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: ['A', 'B'],
            datasets: [{
                backgroundColor: ['#417EC8', '#A7A9AC'],
                borderWidth: 0,
                data: [20, 10],
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
            text: '20 km/s',
            metric: 'km/s',
        },
        plugins: [{
            beforeDraw: function (chart) {
                drawTotals(chart);
            }
        }]
    });
}

function drawTotals(chart){
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