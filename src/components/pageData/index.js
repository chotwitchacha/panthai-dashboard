import { Button, Card, Checkbox, FormControl, Grid2 as Grid, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PrinterOutlined, SearchOutlined } from '@ant-design/icons';
import PieCharts from "../chart/pieCharts";
import BarChartes from "../chart/barCharts";
import TableHospital from "../table/tablehospital";
import YearPicker from "../yearPicker";
import SelectSearch from "../select";
import { DownloadRounded } from "@mui/icons-material";

const data = [
    { name: "กลุ่มไข้หวัดน้อย", value: 20754 },
    { name: "กลุ่มโรคโลหิตระดูสตรี", value: 10172 },
    { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 20302 },
    { name: "กลุ่มอาการผดผื่น", value: 20260 },
    { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 20547 },
];

const dataGender = [
    { name: "หญิง", value: 51053 },
    { name: "ชาย", value: 40982 },
]

const dataAge = [
    { name: "น้อยกว่า 20", patient: 138 },
    { name: "20- 24", patient: 178 },
    { name: "25 - 29", patient: 122 },
    { name: "30 - 34", patient: 68 },
    { name: "35 - 39", patient: 170 },
    { name: "40 - 44", patient: 324 },
    { name: "45 - 49", patient: 402 },
    { name: "50 - 54", patient: 325 },
    { name: "55 - 59", patient: 448 },
    { name: "มากกว่า 60", patient: 372 },
]

const dataHospital = [
    { id: 1, index: '1', name: 'โรงพยาบาลการแพทย์แผนไทยและการแพทย์ผสมผสาน', patient: 9911, service: 4588 },
    { id: 2, index: '2', name: 'โรงพยาบาลลาดบัวหลวง', patient: 9660, service: 4288 },
    { id: 3, index: '3', name: 'โรงพยาบาลเสนา', patient: 9940, service: 4579 },
    { id: 4, index: '4', name: 'โรงพยาบาลบางปะอิน', patient: 9986, service: 4520 },
    { id: 5, index: '5', name: 'โรงพยาบาลบางซ้าย', patient: 9765, service: 4538 },
    { id: 6, index: '6', name: 'โรงพยาบาลโคกสำโรง', patient: 10000, service: 4451 },
    { id: 7, index: '7', name: 'อัจฉริยาคลินิกการแพทย์แผนไทยประยุกต์', patient: 9985, service: 4373 },
    { id: 8, index: '8', name: 'โรงพยาบาลกาบเชิง', patient: 9883, service: 4590 },
    { id: 9, index: '9', name: 'โรงพยาบาลสำโรงทาบ ', patient: 9993, service: 4591 },
    { id: 10, index: '10', name: 'โรงพยาบาลพระอาจารย์ฝั้น อาจาโร', patient: 9972, service: 4495 },
    { id: 11, index: '11', name: 'โรงพยาบาลโพธาราม', patient: 9810, service: 4457 },
    { id: 12, index: '12', name: 'โรงพยาบาลท่าโรงช้าง', patient: 10078, service: 4601 },
    { id: 10, index: '13', name: 'คลินิกการแพทย์แผนไทยเนตรดาว', patient: 9972, service: 4495 },
    { id: 11, index: '14', name: 'ทรงกลด สหคลินิก', patient: 9810, service: 4457 },
    { id: 12, index: '15', name: 'หมออรสา คลินิกการแพทย์แผนไทยประยุกต์', patient: 10078, service: 4601 },
    { id: 11, index: '16', name: 'ภัทรภาสคลินิกการแพทย์แผนไทยประยุกต์', patient: 9810, service: 4457 },
    { id: 12, index: '17', name: 'โรงพยาบาลสุทธาเวช คณะแพทยศาสตร์ มหาวิทยาลัยมหาสารคาม', patient: 10078, service: 4601 },
]

