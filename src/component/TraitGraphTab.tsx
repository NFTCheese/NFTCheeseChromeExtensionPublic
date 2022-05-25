import { Box } from "@chakra-ui/react";
import ReactApeChart from "react-apexcharts";




const data = {
    series: [
        {
            name: "High - 2013",
            data: [23, 34, 32, 43]
        },
    ],
    options: {
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Dec"]
        },
        chart: {
            background: 'initial',
            type: 'line'
        },
        stroke: {
            curve: 'smooth',
        },
        markers: {
            size: 4,
        },

    },
};
const { series, options } = data



const TraitGraphTab = () => {
    return <Box bg='#292929' w='100%' h='100%' >
        <Box as={ReactApeChart}
            options={options}
            id='chart'
            series={series}
            type='line'
            py='3'
        >
            {/* <img className="apexcharts-annotations"/> */}
        </Box>
    </Box>
};

export default TraitGraphTab
