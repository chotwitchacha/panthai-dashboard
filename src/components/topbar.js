"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ExitToAppRounded } from '@mui/icons-material';

const Topbar = ({ children }) => {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const toggleDrawer = (boo) => {
        setDrawerOpen(boo)
    };

    const menuItems = (
        <div className='text-[#2A777F] mt-2 sm:mt-4'>
            <Link href="/ai-doctor" className='text-[10px] sm:text-base m-5'>Ai Doctor</Link>
            <Link href="/" className='text-[10px] sm:text-base m-2'>Chatbot</Link>
        </div>
    );


    return (
        <div>
            <AppBar position='fixed'>
                <div className="min-h-[70px] bg-white shadow-md flex justify-between items-center sm:px-10 lg:px-5">
                    <div className="flex items-start text-left ml-3">
                        <Image
                            src="/images/panthaiAI.png"
                            alt="panthaiAI"
                            width={100}
                            height={100}
                            className="w-[80px] object-contain"
                        />
                        {!isMobile && menuItems}
                    </div>

                    <div className='flex items-center'>
                        {isMobile ? (
                            <IconButton onClick={() => toggleDrawer(true)} edge="end" className="text-black ml-4">
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <>
                                <Image
                                    src="/images/doctor.png"
                                    alt="doctor"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                <span className="ml-2 mr-2 text-[8px] sm:text-base text-[#333]">
                                    แพทย์หญิง แผนไทย ใจดี
                                </span>
                                <Tooltip title='ย้อนกลับ'>
                                    <ExitToAppRounded className='text-black mr-6'/>
                                </Tooltip>
                            </>
                        )}
                    </div>
                </div>
            </AppBar>

            <Drawer anchor='right' open={drawerOpen} onClose={() => toggleDrawer(false)}>
                <List>
                    <ListItem>
                        <Image
                            src="/images/doctor.png"
                            alt="doctor"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <span className="ml-2 text-[8px] sm:text-base text-[#333]">
                            แพทย์หญิง แผนไทย ใจดี
                        </span>
                    </ListItem>
                    <ListItem>
                        <Link href="/ai-doctor">Ai Doctor</Link>
                    </ListItem>
                    <ListItem >
                        <Link href="/" >Chatbot</Link>
                    </ListItem>
                    <ListItem >
                        <Link href="/" >ย้อนกลับ</Link>
                    </ListItem>
                </List>
            </Drawer>

            <div className='h-screen overflow-auto'>
                <div className='mt-[90px] mx-7'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Topbar;
