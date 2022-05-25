import { Box } from "@chakra-ui/react";
import ApexChart from "apexcharts";
import { useEffect } from "react";

// const ch = new ReactApeChart()


const data = {
    series: [
        {
            name: "High - 2013",
            data: [
                {
                    x: '3/3',
                    y: 300,
                    color: 'green'
                },
                {
                    x: '4/3',
                    y: 3000,
                    color: 'green'
                },
                {
                    x: '5/3',
                    y: 3000,
                    color: 'green'
                },

            ]
        },
    ],

    chart: {
        background: 'initial',
        type: 'line'
    },
    stroke: {
        curve: 'smooth',
    },
    markers: {
        size: 10,
    },
    fill: {
        type: 'solid',
        colors: ['red']
    }
}



const TraitGraphTab = () => {
    useEffect(() => {

        const chart = new ApexChart(document.getElementById('chart'), {
            chart: {
                id: 'chart',
                type: 'line'
            },
            series: [
                {
                    name: "Profit",
                    data: [
                        {
                            x: "2011",
                            y: 1292,
                            color: "red"
                        },
                        {
                            x: "2012",
                            y: 4432,
                            color: "green"
                        },
                        {
                            x: "2013",
                            y: 5423,
                            color: "green"
                        },
                        {
                            x: "2014",
                            y: 6653,
                            color: "red"
                        },
                        {
                            x: "2015",
                            y: 8133,
                            color: "green"
                        },
                        {
                            x: "2016",
                            y: 7132,
                            color: "green"
                        },
                        {
                            x: "2017",
                            y: 7332,
                            color: "red"
                        },
                        {
                            x: "2018",
                            y: 6553,
                            color: "red"
                        }
                    ]
                }
            ]
        })
        chart.render().then(() => {
            for (let i = 1; i <= chart.w.globals.series[0].length; i++) {
                const datapoint = chart.w.config.series[0].data[i - 1];
                const img1 =
                    "https://upload.wikimedia.org/wikipedia/commons/f/f2/Pinterest_Shiny_Icon.svg";

                const img2 =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Visual_Studio_Code_Insiders_1.36_icon.svg/256px-Visual_Studio_Code_Insiders_1.36_icon.svg.png";

                chart.addPointAnnotation({
                    x: datapoint.x,
                    y: datapoint.y,
                    marker: {
                        size: 1
                    },
                    image: {
                        path: img2,
                        offsetY: -3
                    }
                });
            }
        });

    }, [])

    // chart.render()
    return < Box id='chart'  ></Box>
};

export default TraitGraphTab
