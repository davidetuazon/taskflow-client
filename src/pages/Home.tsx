import React, { useEffect, useState } from "react";
import { me } from "../services/api";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../providers/AuthProvider";

import TopBar from "../components/home/topbar/TopBar";
import OverviewGrid from "../components/home/overview/OverviewGrid";
import MainGrid from "../components/home/maingrid/MainGrid";

export default function Home() {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const { user, setUser } = useAuth();

    const init = async () => {
        const res = await me();
        setUser(res);
    };

    useEffect(() => {
        console.log('Mounted');
        init();
    }, []);

    return (
        <div style={styles.root}>
            <div style={styles.header}>
                <TopBar />
            </div>
            <OverviewGrid style={{
                flexDirection: isBigScreen ? 'row' : 'column'
            }}
            />
            <MainGrid />
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        overflow: 'auto',
    },
    header: {
        // border: '1px solid red',
        width: '100%',
        paddingTop: 5, paddingBottom: 5,
        // overflow: 'hidden',
    },
}