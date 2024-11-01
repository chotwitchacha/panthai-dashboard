import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import React, { useEffect, useState } from 'react'



const PieCharts = React.memo( ({data, title, colors}) => {
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

    const total = data.reduce((sum, entry) => sum + entry.value, 0);

    const CustomTooltip = ({ active, payload, label }) => {
      
        if (active) {
          return (
            <div className='bg-[white] border-2 border-[#d9d9d9] p-2'>
                {payload.map((item, index) => (
                    <p key={index} className="line1" style={{ color: colors[index % colors.length] }}>{`${item.name}: ${new Intl.NumberFormat().format(item.value)}`}</p>
                ))}
            </div>
          );
        }
        return null;
    }

    const chartWidth = screenSize.width >= 900 ? screenSize.width / 2.65 : screenSize.width - 100;
    
    return(
            <ResponsiveContainer width="100%" height={300} className="flex justify-center">
                <PieChart width={title === 'กลุ่มโรค' ? screenSize.width - 100 : chartWidth} height={300}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data}
                        outerRadius={80}
                        fill="#8884d8"
                        label={({
                          cx,
                          cy,
                          midAngle,
                          innerRadius,
                          outerRadius,
                          value,
                          index
                        }) => {
                          const RADIAN = Math.PI / 180;
                          const radius = 25 + innerRadius + (outerRadius - innerRadius);
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          const values = new Intl.NumberFormat().format(value)
                          return (
                            <text
                              className=" sm:hyphens-manual	md:hyphens-manual"
                              x={x}
                              y={y}
                              fill={colors[index % colors.length]}
                              textAnchor={x > cx ? "start" : "end"}
                              dominantBaseline="central"
                              fontSize={screenSize.width < 945 ? 12 : 16}
                            >
                              {screenSize.width < 640 ? 
                                <>
                                  <tspan>{values}</tspan>
                                  <tspan x={x} dy="1.2em">
                                    {`(${((value / total) * 100).toFixed(2)}%)`}
                                  </tspan>
                                </> :
                                `${values} : (${((value / total) * 100).toFixed(2)}%)`
                              }
                            </text>
                          );
                        }}
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip/>}/>
                </PieChart>
            </ResponsiveContainer>
    )
})

PieCharts.displayName = 'PieCharts'

export default PieCharts;