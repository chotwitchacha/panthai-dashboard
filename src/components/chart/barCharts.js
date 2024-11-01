import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const BarChartes = ({data, colors}) => {
    const [screenSize, setScreenSize] = useState({
        width: 0,
        height: 0,
    });
  
    useEffect(() => {
        const updateScreenSize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);
        return () => {
            window.removeEventListener('resize', updateScreenSize);
        };
    }, []);

    const renderCustomizedLabel = ({x, y, width, height, value}) => {
        const radius = 5;
        const newValue = new Intl.NumberFormat().format(value)
        return(
            <g>
                <text className='text-xs md:text-base' x={x + width / 2} y={y - radius} fill='' textAnchor='middle' dominantBaseline='middle'>
                    {newValue}
                </text>
            </g>
        )
    }

    const CustomTooltip = ({ active, payload, label }) => {
   
        if (active) {
          return (
            <div className='bg-[white] border-2 border-[#d9d9d9] p-2'>
                <p>{`${label}`}</p>
                {payload.map((item, index) => (
                    <p key={index} className="line1" style={{ color: item.fill }}>{`จำนวนผู้ป่วย: ${new Intl.NumberFormat().format(item.value)}`}</p>
                ))}
            </div>
          );
        }
        return null;
    }


    const chartWidth = screenSize.width >= 900 ? screenSize.width / 2: screenSize.width - 100;

    return(
        <ResponsiveContainer width="100%" height={300} className="flex justify-center">
            <BarChart
                width={chartWidth}
                height={300}
                data={data}
                margin={{
                  top: 30,
                  right: 35,
                //   left: 10,
                  bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name" tick={screenSize.width < 945 ? {fontSize: 12} : {fontSize: 16}}/>
                <YAxis tick={screenSize.width < 945 ? {fontSize: 12} : {fontSize: 16}}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="patient" fill="#24B0BA">
                    <LabelList dataKey="patient" content={renderCustomizedLabel}/>
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartes;