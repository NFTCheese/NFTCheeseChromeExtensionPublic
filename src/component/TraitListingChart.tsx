import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
import { Box } from '@chakra-ui/react';

const TraitListingChart = () => {
    const state = {
        series: [
            {
                name: '',
                data: [44, 55, 41,]
            },
            {
                name: '',
                data: [44, 55, 41,]
            },
            {
                name: '',
                data: [44, 55, 41,]
            },
            {
                name: '',
                data: [44, 55, 41,]
            },
            {
                name: '',
                data: [44, 55, 41,]
            },
            {

                name: 'two',
                data: [44, 55, 41,]
            }
            ,
            {
                data: [53, 32, 33,]

            }]
        ,
        options: {

            chart: {
                height: 350,
                type: 'bar',
                bar: {
                    borderRadius: 0,
                }
            },
            plotOptions: {
                bar: {
                    barHeight: '50%'
                },
            },
            colors: ['#E07D00'],
            dataLabels: { enabled: false },
            xaxis: {
                categories: ["Jan", "Feb", "Red"],
                position: 'bottom',
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
                position: 'top',
                min: 30,
                max: 50,
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: true,
                    formatter: function (val: any) {
                        return val + "%";
                    }
                }
            },
        }
    }





    const { options, series } = state



    return (
        <Box w='70%' mx='auto'>
            <Box
                as={Chart}
                options={options}
                series={series}
                type="bar"
                width="100"
            />
        </Box>
    )

}

export default TraitListingChart