const newData = {
    2568: [
        {   
            index: 1,
            hospital: 'โรงพยาบาลการแพทย์แผนไทยและการแพทย์ผสมผสาน', 
            patient: 426, 
            service: 443, 
            diseases: [
                { name: "กลุ่มไข้หวัดน้อย", value: 97,
                    gender: [
                        { name: "หญิง", value: 59 },
                        { name: "ชาย", value: 38 },
                    ], 
                    age: [
                        { name: "น้อยกว่า 20", patient: 9 },
                        { name: "20- 24", patient: 10 },
                        { name: "25 - 29", patient: 9 },
                        { name: "30 - 34", patient: 13 },
                        { name: "35 - 39", patient: 7 },
                        { name: "40 - 44", patient: 12 },
                        { name: "45 - 49", patient: 6 },
                        { name: "50 - 54", patient: 5},
                        { name: "55 - 59", patient: 10 },
                        { name: "มากกว่า 60", patient: 16 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 56, 
                    gender: [
                        { name: "หญิง", value: 56 },
                        { name: "ชาย", value: 0 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 3 },
                        { name: "20- 24", patient: 6 },
                        { name: "25 - 29", patient: 2 },
                        { name: "30 - 34", patient: 4 },
                        { name: "35 - 39", patient: 0 },
                        { name: "40 - 44", patient: 10 },
                        { name: "45 - 49", patient: 8 },
                        { name: "50 - 54", patient: 6 },
                        { name: "55 - 59", patient: 8 },
                        { name: "มากกว่า 60", patient: 9 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 100,
                    gender: [
                        { name: "หญิง", value: 50 },
                        { name: "ชาย", value: 50 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 10 },
                        { name: "20- 24", patient: 1 },
                        { name: "25 - 29", patient: 15 },
                        { name: "30 - 34", patient: 3 },
                        { name: "35 - 39", patient: 10 },
                        { name: "40 - 44", patient: 16 },
                        { name: "45 - 49", patient: 9 },
                        { name: "50 - 54", patient: 10 },
                        { name: "55 - 59", patient: 19 },
                        { name: "มากกว่า 60", patient: 7 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 93,
                    gender: [
                        { name: "หญิง", value: 53 },
                        { name: "ชาย", value: 40 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 13 },
                        { name: "20- 24", patient: 9 },
                        { name: "25 - 29", patient: 12 },
                        { name: "30 - 34", patient:9 },
                        { name: "35 - 39", patient: 11 },
                        { name: "40 - 44", patient: 6 },
                        { name: "45 - 49", patient: 8 },
                        { name: "50 - 54", patient: 4 },
                        { name: "55 - 59", patient: 15 },
                        { name: "มากกว่า 60", patient: 6 }]
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 97,
                    gender: [
                        { name: "หญิง", value: 55 },
                        { name: "ชาย", value: 42 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 1 },
                        { name: "20- 24", patient: 14 },
                        { name: "25 - 29", patient: 6 },
                        { name: "30 - 34", patient: 14 },
                        { name: "35 - 39", patient: 17 },
                        { name: "40 - 44", patient: 4 },
                        { name: "45 - 49", patient: 13 },
                        { name: "50 - 54", patient: 6 },
                        { name: "55 - 59", patient: 9 },
                        { name: "มากกว่า 60", patient: 13 }] }
                ]
        },
        {
            index: 2,
            hospital: 'โรงพยาบาลลาดบัวหลวง', 
            patient: 447, 
            service: 461,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 101,
                    gender: [
                        { name: "หญิง", value: 43 },
                        { name: "ชาย", value: 58 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 19 },
                        { name: "20- 24", patient: 5 },
                        { name: "25 - 29", patient: 12 },
                        { name: "30 - 34", patient: 12 },
                        { name: "35 - 39", patient: 14 },
                        { name: "40 - 44", patient: 14 },
                        { name: "45 - 49", patient: 1 },
                        { name: "50 - 54", patient: 7 },
                        { name: "55 - 59", patient: 7 },
                        { name: "มากกว่า 60", patient: 10 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 63,
                    gender: [
                        { name: "หญิง", value: 63 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 10 },
                        { name: "20- 24", patient: 6 },
                        { name: "25 - 29", patient: 5 },
                        { name: "30 - 34", patient: 9 },
                        { name: "35 - 39", patient: 3 },
                        { name: "40 - 44", patient: 10 },
                        { name: "45 - 49", patient: 7 },
                        { name: "50 - 54", patient: 3 },
                        { name: "55 - 59", patient: 7 },
                        { name: "มากกว่า 60", patient: 3 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 94, 
                    gender: [
                        { name: "หญิง", value: 35 },
                        { name: "ชาย", value: 59 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 10 },
                        { name: "20- 24", patient: 9 },
                        { name: "25 - 29", patient: 14 },
                        { name: "30 - 34", patient: 5 },
                        { name: "35 - 39", patient: 11 },
                        { name: "40 - 44", patient: 10 },
                        { name: "45 - 49", patient: 6 },
                        { name: "50 - 54", patient: 5 },
                        { name: "55 - 59", patient: 12 },
                        { name: "มากกว่า 60", patient: 12 }] },
                { name: "กลุ่มอาการผดผื่น", value: 114, 
                    gender: [
                        { name: "หญิง", value: 59 },
                        { name: "ชาย", value: 55 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 10 },
                        { name: "20- 24", patient: 12 },
                        { name: "25 - 29", patient: 12 },
                        { name: "30 - 34", patient: 8 },
                        { name: "35 - 39", patient: 6 },
                        { name: "40 - 44", patient: 17 },
                        { name: "45 - 49", patient: 11 },
                        { name: "50 - 54", patient: 20 },
                        { name: "55 - 59", patient: 7 },
                        { name: "มากกว่า 60", patient: 11 }] },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 89, 
                    gender: [
                        { name: "หญิง", value: 51 },
                        { name: "ชาย", value: 38 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 5 },
                        { name: "20- 24", patient: 13 },
                        { name: "25 - 29", patient: 15 },
                        { name: "30 - 34", patient: 9 },
                        { name: "35 - 39", patient: 3 },
                        { name: "40 - 44", patient: 13 },
                        { name: "45 - 49", patient: 8 },
                        { name: "50 - 54", patient: 12 },
                        { name: "55 - 59", patient: 8 },
                        { name: "มากกว่า 60", patient: 3 }] },]
        },
        {
            index: 3,
            hospital: 'โรงพยาบาลเสนา', 
            patient: 435, 
            service: 454,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 88,
                    gender: [
                        { name: "หญิง", value: 50 },
                        { name: "ชาย", value: 38 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 13 },
                        { name: "20- 24", patient: 6 },
                        { name: "25 - 29", patient: 9 },
                        { name: "30 - 34", patient: 4 },
                        { name: "35 - 39", patient: 12 },
                        { name: "40 - 44", patient: 3 },
                        { name: "45 - 49", patient: 9 },
                        { name: "50 - 54", patient: 7},
                        { name: "55 - 59", patient: 13 },
                        { name: "มากกว่า 60", patient: 12 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 52,
                    gender: [
                        { name: "หญิง", value: 52 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 6 },
                        { name: "20- 24", patient: 1 },
                        { name: "25 - 29", patient: 2 },
                        { name: "30 - 34", patient: 9 },
                        { name: "35 - 39", patient: 5 },
                        { name: "40 - 44", patient: 7 },
                        { name: "45 - 49", patient: 1 },
                        { name: "50 - 54", patient: 7 },
                        { name: "55 - 59", patient: 7 },
                        { name: "มากกว่า 60", patient: 7 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 103, 
                    gender: [
                        { name: "หญิง", value: 48 },
                        { name: "ชาย", value: 55 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 5 },
                        { name: "20- 24", patient: 12 },
                        { name: "25 - 29", patient: 10 },
                        { name: "30 - 34", patient: 8 },
                        { name: "35 - 39", patient: 9 },
                        { name: "40 - 44", patient: 9 },
                        { name: "45 - 49", patient: 15 },
                        { name: "50 - 54", patient: 7 },
                        { name: "55 - 59", patient: 19 },
                        { name: "มากกว่า 60", patient: 9 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 103, 
                    gender: [
                        { name: "หญิง", value: 46 },
                        { name: "ชาย", value: 57 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 10 },
                        { name: "20- 24", patient: 1 },
                        { name: "25 - 29", patient: 16 },
                        { name: "30 - 34", patient: 11 },
                        { name: "35 - 39", patient: 8 },
                        { name: "40 - 44", patient: 11 },
                        { name: "45 - 49", patient: 12 },
                        { name: "50 - 54", patient: 18 },
                        { name: "55 - 59", patient: 8 },
                        { name: "มากกว่า 60", patient: 8 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 108, 
                    gender: [
                        { name: "หญิง", value: 60 },
                        { name: "ชาย", value: 48 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 13 },
                        { name: "20- 24", patient: 14 },
                        { name: "25 - 29", patient: 8 },
                        { name: "30 - 34", patient: 11 },
                        { name: "35 - 39", patient: 9 },
                        { name: "40 - 44", patient: 9 },
                        { name: "45 - 49", patient: 7 },
                        { name: "50 - 54", patient: 16 },
                        { name: "55 - 59", patient: 15 },
                        { name: "มากกว่า 60", patient: 6 }] },]
        },
        {
            index: 4,
            hospital: 'โรงพยาบาลบางปะอิน', 
            patient: 371, 
            service: 381,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 88,
                    gender: [
                        { name: "หญิง", value: 42 },
                        { name: "ชาย", value: 46 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 18 },
                        { name: "20- 24", patient: 8 },
                        { name: "25 - 29", patient: 8 },
                        { name: "30 - 34", patient: 13 },
                        { name: "35 - 39", patient: 5 },
                        { name: "40 - 44", patient: 8 },
                        { name: "45 - 49", patient: 16 },
                        { name: "50 - 54", patient: 4},
                        { name: "55 - 59", patient: 6 },
                        { name: "มากกว่า 60", patient: 2 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 36,
                    gender: [
                        { name: "หญิง", value: 36 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 2 },
                        { name: "20- 24", patient: 1 },
                        { name: "25 - 29", patient: 2 },
                        { name: "30 - 34", patient: 4 },
                        { name: "35 - 39", patient: 3 },
                        { name: "40 - 44", patient: 3 },
                        { name: "45 - 49", patient: 9 },
                        { name: "50 - 54", patient: 10 },
                        { name: "55 - 59", patient: 1 },
                        { name: "มากกว่า 60", patient: 1 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 90, 
                    gender: [
                        { name: "หญิง", value: 53 },
                        { name: "ชาย", value: 37 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 10 },
                        { name: "20- 24", patient: 7 },
                        { name: "25 - 29", patient: 11 },
                        { name: "30 - 34", patient: 5 },
                        { name: "35 - 39", patient: 6 },
                        { name: "40 - 44", patient: 14 },
                        { name: "45 - 49", patient: 7 },
                        { name: "50 - 54", patient: 10 },
                        { name: "55 - 59", patient: 6 },
                        { name: "มากกว่า 60", patient: 14 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 79, 
                    gender: [
                        { name: "หญิง", value: 42 },
                        { name: "ชาย", value: 37 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 14 },
                        { name: "20- 24", patient: 1 },
                        { name: "25 - 29", patient: 16 },
                        { name: "30 - 34", patient: 12 },
                        { name: "35 - 39", patient: 4 },
                        { name: "40 - 44", patient: 9 },
                        { name: "45 - 49", patient: 4 },
                        { name: "50 - 54", patient: 7 },
                        { name: "55 - 59", patient: 8 },
                        { name: "มากกว่า 60", patient: 4 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 88, 
                    gender: [
                        { name: "หญิง", value: 44 },
                        { name: "ชาย", value: 44 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 4 },
                        { name: "20- 24", patient: 3 },
                        { name: "25 - 29", patient: 13 },
                        { name: "30 - 34", patient: 14 },
                        { name: "35 - 39", patient: 10 },
                        { name: "40 - 44", patient: 18 },
                        { name: "45 - 49", patient: 12 },
                        { name: "50 - 54", patient: 9 },
                        { name: "55 - 59", patient: 6 },
                        { name: "มากกว่า 60", patient: 9 }] },]
        },
        {
            index: 5,
            hospital: 'โรงพยาบาลบางซ้าย', 
            patient: 442, 
            service: 455,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 123,
                    gender: [
                        { name: "หญิง", value: 60 },
                        { name: "ชาย", value: 63 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 12 },
                        { name: "20- 24", patient: 5 },
                        { name: "25 - 29", patient: 13 },
                        { name: "30 - 34", patient: 16 },
                        { name: "35 - 39", patient: 14 },
                        { name: "40 - 44", patient: 11 },
                        { name: "45 - 49", patient: 13 },
                        { name: "50 - 54", patient: 13},
                        { name: "55 - 59", patient: 12 },
                        { name: "มากกว่า 60", patient: 14 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 43,
                    gender: [
                        { name: "หญิง", value: 43 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 1 },
                        { name: "20- 24", patient: 5 },
                        { name: "25 - 29", patient: 1 },
                        { name: "30 - 34", patient: 9 },
                        { name: "35 - 39", patient: 1 },
                        { name: "40 - 44", patient: 6 },
                        { name: "45 - 49", patient: 9 },
                        { name: "50 - 54", patient: 9 },
                        { name: "55 - 59", patient: 0 },
                        { name: "มากกว่า 60", patient: 2 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 114, 
                    gender: [
                        { name: "หญิง", value: 53 },
                        { name: "ชาย", value: 61 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 16 },
                        { name: "20- 24", patient: 6 },
                        { name: "25 - 29", patient: 13 },
                        { name: "30 - 34", patient: 15 },
                        { name: "35 - 39", patient: 11 },
                        { name: "40 - 44", patient: 10 },
                        { name: "45 - 49", patient: 6 },
                        { name: "50 - 54", patient: 13 },
                        { name: "55 - 59", patient: 13 },
                        { name: "มากกว่า 60", patient: 11 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 97, 
                    gender: [
                        { name: "หญิง", value: 41 },
                        { name: "ชาย", value: 56 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 3 },
                        { name: "20- 24", patient: 6 },
                        { name: "25 - 29", patient: 9 },
                        { name: "30 - 34", patient: 18 },
                        { name: "35 - 39", patient: 9 },
                        { name: "40 - 44", patient: 11 },
                        { name: "45 - 49", patient: 4 },
                        { name: "50 - 54", patient: 11 },
                        { name: "55 - 59", patient: 13 },
                        { name: "มากกว่า 60", patient: 13 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 78, 
                    gender: [
                        { name: "หญิง", value: 28 },
                        { name: "ชาย", value: 50 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 7 },
                        { name: "20- 24", patient: 5 },
                        { name: "25 - 29", patient: 8 },
                        { name: "30 - 34", patient: 4 },
                        { name: "35 - 39", patient: 16 },
                        { name: "40 - 44", patient: 3 },
                        { name: "45 - 49", patient: 5 },
                        { name: "50 - 54", patient: 7 },
                        { name: "55 - 59", patient: 16 },
                        { name: "มากกว่า 60", patient: 7 }] 
                },]
        },
        {
            index: 6,
            hospital: 'โรงพยาบาลโคกสำโรง', 
            patient: 446, 
            service: 409,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 95,
                    gender: [
                        { name: "หญิง", value: 44 },
                        { name: "ชาย", value: 51 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 4 },
                        { name: "20- 24", patient: 14 },
                        { name: "25 - 29", patient: 8 },
                        { name: "30 - 34", patient: 4 },
                        { name: "35 - 39", patient: 12 },
                        { name: "40 - 44", patient: 8 },
                        { name: "45 - 49", patient: 16 },
                        { name: "50 - 54", patient: 15},
                        { name: "55 - 59", patient: 11 },
                        { name: "มากกว่า 60", patient: 3 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 51,
                    gender: [
                        { name: "หญิง", value: 51 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 8 },
                        { name: "20- 24", patient: 2 },
                        { name: "25 - 29", patient: 1 },
                        { name: "30 - 34", patient: 9 },
                        { name: "35 - 39", patient: 2 },
                        { name: "40 - 44", patient: 9 },
                        { name: "45 - 49", patient: 1 },
                        { name: "50 - 54", patient: 7 },
                        { name: "55 - 59", patient: 9 },
                        { name: "มากกว่า 60", patient: 3 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 104, 
                    gender: [
                        { name: "หญิง", value: 40 },
                        { name: "ชาย", value: 64 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 11 },
                        { name: "20- 24", patient: 13 },
                        { name: "25 - 29", patient: 16 },
                        { name: "30 - 34", patient: 15 },
                        { name: "35 - 39", patient: 1 },
                        { name: "40 - 44", patient: 6 },
                        { name: "45 - 49", patient: 11 },
                        { name: "50 - 54", patient: 17},
                        { name: "55 - 59", patient: 8 },
                        { name: "มากกว่า 60", patient: 6 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 110, 
                    gender: [
                        { name: "หญิง", value: 67 },
                        { name: "ชาย", value: 43 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 15 },
                        { name: "20- 24", patient: 15 },
                        { name: "25 - 29", patient: 11 },
                        { name: "30 - 34", patient: 7 },
                        { name: "35 - 39", patient: 3 },
                        { name: "40 - 44", patient: 18 },
                        { name: "45 - 49", patient: 15 },
                        { name: "50 - 54", patient: 0 },
                        { name: "55 - 59", patient: 13 },
                        { name: "มากกว่า 60", patient: 13 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 100, 
                    gender: [
                        { name: "หญิง", value: 44 },
                        { name: "ชาย", value: 56 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 17 },
                        { name: "20- 24", patient: 8 },
                        { name: "25 - 29", patient: 6 },
                        { name: "30 - 34", patient: 8 },
                        { name: "35 - 39", patient: 1 },
                        { name: "40 - 44", patient: 11 },
                        { name: "45 - 49", patient: 10 },
                        { name: "50 - 54", patient: 15 },
                        { name: "55 - 59", patient: 16 },
                        { name: "มากกว่า 60", patient: 8 }] },]
        },
        {
            index: 7,
            hospital: 'อัจฉริยาคลินิกการแพทย์แผนไทยประยุกต์', 
            patient: 419, 
            service: 438,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 84,
                    gender: [
                        { name: "หญิง", value: 40 },
                        { name: "ชาย", value: 44 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 15 },
                        { name: "20- 24", patient: 1 },
                        { name: "25 - 29", patient: 14 },
                        { name: "30 - 34", patient: 7 },
                        { name: "35 - 39", patient: 9 },
                        { name: "40 - 44", patient: 11 },
                        { name: "45 - 49", patient: 5 },
                        { name: "50 - 54", patient: 7},
                        { name: "55 - 59", patient: 5 },
                        { name: "มากกว่า 60", patient: 10 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 46,
                    gender: [
                        { name: "หญิง", value: 46 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 6 },
                        { name: "20- 24", patient: 3 },
                        { name: "25 - 29", patient: 10 },
                        { name: "30 - 34", patient: 2 },
                        { name: "35 - 39", patient: 9 },
                        { name: "40 - 44", patient: 3 },
                        { name: "45 - 49", patient: 6 },
                        { name: "50 - 54", patient: 6 },
                        { name: "55 - 59", patient: 1 },
                        { name: "มากกว่า 60", patient: 0 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 109, 
                    gender: [
                        { name: "หญิง", value: 53 },
                        { name: "ชาย", value: 56 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 4 },
                        { name: "20- 24", patient: 12 },
                        { name: "25 - 29", patient: 13 },
                        { name: "30 - 34", patient: 10 },
                        { name: "35 - 39", patient: 9 },
                        { name: "40 - 44", patient: 7 },
                        { name: "45 - 49", patient: 18 },
                        { name: "50 - 54", patient: 15 },
                        { name: "55 - 59", patient: 9 },
                        { name: "มากกว่า 60", patient: 12 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 95, 
                    gender: [
                        { name: "หญิง", value: 50 },
                        { name: "ชาย", value: 45 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 12 },
                        { name: "20- 24", patient: 11 },
                        { name: "25 - 29", patient: 6 },
                        { name: "30 - 34", patient: 14 },
                        { name: "35 - 39", patient: 5 },
                        { name: "40 - 44", patient: 10 },
                        { name: "45 - 49", patient: 10 },
                        { name: "50 - 54", patient: 9 },
                        { name: "55 - 59", patient: 10 },
                        { name: "มากกว่า 60", patient: 8 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 104, 
                    gender: [
                        { name: "หญิง", value: 46 },
                        { name: "ชาย", value: 58 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 15 },
                        { name: "20- 24", patient: 8 },
                        { name: "25 - 29", patient: 2 },
                        { name: "30 - 34", patient: 15 },
                        { name: "35 - 39", patient: 11 },
                        { name: "40 - 44", patient: 4 },
                        { name: "45 - 49", patient: 17 },
                        { name: "50 - 54", patient: 3 },
                        { name: "55 - 59", patient: 18 },
                        { name: "มากกว่า 60", patient: 11 }] },]
        },
        {
            index: 8,
            hospital: 'โรงพยาบาลกาบเชิง', 
            patient: 424, 
            service: 444,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 97,
                    gender: [
                        { name: "หญิง", value: 52 },
                        { name: "ชาย", value: 45 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 12 },
                        { name: "20- 24", patient: 9 },
                        { name: "25 - 29", patient: 12 },
                        { name: "30 - 34", patient: 17 },
                        { name: "35 - 39", patient: 12 },
                        { name: "40 - 44", patient: 3 },
                        { name: "45 - 49", patient: 17 },
                        { name: "50 - 54", patient: 3},
                        { name: "55 - 59", patient: 11 },
                        { name: "มากกว่า 60", patient: 11 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 48,
                    gender: [
                        { name: "หญิง", value: 48 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 3 },
                        { name: "20- 24", patient: 7 },
                        { name: "25 - 29", patient: 2 },
                        { name: "30 - 34", patient: 9 },
                        { name: "35 - 39", patient: 1 },
                        { name: "40 - 44", patient: 2 },
                        { name: "45 - 49", patient: 6 },
                        { name: "50 - 54", patient: 9 },
                        { name: "55 - 59", patient: 7 },
                        { name: "มากกว่า 60", patient: 2 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 80, 
                    gender: [
                        { name: "หญิง", value: 48 },
                        { name: "ชาย", value: 32 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 6 },
                        { name: "20- 24", patient: 13 },
                        { name: "25 - 29", patient: 7 },
                        { name: "30 - 34", patient: 11 },
                        { name: "35 - 39", patient: 15 },
                        { name: "40 - 44", patient: 2 },
                        { name: "45 - 49", patient: 8 },
                        { name: "50 - 54", patient: 5 },
                        { name: "55 - 59", patient: 4 },
                        { name: "มากกว่า 60", patient: 9 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 115, 
                    gender: [
                        { name: "หญิง", value: 56 },
                        { name: "ชาย", value: 59 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 8 },
                        { name: "20- 24", patient: 9 },
                        { name: "25 - 29", patient: 8 },
                        { name: "30 - 34", patient: 15 },
                        { name: "35 - 39", patient: 14 },
                        { name: "40 - 44", patient: 10 },
                        { name: "45 - 49", patient: 13 },
                        { name: "50 - 54", patient: 12 },
                        { name: "55 - 59", patient: 9 },
                        { name: "มากกว่า 60", patient: 17 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 104, 
                    gender: [
                        { name: "หญิง", value: 64 },
                        { name: "ชาย", value: 40 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 7 },
                        { name: "20- 24", patient: 16 },
                        { name: "25 - 29", patient: 9 },
                        { name: "30 - 34", patient: 5 },
                        { name: "35 - 39", patient: 6 },
                        { name: "40 - 44", patient: 8 },
                        { name: "45 - 49", patient: 14 },
                        { name: "50 - 54", patient: 17 },
                        { name: "55 - 59", patient: 9 },
                        { name: "มากกว่า 60", patient: 13 }] },]
        },
        {
            index: 9,
            hospital: 'โรงพยาบาลสำโรงทาบ', 
            patient: 410, 
            service: 430,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 81,
                    gender: [
                        { name: "หญิง", value: 41 },
                        { name: "ชาย", value: 40 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 3 },
                        { name: "20- 24", patient: 9 },
                        { name: "25 - 29", patient: 2 },
                        { name: "30 - 34", patient: 9 },
                        { name: "35 - 39", patient: 3 },
                        { name: "40 - 44", patient: 3 },
                        { name: "45 - 49", patient: 4 },
                        { name: "50 - 54", patient: 1},
                        { name: "55 - 59", patient: 5 },
                        { name: "มากกว่า 60", patient: 2 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 53,
                    gender: [
                        { name: "หญิง", value: 53 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 2 },
                        { name: "20- 24", patient: 1 },
                        { name: "25 - 29", patient: 4 },
                        { name: "30 - 34", patient: 7 },
                        { name: "35 - 39", patient: 4 },
                        { name: "40 - 44", patient: 3 },
                        { name: "45 - 49", patient: 8 },
                        { name: "50 - 54", patient: 7 },
                        { name: "55 - 59", patient: 8 },
                        { name: "มากกว่า 60", patient: 9 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 97, 
                    gender: [
                        { name: "หญิง", value: 59 },
                        { name: "ชาย", value: 38 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 8 },
                        { name: "20- 24", patient: 5 },
                        { name: "25 - 29", patient: 4 },
                        { name: "30 - 34", patient: 6 },
                        { name: "35 - 39", patient: 5 },
                        { name: "40 - 44", patient: 2 },
                        { name: "45 - 49", patient: 7 },
                        { name: "50 - 54", patient: 7 },
                        { name: "55 - 59", patient: 8 },
                        { name: "มากกว่า 60", patient: 7 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 95, 
                    gender: [
                        { name: "หญิง", value: 42 },
                        { name: "ชาย", value: 53 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 5 },
                        { name: "20- 24", patient: 1 },
                        { name: "25 - 29", patient: 7 },
                        { name: "30 - 34", patient: 1 },
                        { name: "35 - 39", patient: 10 },
                        { name: "40 - 44", patient: 2 },
                        { name: "45 - 49", patient: 1 },
                        { name: "50 - 54", patient: 10 },
                        { name: "55 - 59", patient: 0 },
                        { name: "มากกว่า 60", patient: 5 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 104, 
                    gender: [
                        { name: "หญิง", value: 51 },
                        { name: "ชาย", value: 53 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 9 },
                        { name: "20- 24", patient: 5 },
                        { name: "25 - 29", patient: 4 },
                        { name: "30 - 34", patient: 1},
                        { name: "35 - 39", patient: 10 },
                        { name: "40 - 44", patient: 2 },
                        { name: "45 - 49", patient: 6 },
                        { name: "50 - 54", patient: 4 },
                        { name: "55 - 59", patient: 5 },
                        { name: "มากกว่า 60", patient: 5 }] },]
        },
        {
            index: 10,
            hospital: 'โรงพยาบาลพระอาจารย์ฝั้น อาจาโร', 
            patient: 451, 
            service: 470,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 106,
                    gender: [
                        { name: "หญิง", value: 58 },
                        { name: "ชาย", value: 48 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 2 },
                        { name: "20- 24", patient: 12 },
                        { name: "25 - 29", patient: 10 },
                        { name: "30 - 34", patient: 12 },
                        { name: "35 - 39", patient: 13 },
                        { name: "40 - 44", patient: 12 },
                        { name: "45 - 49", patient: 11},
                        { name: "50 - 54", patient: 13},
                        { name: "55 - 59", patient: 7 },
                        { name: "มากกว่า 60", patient: 14 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 56,
                    gender: [
                        { name: "หญิง", value: 56 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 1 },
                        { name: "20- 24", patient: 9 },
                        { name: "25 - 29", patient: 10 },
                        { name: "30 - 34", patient: 8 },
                        { name: "35 - 39", patient: 2 },
                        { name: "40 - 44", patient: 6 },
                        { name: "45 - 49", patient: 3 },
                        { name: "50 - 54", patient: 7 },
                        { name: "55 - 59", patient: 1 },
                        { name: "มากกว่า 60", patient: 9 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 94, 
                    gender: [
                        { name: "หญิง", value: 35 },
                        { name: "ชาย", value: 59 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 12 },
                        { name: "20- 24", patient: 10},
                        { name: "25 - 29", patient: 10 },
                        { name: "30 - 34", patient: 10 },
                        { name: "35 - 39", patient: 6 },
                        { name: "40 - 44", patient: 7 },
                        { name: "45 - 49", patient: 12 },
                        { name: "50 - 54", patient: 11 },
                        { name: "55 - 59", patient: 10 },
                        { name: "มากกว่า 60", patient: 6 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 109, 
                    gender: [
                        { name: "หญิง", value: 62 },
                        { name: "ชาย", value: 47 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 11 },
                        { name: "20- 24", patient: 13 },
                        { name: "25 - 29", patient: 14 },
                        { name: "30 - 34", patient: 5 },
                        { name: "35 - 39", patient: 6 },
                        { name: "40 - 44", patient: 14 },
                        { name: "45 - 49", patient: 7 },
                        { name: "50 - 54", patient: 10 },
                        { name: "55 - 59", patient: 12 },
                        { name: "มากกว่า 60", patient: 17 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 105, 
                    gender: [
                        { name: "หญิง", value: 48 },
                        { name: "ชาย", value: 57 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 3 },
                        { name: "20- 24", patient: 12 },
                        { name: "25 - 29", patient: 8 },
                        { name: "30 - 34", patient: 6},
                        { name: "35 - 39", patient: 11 },
                        { name: "40 - 44", patient: 91 },
                        { name: "45 - 49", patient: 17 },
                        { name: "50 - 54", patient: 17 },
                        { name: "55 - 59", patient: 6 },
                        { name: "มากกว่า 60", patient: 14 }] },]
        },
        {
            index: 11,
            hospital: 'โรงพยาบาลโพธาราม', 
            patient: 416, 
            service: 428,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 120,
                    gender: [
                        { name: "หญิง", value: 60 },
                        { name: "ชาย", value: 60 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 10 },
                        { name: "20- 24", patient: 17 },
                        { name: "25 - 29", patient: 11 },
                        { name: "30 - 34", patient: 15 },
                        { name: "35 - 39", patient: 9 },
                        { name: "40 - 44", patient: 9 },
                        { name: "45 - 49", patient: 9},
                        { name: "50 - 54", patient: 13},
                        { name: "55 - 59", patient: 14 },
                        { name: "มากกว่า 60", patient: 13 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 26,
                    gender: [
                        { name: "หญิง", value: 26 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 1 },
                        { name: "20- 24", patient: 1 },
                        { name: "25 - 29", patient: 2 },
                        { name: "30 - 34", patient: 1 },
                        { name: "35 - 39", patient: 3 },
                        { name: "40 - 44", patient: 3 },
                        { name: "45 - 49", patient: 5 },
                        { name: "50 - 54", patient: 5 },
                        { name: "55 - 59", patient: 3 },
                        { name: "มากกว่า 60", patient: 2 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 90, 
                    gender: [
                        { name: "หญิง", value: 43 },
                        { name: "ชาย", value: 47 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 8 },
                        { name: "20- 24", patient: 7 },
                        { name: "25 - 29", patient: 6 },
                        { name: "30 - 34", patient: 9 },
                        { name: "35 - 39", patient: 6 },
                        { name: "40 - 44", patient: 4 },
                        { name: "45 - 49", patient: 13 },
                        { name: "50 - 54", patient: 14 },
                        { name: "55 - 59", patient: 11 },
                        { name: "มากกว่า 60", patient: 12 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 83, 
                    gender: [
                        { name: "หญิง", value: 35 },
                        { name: "ชาย", value: 48 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 11 },
                        { name: "20- 24", patient: 11 },
                        { name: "25 - 29", patient: 11 },
                        { name: "30 - 34", patient: 3 },
                        { name: "35 - 39", patient: 8 },
                        { name: "40 - 44", patient: 9 },
                        { name: "45 - 49", patient: 7 },
                        { name: "50 - 54", patient: 2 },
                        { name: "55 - 59", patient: 6 },
                        { name: "มากกว่า 60", patient: 15 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 109, 
                    gender: [
                        { name: "หญิง", value: 52 },
                        { name: "ชาย", value: 57 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 11 },
                        { name: "20- 24", patient: 20 },
                        { name: "25 - 29", patient: 5 },
                        { name: "30 - 34", patient: 19 },
                        { name: "35 - 39", patient: 4 },
                        { name: "40 - 44", patient: 6 },
                        { name: "45 - 49", patient: 9 },
                        { name: "50 - 54", patient: 15 },
                        { name: "55 - 59", patient: 9 },
                        { name: "มากกว่า 60", patient: 11 }] },]
        },
        {
            index: 12,
            hospital: 'โรงพยาบาลท่าโรงช้าง', 
            patient: 482, 
            service: 499,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 123,
                    gender: [
                        { name: "หญิง", value: 56 },
                        { name: "ชาย", value: 67 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 13 },
                        { name: "20- 24", patient: 18 },
                        { name: "25 - 29", patient: 9 },
                        { name: "30 - 34", patient: 12 },
                        { name: "35 - 39", patient: 19 },
                        { name: "40 - 44", patient: 16 },
                        { name: "45 - 49", patient: 15},
                        { name: "50 - 54", patient: 5},
                        { name: "55 - 59", patient: 7 },
                        { name: "มากกว่า 60", patient: 9 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 59,
                    gender: [
                        { name: "หญิง", value: 59 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 8 },
                        { name: "20- 24", patient: 9 },
                        { name: "25 - 29", patient: 7 },
                        { name: "30 - 34", patient: 9 },
                        { name: "35 - 39", patient: 1 },
                        { name: "40 - 44", patient: 8 },
                        { name: "45 - 49", patient: 0 },
                        { name: "50 - 54", patient: 4 },
                        { name: "55 - 59", patient: 6 },
                        { name: "มากกว่า 60", patient:7 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 12, 
                    gender: [
                        { name: "หญิง", value: 70 },
                        { name: "ชาย", value: 42 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 11 },
                        { name: "20- 24", patient: 8 },
                        { name: "25 - 29", patient: 10 },
                        { name: "30 - 34", patient: 6 },
                        { name: "35 - 39", patient: 16 },
                        { name: "40 - 44", patient: 19 },
                        { name: "45 - 49", patient: 6 },
                        { name: "50 - 54", patient: 14 },
                        { name: "55 - 59", patient: 8 },
                        { name: "มากกว่า 60", patient: 14 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 100, 
                    gender: [
                        { name: "หญิง", value: 56 },
                        { name: "ชาย", value: 44 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 9 },
                        { name: "20- 24", patient: 8 },
                        { name: "25 - 29", patient: 11 },
                        { name: "30 - 34", patient: 15 },
                        { name: "35 - 39", patient: 7 },
                        { name: "40 - 44", patient: 11 },
                        { name: "45 - 49", patient: 6 },
                        { name: "50 - 54", patient: 17 },
                        { name: "55 - 59", patient: 6 },
                        { name: "มากกว่า 60", patient: 10 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 105, 
                    gender: [
                        { name: "หญิง", value: 50 },
                        { name: "ชาย", value: 55 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 15 },
                        { name: "20- 24", patient: 8 },
                        { name: "25 - 29", patient: 4 },
                        { name: "30 - 34", patient: 16 },
                        { name: "35 - 39", patient: 15 },
                        { name: "40 - 44", patient: 10 },
                        { name: "45 - 49", patient: 12 },
                        { name: "50 - 54", patient: 13 },
                        { name: "55 - 59", patient: 3 },
                        { name: "มากกว่า 60", patient: 9 }] },]
        },
        {
            index: 13,
            hospital: 'คลินิกการแพทย์แผนไทยเนตรดาว', 
            patient: 395, 
            service: 414,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 115,
                    gender: [
                        { name: "หญิง", value: 57 },
                        { name: "ชาย", value: 58 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 12 },
                        { name: "20- 24", patient: 15 },
                        { name: "25 - 29", patient: 10 },
                        { name: "30 - 34", patient: 3 },
                        { name: "35 - 39", patient: 15 },
                        { name: "40 - 44", patient: 11 },
                        { name: "45 - 49", patient: 1},
                        { name: "50 - 54", patient: 11},
                        { name: "55 - 59", patient: 18 },
                        { name: "มากกว่า 60", patient: 19 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 56,
                    gender: [
                        { name: "หญิง", value: 56 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 8 },
                        { name: "20- 24", patient: 6 },
                        { name: "25 - 29", patient: 9 },
                        { name: "30 - 34", patient: 2 },
                        { name: "35 - 39", patient: 2 },
                        { name: "40 - 44", patient: 4 },
                        { name: "45 - 49", patient: 4 },
                        { name: "50 - 54", patient: 8 },
                        { name: "55 - 59", patient: 7 },
                        { name: "มากกว่า 60", patient: 6 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 73, 
                    gender: [
                        { name: "หญิง", value: 46 },
                        { name: "ชาย", value: 27 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 4 },
                        { name: "20- 24", patient: 13 },
                        { name: "25 - 29", patient: 5 },
                        { name: "30 - 34", patient: 4 },
                        { name: "35 - 39", patient: 4 },
                        { name: "40 - 44", patient: 12 },
                        { name: "45 - 49", patient: 3 },
                        { name: "50 - 54", patient: 12 },
                        { name: "55 - 59", patient: 5 },
                        { name: "มากกว่า 60", patient: 11 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 83, 
                    gender: [
                        { name: "หญิง", value: 48 },
                        { name: "ชาย", value: 35 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 11 },
                        { name: "20- 24", patient: 8 },
                        { name: "25 - 29", patient: 1 },
                        { name: "30 - 34", patient: 2 },
                        { name: "35 - 39", patient: 16 },
                        { name: "40 - 44", patient: 17 },
                        { name: "45 - 49", patient: 8 },
                        { name: "50 - 54", patient: 13 },
                        { name: "55 - 59", patient: 5 },
                        { name: "มากกว่า 60", patient: 2 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 87, 
                    gender: [
                        { name: "หญิง", value: 44 },
                        { name: "ชาย", value: 43 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 10 },
                        { name: "20- 24", patient: 10 },
                        { name: "25 - 29", patient: 7 },
                        { name: "30 - 34", patient: 13 },
                        { name: "35 - 39", patient: 11 },
                        { name: "40 - 44", patient: 10 },
                        { name: "45 - 49", patient: 2 },
                        { name: "50 - 54", patient: 2 },
                        { name: "55 - 59", patient: 18 },
                        { name: "มากกว่า 60", patient: 4 }] },]
        },
        {
            index: 14,
            hospital: 'ทรงกลด สหคลินิก', 
            patient: 464, 
            service: 475,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 87,
                    gender: [
                        { name: "หญิง", value: 45 },
                        { name: "ชาย", value: 42 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 9 },
                        { name: "20- 24", patient: 2 },
                        { name: "25 - 29", patient: 8 },
                        { name: "30 - 34", patient: 9 },
                        { name: "35 - 39", patient: 0 },
                        { name: "40 - 44", patient: 12 },
                        { name: "45 - 49", patient: 16},
                        { name: "50 - 54", patient: 9},
                        { name: "55 - 59", patient: 16 },
                        { name: "มากกว่า 60", patient: 6 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 60,
                    gender: [
                        { name: "หญิง", value: 60 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 10 },
                        { name: "20- 24", patient: 10 },
                        { name: "25 - 29", patient: 7 },
                        { name: "30 - 34", patient: 4 },
                        { name: "35 - 39", patient: 8 },
                        { name: "40 - 44", patient: 4 },
                        { name: "45 - 49", patient: 1 },
                        { name: "50 - 54", patient: 2 },
                        { name: "55 - 59", patient: 5 },
                        { name: "มากกว่า 60", patient: 9 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 109, 
                    gender: [
                        { name: "หญิง", value: 55 },
                        { name: "ชาย", value: 54 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 17 },
                        { name: "20- 24", patient: 5 },
                        { name: "25 - 29", patient: 13 },
                        { name: "30 - 34", patient: 8 },
                        { name: "35 - 39", patient: 9 },
                        { name: "40 - 44", patient: 13 },
                        { name: "45 - 49", patient: 11 },
                        { name: "50 - 54", patient: 15 },
                        { name: "55 - 59", patient: 7 },
                        { name: "มากกว่า 60", patient: 11 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 103, 
                    gender: [
                        { name: "หญิง", value: 50 },
                        { name: "ชาย", value: 53 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 10 },
                        { name: "20- 24", patient: 12 },
                        { name: "25 - 29", patient: 14 },
                        { name: "30 - 34", patient: 12 },
                        { name: "35 - 39", patient: 9 },
                        { name: "40 - 44", patient: 12 },
                        { name: "45 - 49", patient: 5},
                        { name: "50 - 54", patient: 7 },
                        { name: "55 - 59", patient: 7 },
                        { name: "มากกว่า 60", patient: 15 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 116, 
                    gender: [
                        { name: "หญิง", value: 62 },
                        { name: "ชาย", value: 54 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 16 },
                        { name: "20- 24", patient: 12 },
                        { name: "25 - 29", patient: 14 },
                        { name: "30 - 34", patient: 12 },
                        { name: "35 - 39", patient: 3},
                        { name: "40 - 44", patient: 12 },
                        { name: "45 - 49", patient: 17 },
                        { name: "50 - 54", patient: 9 },
                        { name: "55 - 59", patient: 12 },
                        { name: "มากกว่า 60", patient: 9 }] },]
        },
        {
            index: 15,
            hospital: 'หมออรสา คลินิกการแพทย์แผนไทยประยุกต์', 
            patient: 386, 
            service: 407,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 104,
                    gender: [
                        { name: "หญิง", value: 43 },
                        { name: "ชาย", value: 61 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 6 },
                        { name: "20- 24", patient: 14 },
                        { name: "25 - 29", patient: 11 },
                        { name: "30 - 34", patient: 13 },
                        { name: "35 - 39", patient: 9 },
                        { name: "40 - 44", patient: 11 },
                        { name: "45 - 49", patient: 15},
                        { name: "50 - 54", patient: 8},
                        { name: "55 - 59", patient: 5 },
                        { name: "มากกว่า 60", patient: 12 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 39,
                    gender: [
                        { name: "หญิง", value: 39 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 2 },
                        { name: "20- 24", patient: 7 },
                        { name: "25 - 29", patient: 4 },
                        { name: "30 - 34", patient: 10 },
                        { name: "35 - 39", patient: 1 },
                        { name: "40 - 44", patient: 4 },
                        { name: "45 - 49", patient: 4 },
                        { name: "50 - 54", patient: 4 },
                        { name: "55 - 59", patient: 1 },
                        { name: "มากกว่า 60", patient: 2 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 88, 
                    gender: [
                        { name: "หญิง", value: 43 },
                        { name: "ชาย", value: 45 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 6 },
                        { name: "20- 24", patient: 14 },
                        { name: "25 - 29", patient: 11 },
                        { name: "30 - 34", patient: 10 },
                        { name: "35 - 39", patient: 14 },
                        { name: "40 - 44", patient: 7 },
                        { name: "45 - 49", patient: 3 },
                        { name: "50 - 54", patient: 5 },
                        { name: "55 - 59", patient: 13 },
                        { name: "มากกว่า 60", patient: 5 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 86, 
                    gender: [
                        { name: "หญิง", value: 48 },
                        { name: "ชาย", value: 38 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 7 },
                        { name: "20- 24", patient: 8 },
                        { name: "25 - 29", patient: 4},
                        { name: "30 - 34", patient: 3 },
                        { name: "35 - 39", patient: 18 },
                        { name: "40 - 44", patient: 17 },
                        { name: "45 - 49", patient: 8},
                        { name: "50 - 54", patient: 10 },
                        { name: "55 - 59", patient: 6 },
                        { name: "มากกว่า 60", patient: 5 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 90, 
                    gender: [
                        { name: "หญิง", value: 47 },
                        { name: "ชาย", value: 43 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 12 },
                        { name: "20- 24", patient: 14 },
                        { name: "25 - 29", patient: 9 },
                        { name: "30 - 34", patient: 6 },
                        { name: "35 - 39", patient: 10},
                        { name: "40 - 44", patient: 8 },
                        { name: "45 - 49", patient: 1 },
                        { name: "50 - 54", patient: 8 },
                        { name: "55 - 59", patient: 16 },
                        { name: "มากกว่า 60", patient: 6 }] },]
        },
        {
            index: 16,
            hospital: 'ภัทรภาสคลินิกการแพทย์แผนไทยประยุกต์', 
            patient: 439, 
            service: 456,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 102,
                    gender: [
                        { name: "หญิง", value: 60 },
                        { name: "ชาย", value: 42 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 3 },
                        { name: "20- 24", patient: 9 },
                        { name: "25 - 29", patient: 14 },
                        { name: "30 - 34", patient: 15 },
                        { name: "35 - 39", patient: 12 },
                        { name: "40 - 44", patient: 7 },
                        { name: "45 - 49", patient: 12},
                        { name: "50 - 54", patient: 12},
                        { name: "55 - 59", patient: 8 },
                        { name: "มากกว่า 60", patient: 10 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 51,
                    gender: [
                        { name: "หญิง", value: 51 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 10 },
                        { name: "20- 24", patient: 1 },
                        { name: "25 - 29", patient: 1 },
                        { name: "30 - 34", patient: 5 },
                        { name: "35 - 39", patient: 8 },
                        { name: "40 - 44", patient: 5 },
                        { name: "45 - 49", patient: 8 },
                        { name: "50 - 54", patient: 6 },
                        { name: "55 - 59", patient: 1 },
                        { name: "มากกว่า 60", patient: 6 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 73, 
                    gender: [
                        { name: "หญิง", value: 31 },
                        { name: "ชาย", value: 43 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 12 },
                        { name: "20- 24", patient: 8 },
                        { name: "25 - 29", patient: 4 },
                        { name: "30 - 34", patient: 6 },
                        { name: "35 - 39", patient: 9 },
                        { name: "40 - 44", patient: 9 },
                        { name: "45 - 49", patient:4 },
                        { name: "50 - 54", patient: 11 },
                        { name: "55 - 59", patient: 7 },
                        { name: "มากกว่า 60", patient: 3 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 103, 
                    gender: [
                        { name: "หญิง", value: 47 },
                        { name: "ชาย", value: 56 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 7 },
                        { name: "20- 24", patient: 10 },
                        { name: "25 - 29", patient: 15},
                        { name: "30 - 34", patient: 13 },
                        { name: "35 - 39", patient: 16 },
                        { name: "40 - 44", patient: 9 },
                        { name: "45 - 49", patient: 6},
                        { name: "50 - 54", patient: 7 },
                        { name: "55 - 59", patient: 9 },
                        { name: "มากกว่า 60", patient: 11 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 127, 
                    gender: [
                        { name: "หญิง", value: 59 },
                        { name: "ชาย", value: 68 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 14 },
                        { name: "20- 24", patient: 17 },
                        { name: "25 - 29", patient: 16 },
                        { name: "30 - 34", patient: 7 },
                        { name: "35 - 39", patient: 17},
                        { name: "40 - 44", patient: 8 },
                        { name: "45 - 49", patient: 7 },
                        { name: "50 - 54", patient: 12 },
                        { name: "55 - 59", patient: 18 },
                        { name: "มากกว่า 60", patient:11 }] },]
        },
        {
            index: 17,
            hospital: 'โรงพยาบาลสุทธาเวช คณะแพทยศาสตร์ มหาวิทยาลัยมหาสารคาม', 
            patient: 458, 
            service: 477,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 98,
                    gender: [
                        { name: "หญิง", value: 58 },
                        { name: "ชาย", value: 40 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 19 },
                        { name: "20- 24", patient: 8 },
                        { name: "25 - 29", patient: 18 },
                        { name: "30 - 34", patient: 8 },
                        { name: "35 - 39", patient: 12 },
                        { name: "40 - 44", patient: 3 },
                        { name: "45 - 49", patient: 7},
                        { name: "50 - 54", patient: 12},
                        { name: "55 - 59", patient: 10 },
                        { name: "มากกว่า 60", patient: 1 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 64,
                    gender: [
                        { name: "หญิง", value: 64 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 9},
                        { name: "20- 24", patient: 10 },
                        { name: "25 - 29", patient: 9 },
                        { name: "30 - 34", patient: 1 },
                        { name: "35 - 39", patient: 9 },
                        { name: "40 - 44", patient: 3 },
                        { name: "45 - 49", patient: 7 },
                        { name: "50 - 54", patient: 5 },
                        { name: "55 - 59", patient: 8 },
                        { name: "มากกว่า 60", patient: 3 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 106, 
                    gender: [
                        { name: "หญิง", value: 58 },
                        { name: "ชาย", value: 48 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 7 },
                        { name: "20- 24", patient: 2 },
                        { name: "25 - 29", patient: 10 },
                        { name: "30 - 34", patient: 14 },
                        { name: "35 - 39", patient: 12 },
                        { name: "40 - 44", patient: 11 },
                        { name: "45 - 49", patient: 4 },
                        { name: "50 - 54", patient: 14 },
                        { name: "55 - 59", patient: 19 },
                        { name: "มากกว่า 60", patient: 13 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 105, 
                    gender: [
                        { name: "หญิง", value: 56 },
                        { name: "ชาย", value: 49 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 16 },
                        { name: "20- 24", patient: 17 },
                        { name: "25 - 29", patient: 9},
                        { name: "30 - 34", patient: 12 },
                        { name: "35 - 39", patient: 8 },
                        { name: "40 - 44", patient: 6 },
                        { name: "45 - 49", patient: 13},
                        { name: "50 - 54", patient: 9 },
                        { name: "55 - 59", patient: 8 },
                        { name: "มากกว่า 60", patient: 7 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 104, 
                    gender: [
                        { name: "หญิง", value: 52 },
                        { name: "ชาย", value: 52 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 9 },
                        { name: "20- 24", patient: 17 },
                        { name: "25 - 29", patient: 3 },
                        { name: "30 - 34", patient: 4 },
                        { name: "35 - 39", patient: 10},
                        { name: "40 - 44", patient: 12 },
                        { name: "45 - 49", patient: 11 },
                        { name: "50 - 54", patient: 12 },
                        { name: "55 - 59", patient: 12 },
                        { name: "มากกว่า 60", patient: 14 }] },]
        },
    ],
    2567: [
        {   
            index: 1,
            hospital: 'โรงพยาบาลการแพทย์แผนไทยและการแพทย์ผสมผสาน', 
            patient: 5364, 
            service: 5561, 
            diseases: [
                { name: "กลุ่มไข้หวัดน้อย", value: 1363,
                    gender: [
                        { name: "หญิง", value: 710 },
                        { name: "ชาย", value: 653 },
                    ], 
                    age: [
                        { name: "น้อยกว่า 20", patient: 138 },
                        { name: "20- 24", patient: 154 },
                        { name: "25 - 29", patient: 149 },
                        { name: "30 - 34", patient: 147 },
                        { name: "35 - 39", patient: 121 },
                        { name: "40 - 44", patient: 125 },
                        { name: "45 - 49", patient: 127 },
                        { name: "50 - 54", patient: 136},
                        { name: "55 - 59", patient: 146 },
                        { name: "มากกว่า 60", patient: 120 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 575, 
                    gender: [
                        { name: "หญิง", value: 575 },
                        { name: "ชาย", value: 0 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 50 },
                        { name: "20- 24", patient: 69 },
                        { name: "25 - 29", patient: 41 },
                        { name: "30 - 34", patient: 45 },
                        { name: "35 - 39", patient: 59 },
                        { name: "40 - 44", patient: 52 },
                        { name: "45 - 49", patient: 68 },
                        { name: "50 - 54", patient: 63 },
                        { name: "55 - 59", patient: 54 },
                        { name: "มากกว่า 60", patient: 74 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1111,
                    gender: [
                        { name: "หญิง", value: 566 },
                        { name: "ชาย", value: 545 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 93 },
                        { name: "20- 24", patient: 128 },
                        { name: "25 - 29", patient: 143 },
                        { name: "30 - 34", patient: 88 },
                        { name: "35 - 39", patient: 96 },
                        { name: "40 - 44", patient: 119 },
                        { name: "45 - 49", patient: 120 },
                        { name: "50 - 54", patient: 105 },
                        { name: "55 - 59", patient: 89 },
                        { name: "มากกว่า 60", patient: 130 }] },
                { name: "กลุ่มอาการผดผื่น", value: 1294,
                    gender: [
                        { name: "หญิง", value: 629 },
                        { name: "ชาย", value: 665 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 122 },
                        { name: "20- 24", patient: 116 },
                        { name: "25 - 29", patient: 137 },
                        { name: "30 - 34", patient:136 },
                        { name: "35 - 39", patient: 112 },
                        { name: "40 - 44", patient: 129 },
                        { name: "45 - 49", patient: 134 },
                        { name: "50 - 54", patient: 116 },
                        { name: "55 - 59", patient: 136 },
                        { name: "มากกว่า 60", patient: 156 }] },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1218,
                    gender: [
                        { name: "หญิง", value: 600 },
                        { name: "ชาย", value: 618 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 120 },
                        { name: "20- 24", patient: 126 },
                        { name: "25 - 29", patient: 146 },
                        { name: "30 - 34", patient: 119 },
                        { name: "35 - 39", patient: 120 },
                        { name: "40 - 44", patient: 116 },
                        { name: "45 - 49", patient: 100 },
                        { name: "50 - 54", patient: 127 },
                        { name: "55 - 59", patient: 126 },
                        { name: "มากกว่า 60", patient: 118 }] }
                ]
        },
        {
            index: 2,
            hospital: 'โรงพยาบาลลาดบัวหลวง', 
            patient: 5190, 
            service: 5403,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1198,
                    gender: [
                        { name: "หญิง", value: 625 },
                        { name: "ชาย", value: 573 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 109 },
                        { name: "20- 24", patient: 117 },
                        { name: "25 - 29", patient: 127 },
                        { name: "30 - 34", patient: 134 },
                        { name: "35 - 39", patient: 132 },
                        { name: "40 - 44", patient: 133 },
                        { name: "45 - 49", patient: 113 },
                        { name: "50 - 54", patient: 95 },
                        { name: "55 - 59", patient: 111 },
                        { name: "มากกว่า 60", patient: 127 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 589,
                    gender: [
                        { name: "หญิง", value: 589 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 50 },
                        { name: "20- 24", patient: 69 },
                        { name: "25 - 29", patient: 41 },
                        { name: "30 - 34", patient: 45 },
                        { name: "35 - 39", patient: 59 },
                        { name: "40 - 44", patient: 52 },
                        { name: "45 - 49", patient: 68 },
                        { name: "50 - 54", patient: 63 },
                        { name: "55 - 59", patient: 54 },
                        { name: "มากกว่า 60", patient: 74 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1174, 
                    gender: [
                        { name: "หญิง", value: 549 },
                        { name: "ชาย", value: 625 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 132 },
                        { name: "20- 24", patient: 107    },
                        { name: "25 - 29", patient: 103 },
                        { name: "30 - 34", patient: 119 },
                        { name: "35 - 39", patient: 121 },
                        { name: "40 - 44", patient: 94 },
                        { name: "45 - 49", patient: 109 },
                        { name: "50 - 54", patient: 139 },
                        { name: "55 - 59", patient: 137 },
                        { name: "มากกว่า 60", patient: 113 }] },
                { name: "กลุ่มอาการผดผื่น", value: 1148, 
                    gender: [
                        { name: "หญิง", value: 593 },
                        { name: "ชาย", value: 555 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 114 },
                        { name: "20- 24", patient: 114 },
                        { name: "25 - 29", patient: 112 },
                        { name: "30 - 34", patient: 128 },
                        { name: "35 - 39", patient: 99 },
                        { name: "40 - 44", patient: 131 },
                        { name: "45 - 49", patient: 106 },
                        { name: "50 - 54", patient: 104 },
                        { name: "55 - 59", patient: 107 },
                        { name: "มากกว่า 60", patient: 133 }] },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1294, 
                    gender: [
                        { name: "หญิง", value: 670 },
                        { name: "ชาย", value: 624 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 127 },
                        { name: "20- 24", patient: 123 },
                        { name: "25 - 29", patient: 143 },
                        { name: "30 - 34", patient: 109 },
                        { name: "35 - 39", patient: 147 },
                        { name: "40 - 44", patient: 142 },
                        { name: "45 - 49", patient: 127 },
                        { name: "50 - 54", patient: 140 },
                        { name: "55 - 59", patient: 108 },
                        { name: "มากกว่า 60", patient: 128 }] },]
        },
        {
            index: 3,
            hospital: 'โรงพยาบาลเสนา', 
            patient: 5153, 
            service: 5369,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1186,
                    gender: [
                        { name: "หญิง", value: 555 },
                        { name: "ชาย", value: 631 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 124 },
                        { name: "20- 24", patient: 118 },
                        { name: "25 - 29", patient: 101 },
                        { name: "30 - 34", patient: 121 },
                        { name: "35 - 39", patient: 109 },
                        { name: "40 - 44", patient: 134 },
                        { name: "45 - 49", patient: 147 },
                        { name: "50 - 54", patient: 118},
                        { name: "55 - 59", patient: 120 },
                        { name: "มากกว่า 60", patient: 94 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 600,
                    gender: [
                        { name: "หญิง", value: 600 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 37 },
                        { name: "20- 24", patient: 78 },
                        { name: "25 - 29", patient: 68 },
                        { name: "30 - 34", patient: 65 },
                        { name: "35 - 39", patient: 45 },
                        { name: "40 - 44", patient: 60 },
                        { name: "45 - 49", patient: 67 },
                        { name: "50 - 54", patient: 76 },
                        { name: "55 - 59", patient: 44 },
                        { name: "มากกว่า 60", patient: 57 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1150, 
                    gender: [
                        { name: "หญิง", value: 628 },
                        { name: "ชาย", value: 522 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 118 },
                        { name: "20- 24", patient: 133 },
                        { name: "25 - 29", patient: 136 },
                        { name: "30 - 34", patient: 108 },
                        { name: "35 - 39", patient: 88 },
                        { name: "40 - 44", patient: 136 },
                        { name: "45 - 49", patient: 116 },
                        { name: "50 - 54", patient: 112 },
                        { name: "55 - 59", patient: 99 },
                        { name: "มากกว่า 60", patient: 104 }] },
                { name: "กลุ่มอาการผดผื่น", value: 1207, 
                    gender: [
                        { name: "หญิง", value: 623 },
                        { name: "ชาย", value: 584 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 137 },
                        { name: "20- 24", patient: 127 },
                        { name: "25 - 29", patient: 107 },
                        { name: "30 - 34", patient: 131 },
                        { name: "35 - 39", patient: 131 },
                        { name: "40 - 44", patient: 121 },
                        { name: "45 - 49", patient: 115 },
                        { name: "50 - 54", patient: 120 },
                        { name: "55 - 59", patient: 123 },
                        { name: "มากกว่า 60", patient: 95 }] },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1226, 
                    gender: [
                        { name: "หญิง", value: 590 },
                        { name: "ชาย", value: 636 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 128 },
                        { name: "20- 24", patient: 117 },
                        { name: "25 - 29", patient: 144 },
                        { name: "30 - 34", patient: 111 },
                        { name: "35 - 39", patient: 140 },
                        { name: "40 - 44", patient: 127 },
                        { name: "45 - 49", patient: 124 },
                        { name: "50 - 54", patient: 107 },
                        { name: "55 - 59", patient: 113 },
                        { name: "มากกว่า 60", patient: 115 }] },]
        },
        {
            index: 4,
            hospital: 'โรงพยาบาลบางปะอิน', 
            patient: 5157, 
            service: 5362,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1268,
                    gender: [
                        { name: "หญิง", value: 637 },
                        { name: "ชาย", value: 631 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 134 },
                        { name: "20- 24", patient: 122 },
                        { name: "25 - 29", patient: 126 },
                        { name: "30 - 34", patient: 99 },
                        { name: "35 - 39", patient: 109 },
                        { name: "40 - 44", patient: 133 },
                        { name: "45 - 49", patient: 121 },
                        { name: "50 - 54", patient: 151},
                        { name: "55 - 59", patient: 140 },
                        { name: "มากกว่า 60", patient: 133 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 609,
                    gender: [
                        { name: "หญิง", value: 609 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 56 },
                        { name: "20- 24", patient: 56 },
                        { name: "25 - 29", patient: 63 },
                        { name: "30 - 34", patient: 67 },
                        { name: "35 - 39", patient: 43 },
                        { name: "40 - 44", patient: 65 },
                        { name: "45 - 49", patient: 56 },
                        { name: "50 - 54", patient: 69 },
                        { name: "55 - 59", patient: 75 },
                        { name: "มากกว่า 60", patient: 59 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1139, 
                    gender: [
                        { name: "หญิง", value: 565 },
                        { name: "ชาย", value: 574 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 138 },
                        { name: "20- 24", patient: 112 },
                        { name: "25 - 29", patient: 89 },
                        { name: "30 - 34", patient: 108 },
                        { name: "35 - 39", patient: 122 },
                        { name: "40 - 44", patient: 111 },
                        { name: "45 - 49", patient: 104 },
                        { name: "50 - 54", patient: 126 },
                        { name: "55 - 59", patient: 119 },
                        { name: "มากกว่า 60", patient: 110 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1184, 
                    gender: [
                        { name: "หญิง", value: 601 },
                        { name: "ชาย", value: 583 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 127 },
                        { name: "20- 24", patient: 107 },
                        { name: "25 - 29", patient: 108 },
                        { name: "30 - 34", patient: 115 },
                        { name: "35 - 39", patient: 123 },
                        { name: "40 - 44", patient: 124 },
                        { name: "45 - 49", patient: 133 },
                        { name: "50 - 54", patient: 114 },
                        { name: "55 - 59", patient: 115 },
                        { name: "มากกว่า 60", patient: 118 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1162, 
                    gender: [
                        { name: "หญิง", value: 644 },
                        { name: "ชาย", value: 518 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 119 },
                        { name: "20- 24", patient: 146 },
                        { name: "25 - 29", patient: 102 },
                        { name: "30 - 34", patient: 103 },
                        { name: "35 - 39", patient: 113 },
                        { name: "40 - 44", patient: 120 },
                        { name: "45 - 49", patient: 125 },
                        { name: "50 - 54", patient: 95 },
                        { name: "55 - 59", patient: 131 },
                        { name: "มากกว่า 60", patient: 108 }] },]
        },
        {
            index: 5,
            hospital: 'โรงพยาบาลบางซ้าย', 
            patient: 5137, 
            service: 5350,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1237,
                    gender: [
                        { name: "หญิง", value: 630 },
                        { name: "ชาย", value: 607 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 119 },
                        { name: "20- 24", patient: 152 },
                        { name: "25 - 29", patient: 109 },
                        { name: "30 - 34", patient: 137 },
                        { name: "35 - 39", patient: 147 },
                        { name: "40 - 44", patient: 100 },
                        { name: "45 - 49", patient: 122 },
                        { name: "50 - 54", patient: 123},
                        { name: "55 - 59", patient: 129 },
                        { name: "มากกว่า 60", patient: 99 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 609,
                    gender: [
                        { name: "หญิง", value: 609 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 66 },
                        { name: "20- 24", patient: 65 },
                        { name: "25 - 29", patient: 60 },
                        { name: "30 - 34", patient: 50 },
                        { name: "35 - 39", patient: 54 },
                        { name: "40 - 44", patient: 68 },
                        { name: "45 - 49", patient: 58 },
                        { name: "50 - 54", patient: 57 },
                        { name: "55 - 59", patient: 75 },
                        { name: "มากกว่า 60", patient: 56 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1165, 
                    gender: [
                        { name: "หญิง", value: 594 },
                        { name: "ชาย", value: 571 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 121 },
                        { name: "20- 24", patient: 116 },
                        { name: "25 - 29", patient: 99 },
                        { name: "30 - 34", patient: 98 },
                        { name: "35 - 39", patient: 112 },
                        { name: "40 - 44", patient: 124 },
                        { name: "45 - 49", patient: 126 },
                        { name: "50 - 54", patient: 135 },
                        { name: "55 - 59", patient: 106 },
                        { name: "มากกว่า 60", patient: 128 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1171, 
                    gender: [
                        { name: "หญิง", value: 608 },
                        { name: "ชาย", value: 563 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 144 },
                        { name: "20- 24", patient: 92 },
                        { name: "25 - 29", patient: 123 },
                        { name: "30 - 34", patient: 137 },
                        { name: "35 - 39", patient: 117 },
                        { name: "40 - 44", patient: 114 },
                        { name: "45 - 49", patient: 115 },
                        { name: "50 - 54", patient: 108 },
                        { name: "55 - 59", patient: 120 },
                        { name: "มากกว่า 60", patient: 101 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1168, 
                    gender: [
                        { name: "หญิง", value: 625 },
                        { name: "ชาย", value: 543 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 107 },
                        { name: "20- 24", patient: 125 },
                        { name: "25 - 29", patient: 93 },
                        { name: "30 - 34", patient: 111 },
                        { name: "35 - 39", patient: 146 },
                        { name: "40 - 44", patient: 123 },
                        { name: "45 - 49", patient: 140 },
                        { name: "50 - 54", patient: 107 },
                        { name: "55 - 59", patient: 108 },
                        { name: "มากกว่า 60", patient: 108 }] },]
        },
        {
            index: 6,
            hospital: 'โรงพยาบาลโคกสำโรง', 
            patient: 5153, 
            service: 5351,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1247,
                    gender: [
                        { name: "หญิง", value: 587 },
                        { name: "ชาย", value: 660 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 127 },
                        { name: "20- 24", patient: 105 },
                        { name: "25 - 29", patient: 120 },
                        { name: "30 - 34", patient: 130 },
                        { name: "35 - 39", patient: 99 },
                        { name: "40 - 44", patient: 156 },
                        { name: "45 - 49", patient: 139 },
                        { name: "50 - 54", patient: 127},
                        { name: "55 - 59", patient: 112 },
                        { name: "มากกว่า 60", patient: 132 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 528,
                    gender: [
                        { name: "หญิง", value: 528 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 59 },
                        { name: "20- 24", patient: 47 },
                        { name: "25 - 29", patient: 56 },
                        { name: "30 - 34", patient: 48 },
                        { name: "35 - 39", patient: 56 },
                        { name: "40 - 44", patient: 52 },
                        { name: "45 - 49", patient: 57 },
                        { name: "50 - 54", patient: 49 },
                        { name: "55 - 59", patient: 37 },
                        { name: "มากกว่า 60", patient: 67 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1237, 
                    gender: [
                        { name: "หญิง", value: 631 },
                        { name: "ชาย", value: 606 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 114 },
                        { name: "20- 24", patient: 121 },
                        { name: "25 - 29", patient: 129 },
                        { name: "30 - 34", patient: 129 },
                        { name: "35 - 39", patient: 119 },
                        { name: "40 - 44", patient: 129 },
                        { name: "45 - 49", patient: 107 },
                        { name: "50 - 54", patient: 129 },
                        { name: "55 - 59", patient: 126 },
                        { name: "มากกว่า 60", patient: 135 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1185, 
                    gender: [
                        { name: "หญิง", value: 594 },
                        { name: "ชาย", value: 591 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 110 },
                        { name: "20- 24", patient: 113 },
                        { name: "25 - 29", patient: 133 },
                        { name: "30 - 34", patient: 118 },
                        { name: "35 - 39", patient: 116 },
                        { name: "40 - 44", patient: 128 },
                        { name: "45 - 49", patient: 123 },
                        { name: "50 - 54", patient: 114 },
                        { name: "55 - 59", patient: 102 },
                        { name: "มากกว่า 60", patient: 128 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1154, 
                    gender: [
                        { name: "หญิง", value: 582 },
                        { name: "ชาย", value: 572 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 132 },
                        { name: "20- 24", patient: 95 },
                        { name: "25 - 29", patient: 124 },
                        { name: "30 - 34", patient: 130 },
                        { name: "35 - 39", patient: 110 },
                        { name: "40 - 44", patient: 141 },
                        { name: "45 - 49", patient: 92 },
                        { name: "50 - 54", patient: 107 },
                        { name: "55 - 59", patient: 122 },
                        { name: "มากกว่า 60", patient: 101 }] },]
        },
        {
            index: 7,
            hospital: 'อัจฉริยาคลินิกการแพทย์แผนไทยประยุกต์', 
            patient: 4400, 
            service: 5181,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1138,
                    gender: [
                        { name: "หญิง", value: 613 },
                        { name: "ชาย", value: 525 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 87 },
                        { name: "20- 24", patient: 113 },
                        { name: "25 - 29", patient: 125 },
                        { name: "30 - 34", patient: 139 },
                        { name: "35 - 39", patient: 110 },
                        { name: "40 - 44", patient: 92 },
                        { name: "45 - 49", patient: 130 },
                        { name: "50 - 54", patient: 97},
                        { name: "55 - 59", patient: 117 },
                        { name: "มากกว่า 60", patient: 128 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 526,
                    gender: [
                        { name: "หญิง", value: 526 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 56 },
                        { name: "20- 24", patient: 63 },
                        { name: "25 - 29", patient: 37 },
                        { name: "30 - 34", patient: 73 },
                        { name: "35 - 39", patient: 47 },
                        { name: "40 - 44", patient: 82 },
                        { name: "45 - 49", patient: 45 },
                        { name: "50 - 54", patient: 58 },
                        { name: "55 - 59", patient: 21 },
                        { name: "มากกว่า 60", patient: 44 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1169, 
                    gender: [
                        { name: "หญิง", value: 571 },
                        { name: "ชาย", value: 598 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 127 },
                        { name: "20- 24", patient: 110 },
                        { name: "25 - 29", patient: 94 },
                        { name: "30 - 34", patient: 125 },
                        { name: "35 - 39", patient: 115 },
                        { name: "40 - 44", patient: 116 },
                        { name: "45 - 49", patient: 107 },
                        { name: "50 - 54", patient: 133 },
                        { name: "55 - 59", patient: 110 },
                        { name: "มากกว่า 60", patient: 132 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1168, 
                    gender: [
                        { name: "หญิง", value: 560 },
                        { name: "ชาย", value: 608 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 108 },
                        { name: "20- 24", patient: 117 },
                        { name: "25 - 29", patient: 108 },
                        { name: "30 - 34", patient: 106 },
                        { name: "35 - 39", patient: 112 },
                        { name: "40 - 44", patient: 118 },
                        { name: "45 - 49", patient: 112 },
                        { name: "50 - 54", patient: 116 },
                        { name: "55 - 59", patient: 128 },
                        { name: "มากกว่า 60", patient: 143 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1180, 
                    gender: [
                        { name: "หญิง", value: 589 },
                        { name: "ชาย", value: 591 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 107 },
                        { name: "20- 24", patient: 127 },
                        { name: "25 - 29", patient: 131 },
                        { name: "30 - 34", patient: 129 },
                        { name: "35 - 39", patient: 102 },
                        { name: "40 - 44", patient: 102 },
                        { name: "45 - 49", patient: 124 },
                        { name: "50 - 54", patient: 112 },
                        { name: "55 - 59", patient: 129 },
                        { name: "มากกว่า 60", patient: 117 }] },]
        },
        {
            index: 8,
            hospital: 'โรงพยาบาลกาบเชิง', 
            patient: 5260, 
            service: 5471,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1194,
                    gender: [
                        { name: "หญิง", value: 601 },
                        { name: "ชาย", value: 593 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 110 },
                        { name: "20- 24", patient: 96 },
                        { name: "25 - 29", patient: 96 },
                        { name: "30 - 34", patient: 132 },
                        { name: "35 - 39", patient: 129 },
                        { name: "40 - 44", patient: 114 },
                        { name: "45 - 49", patient: 143 },
                        { name: "50 - 54", patient: 108},
                        { name: "55 - 59", patient: 114 },
                        { name: "มากกว่า 60", patient: 152 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 612,
                    gender: [
                        { name: "หญิง", value: 612 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 51 },
                        { name: "20- 24", patient: 52 },
                        { name: "25 - 29", patient: 59 },
                        { name: "30 - 34", patient: 58 },
                        { name: "35 - 39", patient: 63 },
                        { name: "40 - 44", patient: 76 },
                        { name: "45 - 49", patient: 78 },
                        { name: "50 - 54", patient: 42 },
                        { name: "55 - 59", patient: 73 },
                        { name: "มากกว่า 60", patient: 60 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1201, 
                    gender: [
                        { name: "หญิง", value: 603 },
                        { name: "ชาย", value: 598 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 108 },
                        { name: "20- 24", patient: 130 },
                        { name: "25 - 29", patient: 115 },
                        { name: "30 - 34", patient: 102 },
                        { name: "35 - 39", patient: 134 },
                        { name: "40 - 44", patient: 107 },
                        { name: "45 - 49", patient: 125 },
                        { name: "50 - 54", patient: 125 },
                        { name: "55 - 59", patient: 139 },
                        { name: "มากกว่า 60", patient: 116 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1208, 
                    gender: [
                        { name: "หญิง", value: 590 },
                        { name: "ชาย", value: 618 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 125 },
                        { name: "20- 24", patient: 124 },
                        { name: "25 - 29", patient: 113 },
                        { name: "30 - 34", patient: 115 },
                        { name: "35 - 39", patient: 89 },
                        { name: "40 - 44", patient: 130 },
                        { name: "45 - 49", patient: 134 },
                        { name: "50 - 54", patient: 125 },
                        { name: "55 - 59", patient: 106 },
                        { name: "มากกว่า 60", patient: 147 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1256, 
                    gender: [
                        { name: "หญิง", value: 666 },
                        { name: "ชาย", value: 590 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 127 },
                        { name: "20- 24", patient: 144 },
                        { name: "25 - 29", patient: 133 },
                        { name: "30 - 34", patient: 95 },
                        { name: "35 - 39", patient: 123 },
                        { name: "40 - 44", patient: 116 },
                        { name: "45 - 49", patient: 114 },
                        { name: "50 - 54", patient: 135 },
                        { name: "55 - 59", patient: 143 },
                        { name: "มากกว่า 60", patient: 126 }] },]
        },
        {
            index: 9,
            hospital: 'โรงพยาบาลสำโรงทาบ', 
            patient: 5288, 
            service: 5489,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1162,
                    gender: [
                        { name: "หญิง", value: 592 },
                        { name: "ชาย", value: 570 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 115 },
                        { name: "20- 24", patient: 106 },
                        { name: "25 - 29", patient: 126 },
                        { name: "30 - 34", patient: 116 },
                        { name: "35 - 39", patient: 123 },
                        { name: "40 - 44", patient: 107 },
                        { name: "45 - 49", patient: 97 },
                        { name: "50 - 54", patient: 115},
                        { name: "55 - 59", patient: 121 },
                        { name: "มากกว่า 60", patient: 136 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 680,
                    gender: [
                        { name: "หญิง", value: 680 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 69 },
                        { name: "20- 24", patient: 65 },
                        { name: "25 - 29", patient: 77 },
                        { name: "30 - 34", patient: 65 },
                        { name: "35 - 39", patient: 62 },
                        { name: "40 - 44", patient: 50 },
                        { name: "45 - 49", patient: 59 },
                        { name: "50 - 54", patient: 90 },
                        { name: "55 - 59", patient: 66 },
                        { name: "มากกว่า 60", patient: 77 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1198, 
                    gender: [
                        { name: "หญิง", value: 598 },
                        { name: "ชาย", value: 600 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 139 },
                        { name: "20- 24", patient: 134 },
                        { name: "25 - 29", patient: 113 },
                        { name: "30 - 34", patient: 100 },
                        { name: "35 - 39", patient: 117 },
                        { name: "40 - 44", patient: 114 },
                        { name: "45 - 49", patient: 117 },
                        { name: "50 - 54", patient: 129 },
                        { name: "55 - 59", patient: 105 },
                        { name: "มากกว่า 60", patient: 130 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1212, 
                    gender: [
                        { name: "หญิง", value: 600 },
                        { name: "ชาย", value: 612 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 111 },
                        { name: "20- 24", patient: 121 },
                        { name: "25 - 29", patient: 106 },
                        { name: "30 - 34", patient: 119 },
                        { name: "35 - 39", patient: 115 },
                        { name: "40 - 44", patient: 112 },
                        { name: "45 - 49", patient: 147 },
                        { name: "50 - 54", patient: 134 },
                        { name: "55 - 59", patient: 115 },
                        { name: "มากกว่า 60", patient: 132 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1237, 
                    gender: [
                        { name: "หญิง", value: 615 },
                        { name: "ชาย", value: 622 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 122 },
                        { name: "20- 24", patient: 135 },
                        { name: "25 - 29", patient: 113 },
                        { name: "30 - 34", patient: 114},
                        { name: "35 - 39", patient: 120 },
                        { name: "40 - 44", patient: 117 },
                        { name: "45 - 49", patient: 134 },
                        { name: "50 - 54", patient: 128 },
                        { name: "55 - 59", patient: 122 },
                        { name: "มากกว่า 60", patient: 132 }] },]
        },
        {
            index: 10,
            hospital: 'โรงพยาบาลพระอาจารย์ฝั้น อาจาโร', 
            patient: 5095, 
            service: 5295,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1255,
                    gender: [
                        { name: "หญิง", value: 622 },
                        { name: "ชาย", value: 633 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 141 },
                        { name: "20- 24", patient: 121 },
                        { name: "25 - 29", patient: 114 },
                        { name: "30 - 34", patient: 138 },
                        { name: "35 - 39", patient: 125 },
                        { name: "40 - 44", patient: 103 },
                        { name: "45 - 49", patient: 124},
                        { name: "50 - 54", patient: 118},
                        { name: "55 - 59", patient: 136 },
                        { name: "มากกว่า 60", patient: 135 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 610,
                    gender: [
                        { name: "หญิง", value: 610 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 44 },
                        { name: "20- 24", patient: 65 },
                        { name: "25 - 29", patient: 58 },
                        { name: "30 - 34", patient: 66 },
                        { name: "35 - 39", patient: 67 },
                        { name: "40 - 44", patient: 52 },
                        { name: "45 - 49", patient: 57 },
                        { name: "50 - 54", patient: 60 },
                        { name: "55 - 59", patient: 54 },
                        { name: "มากกว่า 60", patient: 87 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1183, 
                    gender: [
                        { name: "หญิง", value: 563 },
                        { name: "ชาย", value: 620 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 107 },
                        { name: "20- 24", patient: 98 },
                        { name: "25 - 29", patient: 126 },
                        { name: "30 - 34", patient: 126 },
                        { name: "35 - 39", patient: 136 },
                        { name: "40 - 44", patient: 129 },
                        { name: "45 - 49", patient: 96 },
                        { name: "50 - 54", patient: 128 },
                        { name: "55 - 59", patient: 121 },
                        { name: "มากกว่า 60", patient: 116 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1072, 
                    gender: [
                        { name: "หญิง", value: 498 },
                        { name: "ชาย", value: 574 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 103 },
                        { name: "20- 24", patient: 110 },
                        { name: "25 - 29", patient: 95 },
                        { name: "30 - 34", patient: 89 },
                        { name: "35 - 39", patient: 115 },
                        { name: "40 - 44", patient: 105 },
                        { name: "45 - 49", patient: 128 },
                        { name: "50 - 54", patient: 96 },
                        { name: "55 - 59", patient: 114 },
                        { name: "มากกว่า 60", patient: 111 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1175, 
                    gender: [
                        { name: "หญิง", value: 558 },
                        { name: "ชาย", value: 617 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 102 },
                        { name: "20- 24", patient: 106 },
                        { name: "25 - 29", patient: 99 },
                        { name: "30 - 34", patient: 127},
                        { name: "35 - 39", patient: 121 },
                        { name: "40 - 44", patient: 99 },
                        { name: "45 - 49", patient: 125 },
                        { name: "50 - 54", patient: 125 },
                        { name: "55 - 59", patient: 136 },
                        { name: "มากกว่า 60", patient: 135 }] },]
        },
        {
            index: 11,
            hospital: 'โรงพยาบาลโพธาราม', 
            patient: 5113, 
            service: 5325,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1192,
                    gender: [
                        { name: "หญิง", value: 606 },
                        { name: "ชาย", value: 586 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 107 },
                        { name: "20- 24", patient: 117 },
                        { name: "25 - 29", patient: 149 },
                        { name: "30 - 34", patient: 139 },
                        { name: "35 - 39", patient: 128 },
                        { name: "40 - 44", patient: 97 },
                        { name: "45 - 49", patient: 112},
                        { name: "50 - 54", patient: 121},
                        { name: "55 - 59", patient: 103 },
                        { name: "มากกว่า 60", patient: 119 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 584,
                    gender: [
                        { name: "หญิง", value: 584 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 38 },
                        { name: "20- 24", patient: 54 },
                        { name: "25 - 29", patient: 75 },
                        { name: "30 - 34", patient: 64 },
                        { name: "35 - 39", patient: 60 },
                        { name: "40 - 44", patient: 54 },
                        { name: "45 - 49", patient: 49 },
                        { name: "50 - 54", patient: 60 },
                        { name: "55 - 59", patient: 70 },
                        { name: "มากกว่า 60", patient: 60 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1160, 
                    gender: [
                        { name: "หญิง", value: 605 },
                        { name: "ชาย", value: 555 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 109 },
                        { name: "20- 24", patient: 123 },
                        { name: "25 - 29", patient: 138 },
                        { name: "30 - 34", patient: 98 },
                        { name: "35 - 39", patient: 106 },
                        { name: "40 - 44", patient: 123 },
                        { name: "45 - 49", patient: 111 },
                        { name: "50 - 54", patient: 103 },
                        { name: "55 - 59", patient: 134 },
                        { name: "มากกว่า 60", patient: 115 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1203, 
                    gender: [
                        { name: "หญิง", value: 613 },
                        { name: "ชาย", value: 590 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 144 },
                        { name: "20- 24", patient: 141 },
                        { name: "25 - 29", patient: 110 },
                        { name: "30 - 34", patient: 104 },
                        { name: "35 - 39", patient: 106 },
                        { name: "40 - 44", patient: 104 },
                        { name: "45 - 49", patient: 119 },
                        { name: "50 - 54", patient: 143 },
                        { name: "55 - 59", patient: 111 },
                        { name: "มากกว่า 60", patient: 121 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1186, 
                    gender: [
                        { name: "หญิง", value: 605 },
                        { name: "ชาย", value: 581 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 108 },
                        { name: "20- 24", patient: 115 },
                        { name: "25 - 29", patient: 113 },
                        { name: "30 - 34", patient: 133 },
                        { name: "35 - 39", patient: 135 },
                        { name: "40 - 44", patient: 117 },
                        { name: "45 - 49", patient: 106 },
                        { name: "50 - 54", patient: 110 },
                        { name: "55 - 59", patient: 133 },
                        { name: "มากกว่า 60", patient: 116 }] },]
        },
        {
            index: 12,
            hospital: 'โรงพยาบาลท่าโรงช้าง', 
            patient: 5296, 
            service: 5514,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1239,
                    gender: [
                        { name: "หญิง", value: 605 },
                        { name: "ชาย", value: 634 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 110 },
                        { name: "20- 24", patient: 127 },
                        { name: "25 - 29", patient: 134 },
                        { name: "30 - 34", patient: 114 },
                        { name: "35 - 39", patient: 126 },
                        { name: "40 - 44", patient: 113 },
                        { name: "45 - 49", patient: 141},
                        { name: "50 - 54", patient: 113},
                        { name: "55 - 59", patient: 115 },
                        { name: "มากกว่า 60", patient: 146 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 634,
                    gender: [
                        { name: "หญิง", value: 634 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 76 },
                        { name: "20- 24", patient: 69 },
                        { name: "25 - 29", patient: 58 },
                        { name: "30 - 34", patient: 66 },
                        { name: "35 - 39", patient: 54 },
                        { name: "40 - 44", patient: 68 },
                        { name: "45 - 49", patient: 57 },
                        { name: "50 - 54", patient: 52 },
                        { name: "55 - 59", patient: 66 },
                        { name: "มากกว่า 60", patient: 68 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1193, 
                    gender: [
                        { name: "หญิง", value: 631 },
                        { name: "ชาย", value: 562 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 106 },
                        { name: "20- 24", patient: 124 },
                        { name: "25 - 29", patient: 103 },
                        { name: "30 - 34", patient: 137 },
                        { name: "35 - 39", patient: 128 },
                        { name: "40 - 44", patient: 136 },
                        { name: "45 - 49", patient: 125 },
                        { name: "50 - 54", patient: 111 },
                        { name: "55 - 59", patient: 113 },
                        { name: "มากกว่า 60", patient: 110 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1233, 
                    gender: [
                        { name: "หญิง", value: 624 },
                        { name: "ชาย", value: 609 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 115 },
                        { name: "20- 24", patient: 133 },
                        { name: "25 - 29", patient: 137 },
                        { name: "30 - 34", patient: 111 },
                        { name: "35 - 39", patient: 133 },
                        { name: "40 - 44", patient: 124 },
                        { name: "45 - 49", patient: 116 },
                        { name: "50 - 54", patient: 118 },
                        { name: "55 - 59", patient: 114 },
                        { name: "มากกว่า 60", patient: 132 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1215, 
                    gender: [
                        { name: "หญิง", value: 586 },
                        { name: "ชาย", value: 629 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 137 },
                        { name: "20- 24", patient: 139 },
                        { name: "25 - 29", patient: 118 },
                        { name: "30 - 34", patient: 123 },
                        { name: "35 - 39", patient: 103 },
                        { name: "40 - 44", patient: 119 },
                        { name: "45 - 49", patient: 109 },
                        { name: "50 - 54", patient: 127 },
                        { name: "55 - 59", patient: 128 },
                        { name: "มากกว่า 60", patient: 112 }] },]
        },
        {
            index: 13,
            hospital: 'คลินิกการแพทย์แผนไทยเนตรดาว', 
            patient: 5288, 
            service: 5510,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1269,
                    gender: [
                        { name: "หญิง", value: 606 },
                        { name: "ชาย", value: 663 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 128 },
                        { name: "20- 24", patient: 122 },
                        { name: "25 - 29", patient: 107 },
                        { name: "30 - 34", patient: 138 },
                        { name: "35 - 39", patient: 115 },
                        { name: "40 - 44", patient: 115 },
                        { name: "45 - 49", patient: 131},
                        { name: "50 - 54", patient: 145},
                        { name: "55 - 59", patient: 134 },
                        { name: "มากกว่า 60", patient: 134 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 614,
                    gender: [
                        { name: "หญิง", value: 614 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 81 },
                        { name: "20- 24", patient: 64 },
                        { name: "25 - 29", patient: 73 },
                        { name: "30 - 34", patient: 69 },
                        { name: "35 - 39", patient: 42 },
                        { name: "40 - 44", patient: 50 },
                        { name: "45 - 49", patient: 49 },
                        { name: "50 - 54", patient: 57 },
                        { name: "55 - 59", patient: 61 },
                        { name: "มากกว่า 60", patient: 68 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1296, 
                    gender: [
                        { name: "หญิง", value: 648 },
                        { name: "ชาย", value: 648 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 127 },
                        { name: "20- 24", patient: 125 },
                        { name: "25 - 29", patient: 145 },
                        { name: "30 - 34", patient: 133 },
                        { name: "35 - 39", patient: 141 },
                        { name: "40 - 44", patient: 123 },
                        { name: "45 - 49", patient: 138 },
                        { name: "50 - 54", patient: 120 },
                        { name: "55 - 59", patient: 141 },
                        { name: "มากกว่า 60", patient: 103 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1134, 
                    gender: [
                        { name: "หญิง", value: 539 },
                        { name: "ชาย", value: 595 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 141 },
                        { name: "20- 24", patient: 97 },
                        { name: "25 - 29", patient: 129 },
                        { name: "30 - 34", patient: 107 },
                        { name: "35 - 39", patient: 105 },
                        { name: "40 - 44", patient: 122 },
                        { name: "45 - 49", patient: 93 },
                        { name: "50 - 54", patient: 128 },
                        { name: "55 - 59", patient: 106 },
                        { name: "มากกว่า 60", patient: 106 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1197, 
                    gender: [
                        { name: "หญิง", value: 583 },
                        { name: "ชาย", value: 614 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 113 },
                        { name: "20- 24", patient: 128 },
                        { name: "25 - 29", patient: 118 },
                        { name: "30 - 34", patient: 117 },
                        { name: "35 - 39", patient: 96 },
                        { name: "40 - 44", patient: 136 },
                        { name: "45 - 49", patient: 124 },
                        { name: "50 - 54", patient: 124 },
                        { name: "55 - 59", patient: 128 },
                        { name: "มากกว่า 60", patient: 113 }] },]
        },
        {
            index: 14,
            hospital: 'ทรงกลด สหคลินิก', 
            patient: 5197, 
            service: 5450,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1194,
                    gender: [
                        { name: "หญิง", value: 566 },
                        { name: "ชาย", value: 628 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 119 },
                        { name: "20- 24", patient: 106 },
                        { name: "25 - 29", patient: 98 },
                        { name: "30 - 34", patient: 126 },
                        { name: "35 - 39", patient: 139 },
                        { name: "40 - 44", patient: 121 },
                        { name: "45 - 49", patient: 143},
                        { name: "50 - 54", patient: 155},
                        { name: "55 - 59", patient: 82 },
                        { name: "มากกว่า 60", patient: 105 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 535,
                    gender: [
                        { name: "หญิง", value: 535 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 51 },
                        { name: "20- 24", patient: 43 },
                        { name: "25 - 29", patient: 47 },
                        { name: "30 - 34", patient: 59 },
                        { name: "35 - 39", patient: 56 },
                        { name: "40 - 44", patient: 59 },
                        { name: "45 - 49", patient: 53 },
                        { name: "50 - 54", patient: 58 },
                        { name: "55 - 59", patient: 64 },
                        { name: "มากกว่า 60", patient: 45 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1255, 
                    gender: [
                        { name: "หญิง", value: 614 },
                        { name: "ชาย", value: 641 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 152 },
                        { name: "20- 24", patient: 136 },
                        { name: "25 - 29", patient: 122 },
                        { name: "30 - 34", patient: 129 },
                        { name: "35 - 39", patient: 129 },
                        { name: "40 - 44", patient: 116 },
                        { name: "45 - 49", patient: 121 },
                        { name: "50 - 54", patient: 108 },
                        { name: "55 - 59", patient: 110 },
                        { name: "มากกว่า 60", patient: 132 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1255, 
                    gender: [
                        { name: "หญิง", value: 576 },
                        { name: "ชาย", value: 679 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 109 },
                        { name: "20- 24", patient: 110 },
                        { name: "25 - 29", patient: 118 },
                        { name: "30 - 34", patient: 132 },
                        { name: "35 - 39", patient: 124 },
                        { name: "40 - 44", patient: 123 },
                        { name: "45 - 49", patient: 144},
                        { name: "50 - 54", patient: 152 },
                        { name: "55 - 59", patient: 115 },
                        { name: "มากกว่า 60", patient: 128 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1211, 
                    gender: [
                        { name: "หญิง", value: 597 },
                        { name: "ชาย", value: 614 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 116 },
                        { name: "20- 24", patient: 124 },
                        { name: "25 - 29", patient: 123 },
                        { name: "30 - 34", patient: 107 },
                        { name: "35 - 39", patient: 133},
                        { name: "40 - 44", patient: 120 },
                        { name: "45 - 49", patient: 119 },
                        { name: "50 - 54", patient: 126 },
                        { name: "55 - 59", patient: 108 },
                        { name: "มากกว่า 60", patient: 135 }] },]
        },
        {
            index: 15,
            hospital: 'หมออรสา คลินิกการแพทย์แผนไทยประยุกต์', 
            patient: 5323, 
            service: 5522,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1215,
                    gender: [
                        { name: "หญิง", value: 567 },
                        { name: "ชาย", value: 648 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 138 },
                        { name: "20- 24", patient: 135 },
                        { name: "25 - 29", patient: 115 },
                        { name: "30 - 34", patient: 112 },
                        { name: "35 - 39", patient: 113 },
                        { name: "40 - 44", patient: 124 },
                        { name: "45 - 49", patient: 131},
                        { name: "50 - 54", patient: 113},
                        { name: "55 - 59", patient: 109 },
                        { name: "มากกว่า 60", patient: 125 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 623,
                    gender: [
                        { name: "หญิง", value: 623 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 64 },
                        { name: "20- 24", patient: 49 },
                        { name: "25 - 29", patient: 61 },
                        { name: "30 - 34", patient: 77 },
                        { name: "35 - 39", patient: 70 },
                        { name: "40 - 44", patient: 54 },
                        { name: "45 - 49", patient: 56 },
                        { name: "50 - 54", patient: 61 },
                        { name: "55 - 59", patient: 57 },
                        { name: "มากกว่า 60", patient: 74 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1221, 
                    gender: [
                        { name: "หญิง", value: 585 },
                        { name: "ชาย", value: 636 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 121 },
                        { name: "20- 24", patient: 115 },
                        { name: "25 - 29", patient: 142 },
                        { name: "30 - 34", patient: 116 },
                        { name: "35 - 39", patient: 139 },
                        { name: "40 - 44", patient: 128 },
                        { name: "45 - 49", patient: 107 },
                        { name: "50 - 54", patient: 125 },
                        { name: "55 - 59", patient: 120 },
                        { name: "มากกว่า 60", patient: 108 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1181, 
                    gender: [
                        { name: "หญิง", value: 588 },
                        { name: "ชาย", value: 593 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 89 },
                        { name: "20- 24", patient: 129 },
                        { name: "25 - 29", patient: 135},
                        { name: "30 - 34", patient: 112 },
                        { name: "35 - 39", patient: 123 },
                        { name: "40 - 44", patient: 128 },
                        { name: "45 - 49", patient: 124},
                        { name: "50 - 54", patient: 120 },
                        { name: "55 - 59", patient: 117 },
                        { name: "มากกว่า 60", patient: 108 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1282, 
                    gender: [
                        { name: "หญิง", value: 649 },
                        { name: "ชาย", value: 633 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 132 },
                        { name: "20- 24", patient: 135 },
                        { name: "25 - 29", patient: 144 },
                        { name: "30 - 34", patient: 147 },
                        { name: "35 - 39", patient: 111},
                        { name: "40 - 44", patient: 138 },
                        { name: "45 - 49", patient: 114 },
                        { name: "50 - 54", patient: 112 },
                        { name: "55 - 59", patient: 116 },
                        { name: "มากกว่า 60", patient: 133 }] },]
        },
        {
            index: 16,
            hospital: 'ภัทรภาสคลินิกการแพทย์แผนไทยประยุกต์', 
            patient: 5213, 
            service: 5427,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1176,
                    gender: [
                        { name: "หญิง", value: 600 },
                        { name: "ชาย", value: 576 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 113 },
                        { name: "20- 24", patient: 120 },
                        { name: "25 - 29", patient: 104 },
                        { name: "30 - 34", patient: 107 },
                        { name: "35 - 39", patient: 107 },
                        { name: "40 - 44", patient: 115 },
                        { name: "45 - 49", patient: 109},
                        { name: "50 - 54", patient: 118},
                        { name: "55 - 59", patient: 137 },
                        { name: "มากกว่า 60", patient: 146 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 656,
                    gender: [
                        { name: "หญิง", value: 656 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 76 },
                        { name: "20- 24", patient: 61 },
                        { name: "25 - 29", patient: 81 },
                        { name: "30 - 34", patient: 63 },
                        { name: "35 - 39", patient: 70 },
                        { name: "40 - 44", patient: 62 },
                        { name: "45 - 49", patient: 63 },
                        { name: "50 - 54", patient: 65 },
                        { name: "55 - 59", patient: 58 },
                        { name: "มากกว่า 60", patient: 57 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1182, 
                    gender: [
                        { name: "หญิง", value: 597 },
                        { name: "ชาย", value: 585 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 132 },
                        { name: "20- 24", patient: 121 },
                        { name: "25 - 29", patient: 89 },
                        { name: "30 - 34", patient: 136 },
                        { name: "35 - 39", patient: 116 },
                        { name: "40 - 44", patient: 133 },
                        { name: "45 - 49", patient: 87 },
                        { name: "50 - 54", patient: 127 },
                        { name: "55 - 59", patient: 111 },
                        { name: "มากกว่า 60", patient: 130 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1197, 
                    gender: [
                        { name: "หญิง", value: 602 },
                        { name: "ชาย", value: 595 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 102 },
                        { name: "20- 24", patient: 140 },
                        { name: "25 - 29", patient: 105},
                        { name: "30 - 34", patient: 120 },
                        { name: "35 - 39", patient: 136 },
                        { name: "40 - 44", patient: 136 },
                        { name: "45 - 49", patient: 107},
                        { name: "50 - 54", patient: 98 },
                        { name: "55 - 59", patient: 133 },
                        { name: "มากกว่า 60", patient: 120 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1216, 
                    gender: [
                        { name: "หญิง", value: 634 },
                        { name: "ชาย", value: 582 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 107 },
                        { name: "20- 24", patient: 122 },
                        { name: "25 - 29", patient: 117 },
                        { name: "30 - 34", patient: 117 },
                        { name: "35 - 39", patient: 121},
                        { name: "40 - 44", patient: 141 },
                        { name: "45 - 49", patient: 115 },
                        { name: "50 - 54", patient: 125 },
                        { name: "55 - 59", patient: 124 },
                        { name: "มากกว่า 60", patient: 127 }] },]
        },
        {
            index: 17,
            hospital: 'โรงพยาบาลสุทธาเวช คณะแพทยศาสตร์ มหาวิทยาลัยมหาสารคาม', 
            patient: 5241, 
            service: 5455,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1201,
                    gender: [
                        { name: "หญิง", value: 577 },
                        { name: "ชาย", value: 644 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 105 },
                        { name: "20- 24", patient: 114 },
                        { name: "25 - 29", patient: 108 },
                        { name: "30 - 34", patient: 148 },
                        { name: "35 - 39", patient: 104 },
                        { name: "40 - 44", patient: 125 },
                        { name: "45 - 49", patient: 123},
                        { name: "50 - 54", patient: 133},
                        { name: "55 - 59", patient: 119 },
                        { name: "มากกว่า 60", patient: 142 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 588,
                    gender: [
                        { name: "หญิง", value: 588 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 50 },
                        { name: "20- 24", patient: 65 },
                        { name: "25 - 29", patient: 48 },
                        { name: "30 - 34", patient: 61 },
                        { name: "35 - 39", patient: 50 },
                        { name: "40 - 44", patient: 82 },
                        { name: "45 - 49", patient: 55 },
                        { name: "50 - 54", patient: 56 },
                        { name: "55 - 59", patient: 63 },
                        { name: "มากกว่า 60", patient: 58 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1268, 
                    gender: [
                        { name: "หญิง", value: 637 },
                        { name: "ชาย", value: 631 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 116 },
                        { name: "20- 24", patient: 144 },
                        { name: "25 - 29", patient: 143 },
                        { name: "30 - 34", patient: 119 },
                        { name: "35 - 39", patient: 96 },
                        { name: "40 - 44", patient: 123 },
                        { name: "45 - 49", patient: 128 },
                        { name: "50 - 54", patient: 140 },
                        { name: "55 - 59", patient: 121 },
                        { name: "มากกว่า 60", patient: 138 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1208, 
                    gender: [
                        { name: "หญิง", value: 584 },
                        { name: "ชาย", value: 624 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 145 },
                        { name: "20- 24", patient: 109 },
                        { name: "25 - 29", patient: 112},
                        { name: "30 - 34", patient: 113 },
                        { name: "35 - 39", patient: 128 },
                        { name: "40 - 44", patient: 137 },
                        { name: "45 - 49", patient: 125},
                        { name: "50 - 54", patient: 117 },
                        { name: "55 - 59", patient: 117 },
                        { name: "มากกว่า 60", patient: 105 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1170, 
                    gender: [
                        { name: "หญิง", value: 603 },
                        { name: "ชาย", value: 567 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 112 },
                        { name: "20- 24", patient: 115 },
                        { name: "25 - 29", patient: 121 },
                        { name: "30 - 34", patient: 125 },
                        { name: "35 - 39", patient: 117},
                        { name: "40 - 44", patient: 130 },
                        { name: "45 - 49", patient: 105 },
                        { name: "50 - 54", patient: 109 },
                        { name: "55 - 59", patient: 126 },
                        { name: "มากกว่า 60", patient: 110 }] },]
        },
    ],
    2566:[
        {   
            index: 1,
            hospital: 'โรงพยาบาลการแพทย์แผนไทยและการแพทย์ผสมผสาน', 
            patient: 5225, 
            service: 5437, 
            diseases: [
                { name: "กลุ่มไข้หวัดน้อย", value: 1200,
                    gender: [
                        { name: "หญิง", value: 611 },
                        { name: "ชาย", value: 589 },
                    ], 
                    age: [
                        { name: "น้อยกว่า 20", patient: 119 },
                        { name: "20- 24", patient: 136 },
                        { name: "25 - 29", patient: 122 },
                        { name: "30 - 34", patient: 121 },
                        { name: "35 - 39", patient: 110 },
                        { name: "40 - 44", patient: 106 },
                        { name: "45 - 49", patient: 116 },
                        { name: "50 - 54", patient: 142},
                        { name: "55 - 59", patient: 116 },
                        { name: "มากกว่า 60", patient: 112 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 597, 
                    gender: [
                        { name: "หญิง", value: 597 },
                        { name: "ชาย", value: 0 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 46 },
                        { name: "20- 24", patient: 54 },
                        { name: "25 - 29", patient: 42 },
                        { name: "30 - 34", patient: 64 },
                        { name: "35 - 39", patient: 63 },
                        { name: "40 - 44", patient: 47 },
                        { name: "45 - 49", patient: 66 },
                        { name: "50 - 54", patient: 57 },
                        { name: "55 - 59", patient: 71 },
                        { name: "มากกว่า 60", patient: 87 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1211,
                    gender: [
                        { name: "หญิง", value: 567 },
                        { name: "ชาย", value: 644 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 127 },
                        { name: "20- 24", patient: 131 },
                        { name: "25 - 29", patient: 123 },
                        { name: "30 - 34", patient: 135 },
                        { name: "35 - 39", patient: 133},
                        { name: "40 - 44", patient: 114 },
                        { name: "45 - 49", patient: 115 },
                        { name: "50 - 54", patient: 111 },
                        { name: "55 - 59", patient: 129},
                        { name: "มากกว่า 60", patient: 93 }] },
                { name: "กลุ่มอาการผดผื่น", value: 1233,
                    gender: [
                        { name: "หญิง", value: 627 },
                        { name: "ชาย", value: 606 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 127 },
                        { name: "20- 24", patient: 128 },
                        { name: "25 - 29", patient: 143 },
                        { name: "30 - 34", patient: 148 },
                        { name: "35 - 39", patient: 120 },
                        { name: "40 - 44", patient: 114 },
                        { name: "45 - 49", patient: 86 },
                        { name: "50 - 54", patient: 99 },
                        { name: "55 - 59", patient: 128 },
                        { name: "มากกว่า 60", patient: 140 }] },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1196,
                    gender: [
                        { name: "หญิง", value: 596 },
                        { name: "ชาย", value: 600 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 134 },
                        { name: "20- 24", patient: 105 },
                        { name: "25 - 29", patient: 108 },
                        { name: "30 - 34", patient: 121 },
                        { name: "35 - 39", patient: 121 },
                        { name: "40 - 44", patient: 135 },
                        { name: "45 - 49", patient: 99 },
                        { name: "50 - 54", patient: 135 },
                        { name: "55 - 59", patient: 123 },
                        { name: "มากกว่า 60", patient: 115 }] }
                ]
        },
        {
            index: 2,
            hospital: 'โรงพยาบาลลาดบัวหลวง', 
            patient: 5258, 
            service: 5472,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1242,
                    gender: [
                        { name: "หญิง", value: 629 },
                        { name: "ชาย", value: 613 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 104 },
                        { name: "20- 24", patient: 114 },
                        { name: "25 - 29", patient: 131 },
                        { name: "30 - 34", patient: 159 },
                        { name: "35 - 39", patient: 116 },
                        { name: "40 - 44", patient: 96 },
                        { name: "45 - 49", patient: 113 },
                        { name: "50 - 54", patient: 97 },
                        { name: "55 - 59", patient: 140 },
                        { name: "มากกว่า 60", patient: 172 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 616,
                    gender: [
                        { name: "หญิง", value: 616 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 68 },
                        { name: "20- 24", patient: 63 },
                        { name: "25 - 29", patient: 54 },
                        { name: "30 - 34", patient: 32 },
                        { name: "35 - 39", patient: 71 },
                        { name: "40 - 44", patient: 70 },
                        { name: "45 - 49", patient: 54 },
                        { name: "50 - 54", patient: 64 },
                        { name: "55 - 59", patient: 50 },
                        { name: "มากกว่า 60", patient: 70 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1272, 
                    gender: [
                        { name: "หญิง", value: 607 },
                        { name: "ชาย", value: 665 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 132 },
                        { name: "20- 24", patient: 121    },
                        { name: "25 - 29", patient: 130 },
                        { name: "30 - 34", patient: 114 },
                        { name: "35 - 39", patient: 111 },
                        { name: "40 - 44", patient: 139 },
                        { name: "45 - 49", patient: 1119 },
                        { name: "50 - 54", patient: 133},
                        { name: "55 - 59", patient: 122 },
                        { name: "มากกว่า 60", patient: 151 }] },
                { name: "กลุ่มอาการผดผื่น", value: 1230, 
                    gender: [
                        { name: "หญิง", value: 548 },
                        { name: "ชาย", value: 682 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 125 },
                        { name: "20- 24", patient: 120 },
                        { name: "25 - 29", patient: 122 },
                        { name: "30 - 34", patient: 115 },
                        { name: "35 - 39", patient: 102 },
                        { name: "40 - 44", patient: 126 },
                        { name: "45 - 49", patient: 139 },
                        { name: "50 - 54", patient: 145 },
                        { name: "55 - 59", patient: 121 },
                        { name: "มากกว่า 60", patient: 115 }] },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1112, 
                    gender: [
                        { name: "หญิง", value: 520 },
                        { name: "ชาย", value: 592 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 97 },
                        { name: "20- 24", patient: 110 },
                        { name: "25 - 29", patient: 85 },
                        { name: "30 - 34", patient: 138 },
                        { name: "35 - 39", patient: 96 },
                        { name: "40 - 44", patient: 111 },
                        { name: "45 - 49", patient: 115 },
                        { name: "50 - 54", patient: 131 },
                        { name: "55 - 59", patient: 119 },
                        { name: "มากกว่า 60", patient: 107 }] },]
        },
        {
            index: 3,
            hospital: 'โรงพยาบาลเสนา', 
            patient: 5154, 
            service: 5357,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1195,
                    gender: [
                        { name: "หญิง", value: 563 },
                        { name: "ชาย", value: 632 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 128 },
                        { name: "20- 24", patient: 88 },
                        { name: "25 - 29", patient: 130 },
                        { name: "30 - 34", patient: 108 },
                        { name: "35 - 39", patient: 149 },
                        { name: "40 - 44", patient: 107 },
                        { name: "45 - 49", patient: 110 },
                        { name: "50 - 54", patient: 120},
                        { name: "55 - 59", patient: 125 },
                        { name: "มากกว่า 60", patient: 130 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 641,
                    gender: [
                        { name: "หญิง", value: 641 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 73 },
                        { name: "20- 24", patient: 68 },
                        { name: "25 - 29", patient: 66 },
                        { name: "30 - 34", patient: 87 },
                        { name: "35 - 39", patient: 59 },
                        { name: "40 - 44", patient: 43 },
                        { name: "45 - 49", patient: 71 },
                        { name: "50 - 54", patient: 57 },
                        { name: "55 - 59", patient: 63 },
                        { name: "มากกว่า 60", patient: 54 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1172, 
                    gender: [
                        { name: "หญิง", value: 608 },
                        { name: "ชาย", value: 564 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 122 },
                        { name: "20- 24", patient: 130 },
                        { name: "25 - 29", patient: 100 },
                        { name: "30 - 34", patient: 111 },
                        { name: "35 - 39", patient: 95 },
                        { name: "40 - 44", patient: 115 },
                        { name: "45 - 49", patient: 116 },
                        { name: "50 - 54", patient: 114 },
                        { name: "55 - 59", patient: 138 },
                        { name: "มากกว่า 60", patient: 131 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1167, 
                    gender: [
                        { name: "หญิง", value: 588 },
                        { name: "ชาย", value: 579 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 144 },
                        { name: "20- 24", patient: 91 },
                        { name: "25 - 29", patient: 122 },
                        { name: "30 - 34", patient: 120 },
                        { name: "35 - 39", patient: 124 },
                        { name: "40 - 44", patient: 113 },
                        { name: "45 - 49", patient: 110 },
                        { name: "50 - 54", patient: 104 },
                        { name: "55 - 59", patient: 120 },
                        { name: "มากกว่า 60", patient:  119}] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1182, 
                    gender: [
                        { name: "หญิง", value: 590 },
                        { name: "ชาย", value: 592 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 131 },
                        { name: "20- 24", patient: 128 },
                        { name: "25 - 29", patient: 117 },
                        { name: "30 - 34", patient: 114 },
                        { name: "35 - 39", patient: 111 },
                        { name: "40 - 44", patient: 104 },
                        { name: "45 - 49", patient: 118 },
                        { name: "50 - 54", patient: 113 },
                        { name: "55 - 59", patient: 129 },
                        { name: "มากกว่า 60", patient: 117 }] },]
        },
        {
            index: 4,
            hospital: 'โรงพยาบาลบางปะอิน', 
            patient: 5038, 
            service: 4673,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1224,
                    gender: [
                        { name: "หญิง", value: 635 },
                        { name: "ชาย", value: 589 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 121 },
                        { name: "20- 24", patient: 111 },
                        { name: "25 - 29", patient: 133 },
                        { name: "30 - 34", patient: 141 },
                        { name: "35 - 39", patient: 116 },
                        { name: "40 - 44", patient: 93 },
                        { name: "45 - 49", patient: 123 },
                        { name: "50 - 54", patient: 143},
                        { name: "55 - 59", patient: 117 },
                        { name: "มากกว่า 60", patient: 126 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 582,
                    gender: [
                        { name: "หญิง", value: 582 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 45 },
                        { name: "20- 24", patient: 46 },
                        { name: "25 - 29", patient: 68 },
                        { name: "30 - 34", patient: 44 },
                        { name: "35 - 39", patient: 57 },
                        { name: "40 - 44", patient: 73 },
                        { name: "45 - 49", patient: 64 },
                        { name: "50 - 54", patient: 66 },
                        { name: "55 - 59", patient: 47 },
                        { name: "มากกว่า 60", patient: 72 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1071, 
                    gender: [
                        { name: "หญิง", value: 543 },
                        { name: "ชาย", value: 528 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 99 },
                        { name: "20- 24", patient: 94 },
                        { name: "25 - 29", patient: 105 },
                        { name: "30 - 34", patient: 103 },
                        { name: "35 - 39", patient: 96 },
                        { name: "40 - 44", patient: 88 },
                        { name: "45 - 49", patient: 120 },
                        { name: "50 - 54", patient: 127 },
                        { name: "55 - 59", patient: 111 },
                        { name: "มากกว่า 60", patient: 128 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1224, 
                    gender: [
                        { name: "หญิง", value: 615 },
                        { name: "ชาย", value: 609 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 97 },
                        { name: "20- 24", patient: 118 },
                        { name: "25 - 29", patient: 141 },
                        { name: "30 - 34", patient: 140 },
                        { name: "35 - 39", patient: 130 },
                        { name: "40 - 44", patient: 127 },
                        { name: "45 - 49", patient: 117 },
                        { name: "50 - 54", patient: 109 },
                        { name: "55 - 59", patient: 126 },
                        { name: "มากกว่า 60", patient: 119 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1154, 
                    gender: [
                        { name: "หญิง", value: 558 },
                        { name: "ชาย", value: 596 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 107 },
                        { name: "20- 24", patient: 122 },
                        { name: "25 - 29", patient: 111 },
                        { name: "30 - 34", patient: 132 },
                        { name: "35 - 39", patient: 131 },
                        { name: "40 - 44", patient: 115 },
                        { name: "45 - 49", patient: 89 },
                        { name: "50 - 54", patient: 113 },
                        { name: "55 - 59", patient: 108 },
                        { name: "มากกว่า 60", patient: 1023 }] },]
        },
        {
            index: 5,
            hospital: 'โรงพยาบาลบางซ้าย', 
            patient: 5155, 
            service: 5369,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1165,
                    gender: [
                        { name: "หญิง", value: 587 },
                        { name: "ชาย", value: 578 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 108 },
                        { name: "20- 24", patient: 102 },
                        { name: "25 - 29", patient: 127 },
                        { name: "30 - 34", patient: 94 },
                        { name: "35 - 39", patient: 123 },
                        { name: "40 - 44", patient: 125 },
                        { name: "45 - 49", patient: 128 },
                        { name: "50 - 54", patient: 125},
                        { name: "55 - 59", patient: 106 },
                        { name: "มากกว่า 60", patient: 127 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 630,
                    gender: [
                        { name: "หญิง", value: 630 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 65 },
                        { name: "20- 24", patient: 82 },
                        { name: "25 - 29", patient: 69 },
                        { name: "30 - 34", patient: 68 },
                        { name: "35 - 39", patient: 51 },
                        { name: "40 - 44", patient: 48 },
                        { name: "45 - 49", patient: 58 },
                        { name: "50 - 54", patient: 75 },
                        { name: "55 - 59", patient: 62 },
                        { name: "มากกว่า 60", patient: 52 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1240, 
                    gender: [
                        { name: "หญิง", value: 620 },
                        { name: "ชาย", value: 620 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 107 },
                        { name: "20- 24", patient: 134 },
                        { name: "25 - 29", patient: 107 },
                        { name: "30 - 34", patient: 158 },
                        { name: "35 - 39", patient: 140 },
                        { name: "40 - 44", patient: 134 },
                        { name: "45 - 49", patient: 107 },
                        { name: "50 - 54", patient: 114 },
                        { name: "55 - 59", patient: 122 },
                        { name: "มากกว่า 60", patient: 117 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1185, 
                    gender: [
                        { name: "หญิง", value: 588 },
                        { name: "ชาย", value: 597 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 132 },
                        { name: "20- 24", patient: 118 },
                        { name: "25 - 29", patient: 119 },
                        { name: "30 - 34", patient: 127 },
                        { name: "35 - 39", patient: 122 },
                        { name: "40 - 44", patient: 113 },
                        { name: "45 - 49", patient: 109 },
                        { name: "50 - 54", patient: 113 },
                        { name: "55 - 59", patient: 101 },
                        { name: "มากกว่า 60", patient: 131 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1149, 
                    gender: [
                        { name: "หญิง", value: 604 },
                        { name: "ชาย", value: 545 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 130 },
                        { name: "20- 24", patient: 122 },
                        { name: "25 - 29", patient: 111 },
                        { name: "30 - 34", patient: 130 },
                        { name: "35 - 39", patient: 106 },
                        { name: "40 - 44", patient: 101 },
                        { name: "45 - 49", patient: 143 },
                        { name: "50 - 54", patient: 96 },
                        { name: "55 - 59", patient: 108 },
                        { name: "มากกว่า 60", patient: 102 }] },]
        },
        {
            index: 6,
            hospital: 'โรงพยาบาลโคกสำโรง', 
            patient: 5069, 
            service: 5288,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1182,
                    gender: [
                        { name: "หญิง", value: 568 },
                        { name: "ชาย", value: 614 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 140 },
                        { name: "20- 24", patient: 112 },
                        { name: "25 - 29", patient: 131 },
                        { name: "30 - 34", patient: 100 },
                        { name: "35 - 39", patient: 117 },
                        { name: "40 - 44", patient: 138 },
                        { name: "45 - 49", patient: 111 },
                        { name: "50 - 54", patient: 95},
                        { name: "55 - 59", patient: 120 },
                        { name: "มากกว่า 60", patient: 118 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 589,
                    gender: [
                        { name: "หญิง", value: 589 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 66 },
                        { name: "20- 24", patient: 72 },
                        { name: "25 - 29", patient: 60 },
                        { name: "30 - 34", patient: 66 },
                        { name: "35 - 39", patient: 36 },
                        { name: "40 - 44", patient: 69 },
                        { name: "45 - 49", patient: 56 },
                        { name: "50 - 54", patient: 64 },
                        { name: "55 - 59", patient: 39 },
                        { name: "มากกว่า 60", patient: 61 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1212, 
                    gender: [
                        { name: "หญิง", value: 578 },
                        { name: "ชาย", value: 634 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 115 },
                        { name: "20- 24", patient: 127 },
                        { name: "25 - 29", patient: 138 },
                        { name: "30 - 34", patient: 125 },
                        { name: "35 - 39", patient: 93 },
                        { name: "40 - 44", patient: 122 },
                        { name: "45 - 49", patient: 137 },
                        { name: "50 - 54", patient: 111 },
                        { name: "55 - 59", patient: 121 },
                        { name: "มากกว่า 60", patient: 123 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1119, 
                    gender: [
                        { name: "หญิง", value: 579 },
                        { name: "ชาย", value: 540 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 127 },
                        { name: "20- 24", patient: 119 },
                        { name: "25 - 29", patient: 132 },
                        { name: "30 - 34", patient: 102 },
                        { name: "35 - 39", patient: 100 },
                        { name: "40 - 44", patient: 102 },
                        { name: "45 - 49", patient: 116 },
                        { name: "50 - 54", patient: 106 },
                        { name: "55 - 59", patient: 101 },
                        { name: "มากกว่า 60", patient: 114 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1186, 
                    gender: [
                        { name: "หญิง", value: 580 },
                        { name: "ชาย", value: 606 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 123 },
                        { name: "20- 24", patient: 122 },
                        { name: "25 - 29", patient: 107 },
                        { name: "30 - 34", patient: 130 },
                        { name: "35 - 39", patient: 123 },
                        { name: "40 - 44", patient: 115 },
                        { name: "45 - 49", patient: 119},
                        { name: "50 - 54", patient: 116 },
                        { name: "55 - 59", patient: 126 },
                        { name: "มากกว่า 60", patient: 105 }] },]
        },
        {
            index: 7,
            hospital: 'อัจฉริยาคลินิกการแพทย์แผนไทยประยุกต์', 
            patient: 5068, 
            service: 5307,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1172,
                    gender: [
                        { name: "หญิง", value: 579 },
                        { name: "ชาย", value: 593 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 132 },
                        { name: "20- 24", patient: 131 },
                        { name: "25 - 29", patient: 114 },
                        { name: "30 - 34", patient: 125 },
                        { name: "35 - 39", patient: 123 },
                        { name: "40 - 44", patient: 110 },
                        { name: "45 - 49", patient: 108 },
                        { name: "50 - 54", patient: 104},
                        { name: "55 - 59", patient: 116 },
                        { name: "มากกว่า 60", patient: 109 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 623,
                    gender: [
                        { name: "หญิง", value: 623 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 55 },
                        { name: "20- 24", patient: 60 },
                        { name: "25 - 29", patient: 63 },
                        { name: "30 - 34", patient: 67 },
                        { name: "35 - 39", patient: 77 },
                        { name: "40 - 44", patient: 49 },
                        { name: "45 - 49", patient: 83 },
                        { name: "50 - 54", patient: 60 },
                        { name: "55 - 59", patient: 63 },
                        { name: "มากกว่า 60", patient: 46 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1292, 
                    gender: [
                        { name: "หญิง", value: 674 },
                        { name: "ชาย", value: 618 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 110 },
                        { name: "20- 24", patient: 135 },
                        { name: "25 - 29", patient: 114 },
                        { name: "30 - 34", patient: 134 },
                        { name: "35 - 39", patient: 123 },
                        { name: "40 - 44", patient: 144 },
                        { name: "45 - 49", patient: 142 },
                        { name: "50 - 54", patient: 134 },
                        { name: "55 - 59", patient: 154 },
                        { name: "มากกว่า 60", patient: 102 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1114, 
                    gender: [
                        { name: "หญิง", value: 567 },
                        { name: "ชาย", value: 574 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 103 },
                        { name: "20- 24", patient: 109 },
                        { name: "25 - 29", patient: 108 },
                        { name: "30 - 34", patient: 101 },
                        { name: "35 - 39", patient: 123 },
                        { name: "40 - 44", patient: 108 },
                        { name: "45 - 49", patient: 123 },
                        { name: "50 - 54", patient: 123 },
                        { name: "55 - 59", patient: 113 },
                        { name: "มากกว่า 60", patient: 130 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1076, 
                    gender: [
                        { name: "หญิง", value: 556 },
                        { name: "ชาย", value: 523 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 88 },
                        { name: "20- 24", patient: 100 },
                        { name: "25 - 29", patient: 111 },
                        { name: "30 - 34", patient: 119 },
                        { name: "35 - 39", patient: 113 },
                        { name: "40 - 44", patient: 121 },
                        { name: "45 - 49", patient: 91 },
                        { name: "50 - 54", patient: 96 },
                        { name: "55 - 59", patient: 108 },
                        { name: "มากกว่า 60", patient: 132 }] },]
        },
        {
            index: 8,
            hospital: 'โรงพยาบาลกาบเชิง', 
            patient: 5386, 
            service: 5612,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1259,
                    gender: [
                        { name: "หญิง", value: 658 },
                        { name: "ชาย", value: 601 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 120 },
                        { name: "20- 24", patient: 124 },
                        { name: "25 - 29", patient: 139 },
                        { name: "30 - 34", patient: 130 },
                        { name: "35 - 39", patient: 114 },
                        { name: "40 - 44", patient: 140 },
                        { name: "45 - 49", patient: 123 },
                        { name: "50 - 54", patient: 120},
                        { name: "55 - 59", patient: 131 },
                        { name: "มากกว่า 60", patient: 118 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 649,
                    gender: [
                        { name: "หญิง", value: 649 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 79 },
                        { name: "20- 24", patient: 66 },
                        { name: "25 - 29", patient: 61 },
                        { name: "30 - 34", patient: 48 },
                        { name: "35 - 39", patient: 65 },
                        { name: "40 - 44", patient: 95 },
                        { name: "45 - 49", patient: 47 },
                        { name: "50 - 54", patient: 68 },
                        { name: "55 - 59", patient: 60 },
                        { name: "มากกว่า 60", patient: 60 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1191, 
                    gender: [
                        { name: "หญิง", value: 595 },
                        { name: "ชาย", value: 596 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 108 },
                        { name: "20- 24", patient: 113 },
                        { name: "25 - 29", patient: 120 },
                        { name: "30 - 34", patient: 129 },
                        { name: "35 - 39", patient: 129 },
                        { name: "40 - 44", patient: 125 },
                        { name: "45 - 49", patient: 123 },
                        { name: "50 - 54", patient: 98 },
                        { name: "55 - 59", patient: 118 },
                        { name: "มากกว่า 60", patient: 128 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1280, 
                    gender: [
                        { name: "หญิง", value: 603 },
                        { name: "ชาย", value: 677 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 137 },
                        { name: "20- 24", patient: 115 },
                        { name: "25 - 29", patient: 143 },
                        { name: "30 - 34", patient: 121 },
                        { name: "35 - 39", patient: 125 },
                        { name: "40 - 44", patient: 140 },
                        { name: "45 - 49", patient: 115 },
                        { name: "50 - 54", patient: 123 },
                        { name: "55 - 59", patient: 145 },
                        { name: "มากกว่า 60", patient: 113 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1233, 
                    gender: [
                        { name: "หญิง", value: 630 },
                        { name: "ชาย", value: 603 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 130 },
                        { name: "20- 24", patient: 120 },
                        { name: "25 - 29", patient: 128 },
                        { name: "30 - 34", patient: 121 },
                        { name: "35 - 39", patient: 143 },
                        { name: "40 - 44", patient: 136 },
                        { name: "45 - 49", patient: 116 },
                        { name: "50 - 54", patient: 130 },
                        { name: "55 - 59", patient: 114 },
                        { name: "มากกว่า 60", patient: 95 }] },]
        },
        {
            index: 9,
            hospital: 'โรงพยาบาลสำโรงทาบ', 
            patient: 5171, 
            service: 5382,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1170,
                    gender: [
                        { name: "หญิง", value: 607 },
                        { name: "ชาย", value: 563 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 100 },
                        { name: "20- 24", patient: 106 },
                        { name: "25 - 29", patient: 138 },
                        { name: "30 - 34", patient: 106 },
                        { name: "35 - 39", patient: 136 },
                        { name: "40 - 44", patient: 113 },
                        { name: "45 - 49", patient: 124 },
                        { name: "50 - 54", patient: 121},
                        { name: "55 - 59", patient: 134 },
                        { name: "มากกว่า 60", patient: 92 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 575,
                    gender: [
                        { name: "หญิง", value: 575 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 66 },
                        { name: "20- 24", patient: 69 },
                        { name: "25 - 29", patient: 61 },
                        { name: "30 - 34", patient: 61 },
                        { name: "35 - 39", patient: 45 },
                        { name: "40 - 44", patient: 54 },
                        { name: "45 - 49", patient: 61 },
                        { name: "50 - 54", patient: 54 },
                        { name: "55 - 59", patient: 47 },
                        { name: "มากกว่า 60", patient: 57 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1199, 
                    gender: [
                        { name: "หญิง", value: 604 },
                        { name: "ชาย", value: 595 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 112 },
                        { name: "20- 24", patient: 130 },
                        { name: "25 - 29", patient: 112 },
                        { name: "30 - 34", patient: 113 },
                        { name: "35 - 39", patient: 114 },
                        { name: "40 - 44", patient: 122 },
                        { name: "45 - 49", patient: 113 },
                        { name: "50 - 54", patient: 117 },
                        { name: "55 - 59", patient: 150 },
                        { name: "มากกว่า 60", patient: 116 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1262, 
                    gender: [
                        { name: "หญิง", value: 653 },
                        { name: "ชาย", value: 609 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 93 },
                        { name: "20- 24", patient: 122 },
                        { name: "25 - 29", patient: 128 },
                        { name: "30 - 34", patient: 139 },
                        { name: "35 - 39", patient: 118 },
                        { name: "40 - 44", patient: 119 },
                        { name: "45 - 49", patient: 127 },
                        { name: "50 - 54", patient: 149 },
                        { name: "55 - 59", patient: 127 },
                        { name: "มากกว่า 60", patient: 140 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1176, 
                    gender: [
                        { name: "หญิง", value: 537 },
                        { name: "ชาย", value: 639 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 100 },
                        { name: "20- 24", patient: 121 },
                        { name: "25 - 29", patient: 132 },
                        { name: "30 - 34", patient: 118},
                        { name: "35 - 39", patient: 94 },
                        { name: "40 - 44", patient: 111 },
                        { name: "45 - 49", patient: 114 },
                        { name: "50 - 54", patient: 122 },
                        { name: "55 - 59", patient: 141 },
                        { name: "มากกว่า 60", patient: 123 }] },]
        },
        {
            index: 10,
            hospital: 'โรงพยาบาลพระอาจารย์ฝั้น อาจาโร', 
            patient: 5126, 
            service: 5341,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1207,
                    gender: [
                        { name: "หญิง", value: 626 },
                        { name: "ชาย", value: 581 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 110 },
                        { name: "20- 24", patient: 119 },
                        { name: "25 - 29", patient: 110 },
                        { name: "30 - 34", patient: 128 },
                        { name: "35 - 39", patient: 157 },
                        { name: "40 - 44", patient: 121 },
                        { name: "45 - 49", patient: 116},
                        { name: "50 - 54", patient: 102},
                        { name: "55 - 59", patient: 137 },
                        { name: "มากกว่า 60", patient: 107 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 586,
                    gender: [
                        { name: "หญิง", value: 586 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 55 },
                        { name: "20- 24", patient: 59 },
                        { name: "25 - 29", patient: 73 },
                        { name: "30 - 34", patient: 51 },
                        { name: "35 - 39", patient: 53 },
                        { name: "40 - 44", patient: 54 },
                        { name: "45 - 49", patient: 62 },
                        { name: "50 - 54", patient: 65 },
                        { name: "55 - 59", patient: 50 },
                        { name: "มากกว่า 60", patient: 64 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1128, 
                    gender: [
                        { name: "หญิง", value: 606 },
                        { name: "ชาย", value: 522 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 106 },
                        { name: "20- 24", patient: 108 },
                        { name: "25 - 29", patient: 101 },
                        { name: "30 - 34", patient: 87 },
                        { name: "35 - 39", patient: 103 },
                        { name: "40 - 44", patient: 126 },
                        { name: "45 - 49", patient: 122 },
                        { name: "50 - 54", patient: 124 },
                        { name: "55 - 59", patient: 109 },
                        { name: "มากกว่า 60", patient: 142 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1221, 
                    gender: [
                        { name: "หญิง", value: 620 },
                        { name: "ชาย", value: 601 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 123 },
                        { name: "20- 24", patient: 126 },
                        { name: "25 - 29", patient: 135 },
                        { name: "30 - 34", patient: 131 },
                        { name: "35 - 39", patient: 139 },
                        { name: "40 - 44", patient: 122 },
                        { name: "45 - 49", patient: 133 },
                        { name: "50 - 54", patient: 82},
                        { name: "55 - 59", patient: 122 },
                        { name: "มากกว่า 60", patient: 108 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1199, 
                    gender: [
                        { name: "หญิง", value: 580 },
                        { name: "ชาย", value: 619 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 97 },
                        { name: "20- 24", patient: 132 },
                        { name: "25 - 29", patient: 133 },
                        { name: "30 - 34", patient: 107},
                        { name: "35 - 39", patient: 128 },
                        { name: "40 - 44", patient: 117 },
                        { name: "45 - 49", patient: 104 },
                        { name: "50 - 54", patient: 114 },
                        { name: "55 - 59", patient: 146 },
                        { name: "มากกว่า 60", patient: 121 }] },]
        },
        {
            index: 11,
            hospital: 'โรงพยาบาลโพธาราม', 
            patient: 5231, 
            service: 5454,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1185,
                    gender: [
                        { name: "หญิง", value: 618 },
                        { name: "ชาย", value: 567 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 108 },
                        { name: "20- 24", patient: 123 },
                        { name: "25 - 29", patient: 122 },
                        { name: "30 - 34", patient: 152 },
                        { name: "35 - 39", patient: 129 },
                        { name: "40 - 44", patient: 118},
                        { name: "45 - 49", patient: 107},
                        { name: "50 - 54", patient: 125},
                        { name: "55 - 59", patient: 101 },
                        { name: "มากกว่า 60", patient: 100 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 612,
                    gender: [
                        { name: "หญิง", value: 612 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 64 },
                        { name: "20- 24", patient: 64 },
                        { name: "25 - 29", patient: 69 },
                        { name: "30 - 34", patient: 62 },
                        { name: "35 - 39", patient: 34 },
                        { name: "40 - 44", patient: 68 },
                        { name: "45 - 49", patient: 75 },
                        { name: "50 - 54", patient: 68 },
                        { name: "55 - 59", patient: 48 },
                        { name: "มากกว่า 60", patient: 60 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1270, 
                    gender: [
                        { name: "หญิง", value: 667 },
                        { name: "ชาย", value: 603 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 100 },
                        { name: "20- 24", patient: 142 },
                        { name: "25 - 29", patient: 131 },
                        { name: "30 - 34", patient: 154},
                        { name: "35 - 39", patient: 131 },
                        { name: "40 - 44", patient: 116 },
                        { name: "45 - 49", patient: 128 },
                        { name: "50 - 54", patient: 142 },
                        { name: "55 - 59", patient: 120 },
                        { name: "มากกว่า 60", patient: 106 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1223, 
                    gender: [
                        { name: "หญิง", value: 619 },
                        { name: "ชาย", value: 604 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 113 },
                        { name: "20- 24", patient: 119 },
                        { name: "25 - 29", patient: 136 },
                        { name: "30 - 34", patient: 124 },
                        { name: "35 - 39", patient: 124 },
                        { name: "40 - 44", patient: 121 },
                        { name: "45 - 49", patient: 112 },
                        { name: "50 - 54", patient: 153 },
                        { name: "55 - 59", patient: 100 },
                        { name: "มากกว่า 60", patient: 121 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1164, 
                    gender: [
                        { name: "หญิง", value: 584 },
                        { name: "ชาย", value: 580 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 131 },
                        { name: "20- 24", patient: 135 },
                        { name: "25 - 29", patient: 107 },
                        { name: "30 - 34", patient: 131 },
                        { name: "35 - 39", patient: 97 },
                        { name: "40 - 44", patient: 104 },
                        { name: "45 - 49", patient: 119 },
                        { name: "50 - 54", patient: 94 },
                        { name: "55 - 59", patient: 130 },
                        { name: "มากกว่า 60", patient: 116 }] },]
        },
        {
            index: 12,
            hospital: 'โรงพยาบาลท่าโรงช้าง', 
            patient: 5231, 
            service: 5435,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1231,
                    gender: [
                        { name: "หญิง", value: 600 },
                        { name: "ชาย", value: 631 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 141 },
                        { name: "20- 24", patient: 110 },
                        { name: "25 - 29", patient: 125 },
                        { name: "30 - 34", patient: 114 },
                        { name: "35 - 39", patient: 97 },
                        { name: "40 - 44", patient: 139 },
                        { name: "45 - 49", patient: 117},
                        { name: "50 - 54", patient: 122},
                        { name: "55 - 59", patient: 124 },
                        { name: "มากกว่า 60", patient: 143 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 629,
                    gender: [
                        { name: "หญิง", value: 629 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 59 },
                        { name: "20- 24", patient: 41 },
                        { name: "25 - 29", patient: 58 },
                        { name: "30 - 34", patient: 72 },
                        { name: "35 - 39", patient: 88 },
                        { name: "40 - 44", patient: 65 },
                        { name: "45 - 49", patient: 57 },
                        { name: "50 - 54", patient: 57 },
                        { name: "55 - 59", patient: 68 },
                        { name: "มากกว่า 60", patient: 64 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1146, 
                    gender: [
                        { name: "หญิง", value: 555 },
                        { name: "ชาย", value: 591 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 108 },
                        { name: "20- 24", patient: 113 },
                        { name: "25 - 29", patient: 113 },
                        { name: "30 - 34", patient: 122 },
                        { name: "35 - 39", patient: 88 },
                        { name: "40 - 44", patient: 124 },
                        { name: "45 - 49", patient: 105 },
                        { name: "50 - 54", patient: 95 },
                        { name: "55 - 59", patient: 132 },
                        { name: "มากกว่า 60", patient: 146 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1240, 
                    gender: [
                        { name: "หญิง", value: 622 },
                        { name: "ชาย", value: 618 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 118 },
                        { name: "20- 24", patient: 120 },
                        { name: "25 - 29", patient: 113 },
                        { name: "30 - 34", patient: 140 },
                        { name: "35 - 39", patient: 134 },
                        { name: "40 - 44", patient: 126 },
                        { name: "45 - 49", patient: 148 },
                        { name: "50 - 54", patient: 101 },
                        { name: "55 - 59", patient: 130 },
                        { name: "มากกว่า 60", patient: 110 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1189, 
                    gender: [
                        { name: "หญิง", value: 609 },
                        { name: "ชาย", value: 580 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 133 },
                        { name: "20- 24", patient: 121 },
                        { name: "25 - 29", patient: 132 },
                        { name: "30 - 34", patient: 126 },
                        { name: "35 - 39", patient: 110 },
                        { name: "40 - 44", patient: 114 },
                        { name: "45 - 49", patient: 106 },
                        { name: "50 - 54", patient: 121 },
                        { name: "55 - 59", patient: 128 },
                        { name: "มากกว่า 60", patient: 98 }] },]
        },
        {
            index: 13,
            hospital: 'คลินิกการแพทย์แผนไทยเนตรดาว', 
            patient: 5055, 
            service: 5280,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1061,
                    gender: [
                        { name: "หญิง", value: 548 },
                        { name: "ชาย", value: 513 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 93 },
                        { name: "20- 24", patient: 112 },
                        { name: "25 - 29", patient: 131 },
                        { name: "30 - 34", patient: 105 },
                        { name: "35 - 39", patient: 101 },
                        { name: "40 - 44", patient: 121 },
                        { name: "45 - 49", patient: 94},
                        { name: "50 - 54", patient: 115},
                        { name: "55 - 59", patient: 93 },
                        { name: "มากกว่า 60", patient: 96 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 623,
                    gender: [
                        { name: "หญิง", value: 623 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 79 },
                        { name: "20- 24", patient: 44 },
                        { name: "25 - 29", patient: 57 },
                        { name: "30 - 34", patient: 65 },
                        { name: "35 - 39", patient: 61 },
                        { name: "40 - 44", patient: 79 },
                        { name: "45 - 49", patient: 64 },
                        { name: "50 - 54", patient: 63 },
                        { name: "55 - 59", patient: 68 },
                        { name: "มากกว่า 60", patient: 43 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1185, 
                    gender: [
                        { name: "หญิง", value: 614 },
                        { name: "ชาย", value: 571 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 111 },
                        { name: "20- 24", patient: 116 },
                        { name: "25 - 29", patient: 121 },
                        { name: "30 - 34", patient: 122 },
                        { name: "35 - 39", patient: 108 },
                        { name: "40 - 44", patient: 111 },
                        { name: "45 - 49", patient: 123 },
                        { name: "50 - 54", patient: 120 },
                        { name: "55 - 59", patient: 126 },
                        { name: "มากกว่า 60", patient: 127 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1162, 
                    gender: [
                        { name: "หญิง", value: 603 },
                        { name: "ชาย", value: 559 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 109 },
                        { name: "20- 24", patient: 103 },
                        { name: "25 - 29", patient: 127 },
                        { name: "30 - 34", patient: 134 },
                        { name: "35 - 39", patient: 107 },
                        { name: "40 - 44", patient: 95 },
                        { name: "45 - 49", patient: 130 },
                        { name: "50 - 54", patient: 92 },
                        { name: "55 - 59", patient: 136 },
                        { name: "มากกว่า 60", patient: 129 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1249, 
                    gender: [
                        { name: "หญิง", value: 636 },
                        { name: "ชาย", value: 613 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 131 },
                        { name: "20- 24", patient: 126 },
                        { name: "25 - 29", patient: 126 },
                        { name: "30 - 34", patient: 136 },
                        { name: "35 - 39", patient: 111 },
                        { name: "40 - 44", patient: 135 },
                        { name: "45 - 49", patient: 110 },
                        { name: "50 - 54", patient: 133 },
                        { name: "55 - 59", patient: 118 },
                        { name: "มากกว่า 60", patient: 123 }] },]
        },
        {
            index: 14,
            hospital: 'ทรงกลด สหคลินิก', 
            patient: 5325, 
            service: 5534,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1198,
                    gender: [
                        { name: "หญิง", value: 593 },
                        { name: "ชาย", value: 605 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 128 },
                        { name: "20- 24", patient: 100 },
                        { name: "25 - 29", patient: 118 },
                        { name: "30 - 34", patient: 105 },
                        { name: "35 - 39", patient: 128 },
                        { name: "40 - 44", patient: 132 },
                        { name: "45 - 49", patient: 121},
                        { name: "50 - 54", patient: 126},
                        { name: "55 - 59", patient: 104 },
                        { name: "มากกว่า 60", patient: 136 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 637,
                    gender: [
                        { name: "หญิง", value: 637 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 67 },
                        { name: "20- 24", patient: 48 },
                        { name: "25 - 29", patient: 69 },
                        { name: "30 - 34", patient: 63 },
                        { name: "35 - 39", patient: 80 },
                        { name: "40 - 44", patient: 66 },
                        { name: "45 - 49", patient: 62 },
                        { name: "50 - 54", patient: 52 },
                        { name: "55 - 59", patient: 59 },
                        { name: "มากกว่า 60", patient: 71 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1268, 
                    gender: [
                        { name: "หญิง", value: 664 },
                        { name: "ชาย", value: 604 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 132 },
                        { name: "20- 24", patient: 118 },
                        { name: "25 - 29", patient: 136 },
                        { name: "30 - 34", patient: 123 },
                        { name: "35 - 39", patient: 131 },
                        { name: "40 - 44", patient: 163 },
                        { name: "45 - 49", patient: 146 },
                        { name: "50 - 54", patient: 109 },
                        { name: "55 - 59", patient: 110 },
                        { name: "มากกว่า 60", patient: 100 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1205, 
                    gender: [
                        { name: "หญิง", value: 633 },
                        { name: "ชาย", value: 572 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 139 },
                        { name: "20- 24", patient: 107 },
                        { name: "25 - 29", patient: 110 },
                        { name: "30 - 34", patient: 142 },
                        { name: "35 - 39", patient: 128 },
                        { name: "40 - 44", patient: 106 },
                        { name: "45 - 49", patient: 99},
                        { name: "50 - 54", patient: 124 },
                        { name: "55 - 59", patient: 120 },
                        { name: "มากกว่า 60", patient: 130 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1226, 
                    gender: [
                        { name: "หญิง", value: 625 },
                        { name: "ชาย", value: 601 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 132 },
                        { name: "20- 24", patient: 124 },
                        { name: "25 - 29", patient: 131 },
                        { name: "30 - 34", patient: 150 },
                        { name: "35 - 39", patient: 111},
                        { name: "40 - 44", patient: 89 },
                        { name: "45 - 49", patient: 140 },
                        { name: "50 - 54", patient: 123 },
                        { name: "55 - 59", patient: 122 },
                        { name: "มากกว่า 60", patient: 106 }] },]
        },
        {
            index: 15,
            hospital: 'หมออรสา คลินิกการแพทย์แผนไทยประยุกต์', 
            patient: 5241, 
            service: 5457,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1221,
                    gender: [
                        { name: "หญิง", value: 591 },
                        { name: "ชาย", value: 630 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 115 },
                        { name: "20- 24", patient: 141 },
                        { name: "25 - 29", patient: 126 },
                        { name: "30 - 34", patient: 102 },
                        { name: "35 - 39", patient: 114 },
                        { name: "40 - 44", patient: 129 },
                        { name: "45 - 49", patient: 118},
                        { name: "50 - 54", patient: 112},
                        { name: "55 - 59", patient: 145 },
                        { name: "มากกว่า 60", patient: 119 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 588,
                    gender: [
                        { name: "หญิง", value: 558 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 61 },
                        { name: "20- 24", patient: 57 },
                        { name: "25 - 29", patient: 61 },
                        { name: "30 - 34", patient: 58 },
                        { name: "35 - 39", patient: 63 },
                        { name: "40 - 44", patient: 61 },
                        { name: "45 - 49", patient: 45 },
                        { name: "50 - 54", patient: 64 },
                        { name: "55 - 59", patient: 40 },
                        { name: "มากกว่า 60", patient: 78 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1192, 
                    gender: [
                        { name: "หญิง", value: 583 },
                        { name: "ชาย", value: 609 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 119 },
                        { name: "20- 24", patient: 96 },
                        { name: "25 - 29", patient: 130 },
                        { name: "30 - 34", patient: 123 },
                        { name: "35 - 39", patient: 105 },
                        { name: "40 - 44", patient: 117 },
                        { name: "45 - 49", patient: 127 },
                        { name: "50 - 54", patient: 126 },
                        { name: "55 - 59", patient: 126 },
                        { name: "มากกว่า 60", patient: 123 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1242, 
                    gender: [
                        { name: "หญิง", value: 600 },
                        { name: "ชาย", value: 642 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 119 },
                        { name: "20- 24", patient: 107 },
                        { name: "25 - 29", patient: 126},
                        { name: "30 - 34", patient: 156 },
                        { name: "35 - 39", patient: 111 },
                        { name: "40 - 44", patient: 109 },
                        { name: "45 - 49", patient: 136},
                        { name: "50 - 54", patient: 124 },
                        { name: "55 - 59", patient: 128 },
                        { name: "มากกว่า 60", patient: 126 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1214, 
                    gender: [
                        { name: "หญิง", value: 623 },
                        { name: "ชาย", value: 591 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 134 },
                        { name: "20- 24", patient: 113 },
                        { name: "25 - 29", patient: 116 },
                        { name: "30 - 34", patient: 123 },
                        { name: "35 - 39", patient: 135},
                        { name: "40 - 44", patient: 117 },
                        { name: "45 - 49", patient: 133 },
                        { name: "50 - 54", patient: 115 },
                        { name: "55 - 59", patient: 104 },
                        { name: "มากกว่า 60", patient: 124 }] },]
        },
        {
            index: 16,
            hospital: 'ภัทรภาสคลินิกการแพทย์แผนไทยประยุกต์', 
            patient: 5087, 
            service: 5317,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1107,
                    gender: [
                        { name: "หญิง", value: 543 },
                        { name: "ชาย", value: 564 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 109 },
                        { name: "20- 24", patient: 120 },
                        { name: "25 - 29", patient: 110 },
                        { name: "30 - 34", patient: 128 },
                        { name: "35 - 39", patient: 130 },
                        { name: "40 - 44", patient: 108 },
                        { name: "45 - 49", patient: 90},
                        { name: "50 - 54", patient: 108},
                        { name: "55 - 59", patient: 99 },
                        { name: "มากกว่า 60", patient: 105 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 579,
                    gender: [
                        { name: "หญิง", value: 579 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 71 },
                        { name: "20- 24", patient: 58 },
                        { name: "25 - 29", patient: 59 },
                        { name: "30 - 34", patient: 67 },
                        { name: "35 - 39", patient: 54 },
                        { name: "40 - 44", patient: 47 },
                        { name: "45 - 49", patient: 66 },
                        { name: "50 - 54", patient: 47 },
                        { name: "55 - 59", patient: 59 },
                        { name: "มากกว่า 60", patient: 51 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1246, 
                    gender: [
                        { name: "หญิง", value: 649 },
                        { name: "ชาย", value: 597 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 134 },
                        { name: "20- 24", patient: 105 },
                        { name: "25 - 29", patient: 114 },
                        { name: "30 - 34", patient: 122 },
                        { name: "35 - 39", patient: 140 },
                        { name: "40 - 44", patient: 127 },
                        { name: "45 - 49", patient: 102},
                        { name: "50 - 54", patient: 133 },
                        { name: "55 - 59", patient: 134 },
                        { name: "มากกว่า 60", patient: 135 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1154, 
                    gender: [
                        { name: "หญิง", value: 558 },
                        { name: "ชาย", value: 596 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 119 },
                        { name: "20- 24", patient: 116 },
                        { name: "25 - 29", patient: 102},
                        { name: "30 - 34", patient: 107 },
                        { name: "35 - 39", patient: 129 },
                        { name: "40 - 44", patient: 123 },
                        { name: "45 - 49", patient: 100},
                        { name: "50 - 54", patient: 116 },
                        { name: "55 - 59", patient: 127 },
                        { name: "มากกว่า 60", patient: 115 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1231, 
                    gender: [
                        { name: "หญิง", value: 602 },
                        { name: "ชาย", value: 629 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 129 },
                        { name: "20- 24", patient: 115 },
                        { name: "25 - 29", patient: 140 },
                        { name: "30 - 34", patient: 137 },
                        { name: "35 - 39", patient: 123},
                        { name: "40 - 44", patient: 121 },
                        { name: "45 - 49", patient: 133 },
                        { name: "50 - 54", patient: 114 },
                        { name: "55 - 59", patient: 114 },
                        { name: "มากกว่า 60", patient: 105 }] },]
        },
        {
            index: 17,
            hospital: 'โรงพยาบาลสุทธาเวช คณะแพทยศาสตร์ มหาวิทยาลัยมหาสารคาม', 
            patient: 5197, 
            service: 5424,
            diseases: [ 
                { name: "กลุ่มไข้หวัดน้อย", value: 1137,
                    gender: [
                        { name: "หญิง", value: 570 },
                        { name: "ชาย", value: 567 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 125 },
                        { name: "20- 24", patient: 119 },
                        { name: "25 - 29", patient: 106 },
                        { name: "30 - 34", patient: 124 },
                        { name: "35 - 39", patient: 100 },
                        { name: "40 - 44", patient: 122 },
                        { name: "45 - 49", patient: 109},
                        { name: "50 - 54", patient: 94},
                        { name: "55 - 59", patient: 123 },
                        { name: "มากกว่า 60", patient: 115 }] 
                },
                { name: "กลุ่มโรคโลหิตระดูสตรี", value: 605,
                    gender: [
                        { name: "หญิง", value: 605 },
                        { name: "ชาย", value: 0 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 57 },
                        { name: "20- 24", patient: 43 },
                        { name: "25 - 29", patient: 84 },
                        { name: "30 - 34", patient: 62 },
                        { name: "35 - 39", patient: 63 },
                        { name: "40 - 44", patient: 66 },
                        { name: "45 - 49", patient: 58 },
                        { name: "50 - 54", patient: 56 },
                        { name: "55 - 59", patient: 50 },
                        { name: "มากกว่า 60", patient: 66 }] 
                },
                { name: "กลุ่มอาการท้องอืด/ท้องเฟ้อ", value: 1264, 
                    gender: [
                        { name: "หญิง", value: 631 },
                        { name: "ชาย", value: 633 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 107 },
                        { name: "20- 24", patient: 129 },
                        { name: "25 - 29", patient: 111 },
                        { name: "30 - 34", patient: 135 },
                        { name: "35 - 39", patient: 123 },
                        { name: "40 - 44", patient: 117 },
                        { name: "45 - 49", patient: 149 },
                        { name: "50 - 54", patient: 115 },
                        { name: "55 - 59", patient: 140 },
                        { name: "มากกว่า 60", patient: 138 }] 
                },
                { name: "กลุ่มอาการผดผื่น", value: 1228, 
                    gender: [
                        { name: "หญิง", value: 636 },
                        { name: "ชาย", value: 592 }],  
                    age: [
                        { name: "น้อยกว่า 20", patient: 122 },
                        { name: "20- 24", patient: 138 },
                        { name: "25 - 29", patient: 125},
                        { name: "30 - 34", patient: 118 },
                        { name: "35 - 39", patient: 152 },
                        { name: "40 - 44", patient: 128 },
                        { name: "45 - 49", patient: 106},
                        { name: "50 - 54", patient: 110 },
                        { name: "55 - 59", patient: 124 },
                        { name: "มากกว่า 60", patient: 115 }] 
                },
                { name: "กลุ่มระบบกล้ามเนื้อและกระดูก", value: 1190, 
                    gender: [
                        { name: "หญิง", value: 600 },
                        { name: "ชาย", value: 590 }],   
                    age: [
                        { name: "น้อยกว่า 20", patient: 131 },
                        { name: "20- 24", patient: 114 },
                        { name: "25 - 29", patient: 96 },
                        { name: "30 - 34", patient: 132 },
                        { name: "35 - 39", patient: 116},
                        { name: "40 - 44", patient: 129 },
                        { name: "45 - 49", patient: 123 },
                        { name: "50 - 54", patient: 132 },
                        { name: "55 - 59", patient: 118 },
                        { name: "มากกว่า 60", patient: 97 }] },]
        },
    ]
}

const COLORS01 = ["#24B0BA", "#1D99A1", "#178388", "#106C6F", "#0A5556"];
const COLORS = ["#2B7880", "#24B0BA"];

const PageData = () => {
    const [selectedDiseases, setSelectedDiseases] = useState(data.map(item => item.name));
    const [selectedHospitals, setSelectedHospitals] = useState(dataHospital.map(item => item.name));
    const [dataHospitals, setDataHospitals] = useState(dataHospital);
    const [dataDiseases, setDataDiseases] = useState(data)
    const [dataGenders, setDataGenders] = useState(dataGender)
    const [dataAges, setDataAges] = useState(dataAge)
    const [year, setYear] = useState(2568)
    let previousSelectedHospitals = null;

    useEffect(() => {
        handleSearch()
    })

    const handleSearch = () => {
        const filteredDatas = filter(year, selectedHospitals, selectedDiseases);
        setDataHospitals(filteredDatas)
        

        if (JSON.stringify(selectedHospitals) !== JSON.stringify(previousSelectedHospitals)) {
            previousSelectedHospitals = selectedHospitals;
            const aggregatedDiseases = {};

            const diseases = filteredDatas ? filteredDatas.flatMap(item => item.diseases) : [];
            diseases.forEach(disease => {
                // ตรวจสอบว่าโรคนี้อยู่ใน aggregatedDiseases หรือไม่
                if (!aggregatedDiseases[disease.name]) {
                    aggregatedDiseases[disease.name] = {
                        name: disease.name, // เพิ่มชื่อโรค
                        value: 0, // เริ่มต้นค่า value เป็น 0
                        gender: [], // เริ่มต้นการรวมกลุ่มเพศใหม่
                        age: []     // เริ่มต้นการรวมกลุ่มอายุใหม่
                    };
                }
    
                aggregatedDiseases[disease.name].value += disease.value;
                
                if (selectedDiseases.length > 1) {
                    const ageData = diseases.flatMap(item => item.age);
                    const genderData = diseases.flatMap(item => item.gender);

                    const aggregatedAges = ageData.reduce((acc, ageGroup) => {
                        const existingAgeGroup = acc.find(a => a.name === ageGroup.name);
                        if (existingAgeGroup) {
                            existingAgeGroup.patient += ageGroup.patient;
                        } else {
                            acc.push({ ...ageGroup });
                        }
                        return acc;
                    }, []);
                    setDataAges(aggregatedAges)

                    const aggregatedGender = genderData.reduce((acc, genderGroup) => {
                        const existingGenderGroup = acc.find(a => a.name === genderGroup.name);
                        if (existingGenderGroup) {
                            existingGenderGroup.value += genderGroup.value;
                        } else {
                            acc.push({ ...genderGroup });
                        }
                        return acc;
                    }, []);
                    setDataGenders(aggregatedGender)
                } else {
                    // รวมจำนวนผู้ป่วยตามเพศ
                    disease.gender.forEach(genderGroup => {
                        const existingGenderGroup = aggregatedDiseases[disease.name].gender.find(a => a.name === genderGroup.name);
                        if (existingGenderGroup) {
                            existingGenderGroup.value += genderGroup.value; // รวมจำนวนผู้ป่วย
                        } else {
                            aggregatedDiseases[disease.name].gender.push({ ...genderGroup }); // เพิ่มกลุ่มเพศใหม่
                        }
                    });
        
                    // รวมจำนวนผู้ป่วยตามช่วงอายุ (ถ้าต้องการ)
                    disease.age.forEach(ageGroup => {
                        const existingAgeGroup = aggregatedDiseases[disease.name].age.find(a => a.name === ageGroup.name);
                        if (existingAgeGroup) {
                            existingAgeGroup.patient += ageGroup.patient; // รวมจำนวนผู้ป่วย
                        } else {
                            aggregatedDiseases[disease.name].age.push({ ...ageGroup }); // เพิ่มกลุ่มอายุใหม่
                        }
                    });

                    const result = Object.values(aggregatedDiseases)
                    setDataAges(result.flatMap(item => item.age))
                    setDataGenders(result.flatMap(item => item.gender))
                }

            });
            
            const resultArray = Object.values(aggregatedDiseases)
            
            setDataDiseases(resultArray)
            return resultArray;
        } else {
            return; 
        }
    };

    const filter = (year, hospitalNames, diseases) => {
        return newData[year]?.map(hospitalData => {
            const hospitalMatch = hospitalNames.includes(hospitalData.hospital);
            const filteredDiseases = hospitalData.diseases.filter(disease => diseases.includes(disease.name));
            const diseasesMatch = filteredDiseases.length > 0;
    
            if (hospitalMatch && diseasesMatch) {
                return {
                    index: hospitalData.index,
                    name: hospitalData.hospital,
                    patient: hospitalData.patient,
                    service: hospitalData.service,
                    diseases: filteredDiseases
                };
            }
        }).filter(data => data !== undefined);
    };


    return (
        <Card>
            <div className="p-4">
                <div className="w-full items-center	" >
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 6, md: 6 }} className="content-center">
                            <p className="xl:text-lg md:text-sm font-medium">สถิติข้อมูลทั่วไป</p>
                        </Grid>
                        <Grid size={{ xs: 6, md: 6 }} className="text-end content-center">
                            <Button className="w-[130px] bg-white border-solid border-2 border-[#23B0BA] rounded-[30px] text-[#333333] rounded-[15px] xl:text-base md:text-sm">
                                <DownloadRounded className="mr-2" />
                                ดาวน์โหลด
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }} className="content-start">
                            <SelectSearch data={dataHospital} title={'สถานพยาบาล'} onChange={setSelectedHospitals}/>   
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }} className="content-start">
                            <SelectSearch data={data} title={'โรค'} onChange={setSelectedDiseases}/>   
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }} className="content-start">
                            <YearPicker onChange={setYear}/> 
                        </Grid>
                        <Grid size={{ xs: 12, md: 1 }} className="text-end content-center">
                            <Button className="w-full bg-submit border-submit text-white rounded-[15px] xl:text-base md:text-sm" onClick={handleSearch}>
                                <SearchOutlined className="mr-2" />
                                ค้นหา
                            </Button>  
                        </Grid>
                    </Grid>
                </div>
                <Grid container spacing={2} className="mt-6 w-full">
                    <Grid size={{ xs: 12 }}>
                        <div className=" relative border-2 rounded-[6px] shadow-md">
                            <p className="text-sm text-[#333333] font-normal absolute px-2 top-[-10px] left-5 sm:top-[-10px] left-10 md:top-[-10px] left-10 lg:top-[-10px] left-10 bg-white">จำนวนผู้ป่วยแบ่งตามการวินิจฉัยโรค</p>
                            <PieCharts data={dataDiseases} title='กลุ่มโรค' colors={COLORS01} />
                            <div className="flex flex-wrap justify-center my-2 space-x-2">
                                {dataDiseases.map((value, index) => (
                                    <div key={index} className="flex space-x-2 items-center">
                                        <div className="w-[14px] h-[10.5px]" style={{ backgroundColor: COLORS01[index % COLORS01.length] }} />
                                        <p className="text-xs sm:text-base" style={{ color: COLORS01[index % COLORS01.length] }}>{value.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 5 }} className="mt-2">
                        <div className=" relative border-2 rounded-[6px] shadow-md">
                            <p className="text-sm text-[#333333] font-normal absolute px-2 top-[-10px] left-5 sm:top-[-10px] left-10 md:top-[-10px] left-10 lg:top-[-10px] left-10 bg-white">จำนวนผู้ป่วยแบ่งตามเพศ</p>
                            <PieCharts data={dataGenders} title='เพศ' colors={COLORS} />
                            <div className="flex flex-wrap justify-center my-2 space-x-2" >
                                {dataGenders.map((value, index) => (
                                    <div key={index} className="flex space-x-2 items-center">
                                        <div className="w-[14px] h-[10.5px] " style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                        <p className="text-xs sm:text-base" style={{ color: COLORS[index % COLORS.length] }}>{value.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 7 }} className="mt-2">
                        <div className=" relative border-2 rounded-[6px] shadow-md">
                            <p className="text-sm text-[#333333] font-normal absolute px-2 top-[-10px] left-5 sm:top-[-10px] left-10 md:top-[-10px] left-10 lg:top-[-10px] left-10 bg-white">จำนวนผู้ป่วยแบ่งตามช่วงอายุ</p>
                            <BarChartes data={dataAges} />
                            <div className="flex flex-wrap justify-center my-2">
                                <div className="flex space-x-2 pr-4 items-center">
                                    <div className="w-[14px] h-[10.5px] bg-[#24B0BA]" />
                                    <p className="text-xs sm:text-base text-[#24B0BA]" >จำนวนผู้ป่วย</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }} className="content-center">
                                <p className="text-sm md:text-lg font-medium">สถิติข้อมูลการเข้าใช้บริการแบ่งตามสถานพยาบาล</p>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }} className="text-end">
                                <Button className="w-[130px] bg-white border-solid border-2 border-[#23B0BA] rounded-[30px] text-[#333333] rounded-[15px] xl:text-base md:text-sm">
                                    <DownloadRounded className="mr-2" />
                                    ดาวน์โหลด
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid size={{ xs: 12 }} className="mt-6" >
                           <TableHospital data={dataHospitals}/> 
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        </Card>
    )
}

export default PageData;