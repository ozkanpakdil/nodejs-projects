const { CanvasRenderService } = require('chartjs-node-canvas');
//TODO: datalabels are not working, fix it in the future.
const ChartDataLabels = require('chartjs-plugin-datalabels');

var fs = require('fs')
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const width = 400;
const height = 300;
const chartCallback = (ChartJS) => {
    ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    ChartJS.helpers.merge(ChartJS.defaults.global.plugins.datalabels, {
        color: '#FE777B'
    });
    ChartJS.plugins.register({
        beforeDraw: function(chartInstance) {
          var ctx = chartInstance.chart.ctx;
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
        }
      });
};
const canvasRenderService = new CanvasRenderService(width, height, chartCallback);

module.exports = {
    drawImageToDisk: function (labels, data, fileName) {
        (async () => {
            const configuration = {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Donations',
                        data: data,
                        backgroundColor: 'rgba(0, 0, 255, 0.7)',
                        borderWidth: 1,
                        datalabels: {
                            color: '#FFCE56'
                        }
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    plugins: [ChartDataLabels]
                }
            };
            const image = await canvasRenderService.renderToBuffer(configuration);
            await writeFile(fileName, image);
        })();
    },
    help: function () {
        console.log("this suppose to say something about the module");
    },
};

