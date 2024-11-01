"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Topbar = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
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
                            <IconButton onClick={toggleDrawer(true)} edge="end" className="text-black ml-4">
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <>
                                <Image
                                    src="/images/doctor.png"
                                    alt="doctor"
                                    width={40}
                                    height={40}
                                    className="rounded-full mt-4"
                                />
                                <span className="ml-2 mr-12 mt-5 text-[8px] sm:text-base text-[#333]">
                                    แพทย์หญิง แผนไทย ใจดี
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </AppBar>

            <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
                <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
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
                    <ListItem button={true} component={Link} href="/ai-doctor">
                        <ListItemText primary="Ai Doctor" />
                    </ListItem>
                    <ListItem button={true} component={Link} href="/">
                        <ListItemText primary="Chatbot" />
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
