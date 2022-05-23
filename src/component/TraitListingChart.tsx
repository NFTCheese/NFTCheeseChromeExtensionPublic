import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
import { Box } from '@chakra-ui/react';

const TraitListingChart = () => {

const series = [{
    name: 'Inflation',
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2, 0.2]
}]

const options = {
    chart: {
        height: 350,
        type: 'bar',
    },
    plotOptions: {
        bar: {
            borderRadius: 0,
            dataLabels: {
                position: 'top', // top, center, bottom
            },
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function (val: any) {
            return val + "%";
        },
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ["#304758"]
        }
    },
    crosshairs: {
        fill: {
            type: 'gradient',
            gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#000',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
            }
        }
    },

    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        position: 'top',
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
      
        tooltip: {
            enabled: true,
        }
    },
    yaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
            formatter: function (val: any) {
                return val + "%";
            }
        }

    },
    title: {
        text: 'Monthly Inflation in Argentina, 2002',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
            color: '#444'
        }
    }



};




    return (
        <Box w='100%' mx='auto'>
            <Box
                as={Chart}
                options={options}
                series={series}
                type="bar"
                width="450"
            />
        </Box>
    )

}

export default TraitListingChart