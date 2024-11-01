"use client"
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';


const BarChartsUser = ({ data }) => {
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

    const renderLabel = ({ x, y, width, value }) => {
        const radius = 10;
        return (
            <g>
                <text className='text-[8px] md:text-sm	' x={x + width / 2} y={y - radius} fill='' textAnchor='middle' dominantBaseline='middle'>
                    {value}
                </text>
            </g>
        )
    }

    const chartWidth = screenSize.width >= 1024 ? screenSize.width / 2.5 : screenSize.width - 100;

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                className='mt-5'
                width={chartWidth}
                height={350}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={screenSize.width < 945 ? { fontSize: 12 } : { fontSize: 16 }} />
                <YAxis tick={screenSize.width < 945 ? { fontSize: 12 } : { fontSize: 16 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="จำนวนผู้ป่วย" fill="#ABC7C9">
                    {/* <LabelList dataKey="จำนวนผู้ป่วยสะสม" content={renderLabel} /> */}
                </Bar>
                <Bar dataKey="จำนวนแพทย์ผู้ใช้งาน" fill="#23B0BA">
                    {/* <LabelList dataKey="จำนวนแพทย์ผู้ใช้งานสะสม" content={renderLabel} /> */}
                </Bar>
                <Bar dataKey="จำนวนการเข้ารับบริการ" fill="#2B7880">
                    {/* <LabelList dataKey="จำนวนครั้งใช้งานสะสม" content={renderLabel} /> */}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartsUser;
