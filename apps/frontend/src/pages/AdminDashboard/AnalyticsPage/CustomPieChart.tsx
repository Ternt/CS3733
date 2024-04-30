import {useState, useEffect, useRef} from "react";

import SvgIcon from "@mui/material/SvgIcon";
import Box from "@mui/material/Box";

type ChartData = {
    id: number;
    value: number;
    label: string;
};

type PieSeriesType = {
    data: ChartData[];
}

type CustomPieChartProp = {
    // colors?: string[];
    /**
     * Width of svg of Pie Chart
     */
    width: number | string;

    /**
     * Height of svg of Pie Chart
     */
    height: number | string;
    series: PieSeriesType;
}


export default function CustomPieChart(prop: CustomPieChartProp){
    const elementRef = useRef<HTMLDivElement>(null);
    const [injection, setInjection] = useState<JSX.Element[]>([<></>]);

    useEffect(()=>{
        function calculateProportion(chartData: ChartData[]){
            let total = 0;
            total = chartData.reduce((accumulator, data)=> accumulator += data.value, total);

            const angles: number[] = [];
            chartData.forEach((data) => {
                angles.push(data.value/total * 360);
            });

            return angles;
        }

        if (elementRef.current) {
            const rect: DOMRect = elementRef.current.getBoundingClientRect();
            // console.log(rect); // Should now be non-zero

            const RADIAN = Math.PI/180;
            const cx = (rect.right - rect.left)/2;
            const cy = (rect.bottom - rect.top)/2;
            const offset = Math.PI/2;
            const pieSvg = [<></>];
            let previous_lx = 0;
            let previous_ly = -cy;

            if(prop.series.data){
                const angles = calculateProportion(prop.series.data);
                const n = prop.series.data.length;
                for (let i = 0 ; i < 3; i++){
                    let lx = cx * Math.cos(-((RADIAN * angles[i]) + offset));
                    let ly = cy * Math.sin(-((RADIAN * angles[i]) + offset));
                    let mx = previous_lx;
                    let my = previous_ly;

                    console.log(mx, my, lx, ly);

                    if (i === 0){
                        mx = 0;
                        my = -cy;
                    }

                    if (i === n-1){
                        lx = 0;
                        ly = -cy;
                    }

                    pieSvg.push(
                        <path d={`M ${mx} ${my} A ${cx} ${cy} 0 0 0 ${lx} ${ly} L 0 0 Z`}
                              stroke={`rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()})`}
                              fill={`rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()})`}>
                        </path>
                    );

                    previous_lx = lx;
                    previous_ly = ly;
                }
            }

            setInjection(pieSvg);
        }


    }, [prop.series.data]);

    return (
        <>
            <Box component={"div"} ref={elementRef} sx={{width: prop.width, height: prop.height}}>
                <SvgIcon viewBox={`0 0 ${prop.width} ${prop.height}`} sx={{width: prop.width, height: prop.height}}>
                    <g transform={"translate(300, 300)"}>
                        <g>
                            {injection.map((sector) => {
                                return sector;
                            })}
                        </g>
                    </g>
                </SvgIcon>
            </Box>
        </>
    );
}
