"use client";
import React from 'react'
import { ThemeProvider as Provider, createTheme } from '@mui/material/styles';

const ThemeProvider = ({ children }) => {

    const theme = createTheme({
        // breakpoints: {
        //     values: {
        //         mb: 768
        //     }
        // },
        typography: {
            fontFamily: '"Prompt", sans-serif', // กำหนดฟอนต์ที่ต้องการ
            // สามารถกำหนดเพิ่มเติมสำหรับ h1, h2, body เป็นต้น
        },
        components: {
            MuiDateCalendar: {
                styleOverrides: {
                    root: {
                        maxHeight: '290px', // ปรับค่า maxHeight ที่นี่
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            // ปรับความสูงของ TextField
                            // width: '350px',
                            height: 'px', // ปรับความสูงที่นี่
                            overflow: 'hidden',
                            borderRadius: '10px', // ปรับขอบให้โค้ง
                            '&:focus-visible .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#828282', // เปลี่ยนเป็นสีที่ต้องการ
                            },
                        },
                        '& .MuiInputBase-input': {
                            padding: '10px', // ปรับ padding ภายใน
                        },
                    },
                },
            },
            MuiPickersDay: {
                styleOverrides: {
                    root: {
                        // ปรับ styling ของวันใน date picker ถ้าต้องการ
                        '&.Mui-selected': {
                            backgroundColor: '#828282 !important', // เปลี่ยนสีเมื่อเลือก
                            color: '#ffffff', // เปลี่ยนสีตัวอักษรเมื่อเลือก
                        },
                    },
                },
            },
        },
    });

    return (
        <Provider theme={theme}>
            {children}
        </Provider>
    )
}

export default ThemeProvider
