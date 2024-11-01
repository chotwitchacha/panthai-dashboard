import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

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

const YearPicker = ({onChange}) => {
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
                <DatePicker
                    label="ค้นหาด้วย ปีงบประมาณ"
                    value={year}
                    onChange={onChanged}
                    views={['year']}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            placeholder: "ค้นหาด้วย ปี",
                            sx: {
                                height: '56px', // ความสูงเท่ากัน
                                '& .MuiInputBase-root': {
                                  height: '100%', 
                                  padding: '0 14px',
                                },
                              },
                        },
                    }}

                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default YearPicker;
