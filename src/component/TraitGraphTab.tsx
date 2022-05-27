import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import ApexChart from "apexcharts";
import ImageFile from "../assets/images/nft-avatar-1.png";





// const { series, options } = data
const options = {
    series: [
        {
            name: "Profit",
            data: [
                {
                    x: "3/3",
                    y: 0.3,
                    color: "red"
                },
                {
                    x: "4/3",
                    y: 0.75,
                    color: "green"
                },
                {
                    x: "5/3",
                    y: 1,
                    color: "green"
                },
                {
                    x: "6/3",
                    y: 1.25,
                    color: "red"
                },

            ]
        }
    ],
    stroke: {
        width: 1.5,
        colors: ['red']
    },
    grid: {
        row: {
            opacity: 0.5
        }
    },
    chart: {
        height: 350,
        type: "line",
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        type: "category"
    }
}



const TraitGraphTab = () => {
    useEffect(() => {
        const chart = new ApexChart(document.getElementById('chart'), options)
        chart.render().then(() => {
            for (let i = 1; i <= chart.w.globals.series[0].length; i++) {
                const datapoint = chart.w.config.series[0].data[i - 1];

                chart.addPointAnnotation({
                    x: datapoint.x,
                    y: datapoint.y,
                    marker: {
                        size: 0
                    },
                    image: {
                        path: ImageFile,
                        offsetY: -100,
                        offsetX: 0
                    }
                });
            }
        });
    }, [])

    return <Box

    >
        <Box
            id='chart'
        />
    </Box>
    // <Box bg='#292929' w='100%' h='100%' >
    {/* <img className="apexcharts-annotations"/> */ }
    // </Box>
};

export default TraitGraphTab
