import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';

const CustomDatePicker = styled(DatePicker)({
    '& .MuiPickersYear-yearButton.Mui-selected': {
        backgroundColor: '#4CAF50', // สีพื้นหลังเมื่อปีถูกเลือก
        color: '#FFFFFF', // สีตัวอักษรเมื่อปีถูกเลือก
    },
    '& .MuiPickersYear-yearButton.Mui-selected:hover': {
        backgroundColor: '#388E3C', // สีเมื่อ hover บนปีที่ถูกเลือก
    },
});

class NewAdapterDayjs extends AdapterDayjs {
    constructor({ locale, formats }) {
        super({ locale, formats })
    }
    formatByString = (date, format) => {
        let newFormat = format.replace(/\bYYYY\b/g, 'BBBB');
        let formattedDate = this.dayjs(date).format(newFormat);

        if (newFormat.includes('BBBB')) {
            const buddhistYear = this.dayjs(date).year() + 543;
            formattedDate = formattedDate.replace('BBBB', buddhistYear.toString());
        }

        return formattedDate;
    };
}

const YearPicker = ({ onChange, height }) => {
    const currentMonth = dayjs().month();
    const initialYear = currentMonth >= 9 ? dayjs().add(1, 'year') : dayjs();
    const [year, setYear] = useState(initialYear);

    const onChanged = (newValue) => {
        if (newValue) {
            const selectedYear = newValue.year() + 543; // ใช้ .year() จาก dayjs เพื่อดึงปี
            setYear(newValue); // ตั้งค่า year เป็น Dayjs object
            console.log('Selected Year:', selectedYear);
            onChange(selectedYear); // ส่งปีที่เลือกกลับไปยัง parent component ถ้ามี
        } else {
            setYear(null); // หากไม่มีการเลือก ให้รีเซ็ตค่า year
            console.log('No year selected');
        }
    };

    return (
        <LocalizationProvider dateAdapter={NewAdapterDayjs} adapterLocale='th'>
            <DemoContainer components={['DatePicker']}>
                <CustomDatePicker
                    label="ค้นหาด้วย ปีงบประมาณ"
                    value={year}
                    onChange={onChanged}
                    views={['year']}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            placeholder: "ค้นหาด้วย ปี",
                            sx: {
                                height: height ? height : '56px', // ความสูงเท่ากัน
                                '& .MuiInputBase-root': {
                                    height: '100%',
                                    padding: '0 14px',
                                    '&:hover fieldset': {
                                        borderColor: '#23B0BA', // สี border เมื่อ hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#23B0BA', // สี border เมื่อ focus
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(0, 0, 0, 0.6)', // สีของ label ปกติ
                                    '&.Mui-focused': {
                                        color: '#23B0BA', // สีของ label เมื่อ focus
                                    },
                                },
                            },
                        },
                        yearButton: {
                            sx: {
                                '&.Mui-selected': {
                                    color: 'rgb(255, 255, 255)', // สีตัวอักษรเมื่อเลือก
                                    backgroundColor: '#23B0BA', // สีพื้นหลังเมื่อเลือก
                                },
                                '&:hover': {
                                    backgroundColor: '#23B0BA', // สีพื้นหลังเมื่อ hover
                                    color: 'white'
                                },
                                '&.Mui-selected:hover': {
                                    backgroundColor: '#23B0BA', // สีพื้นหลังเมื่อ hover บนปุ่มที่เลือก
                                },
                                '&.Mui-selected:focus': {
                                    outline: '2px solid #23B0BA', // เส้นขอบเมื่อ focus
                                    backgroundColor: '#23B0BA', // สีพื้นหลังเมื่อ focus
                                },
                            }
                        }
                    }
                    }
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default YearPicker;
