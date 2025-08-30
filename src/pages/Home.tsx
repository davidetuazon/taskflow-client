import React, { useEffect, useState } from "react";
import { fetchTask, me } from "../services/api";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../providers/AuthProvider";
import colors from "../constants/colors";

import TopBar from "../components/home/topbar/TopBar";
import OverviewGrid from "../components/home/overview/OverviewGrid";
import MainGrid from "../components/home/maingrid/MainGrid";

export default function Home() {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const { user, setUser } = useAuth();
    const [task, setTask] = useState<any[]>([]);

    const init = async () => {
        try {
            const loggedUser = await me();
            setUser(loggedUser);
            
            const res = await fetchTask();
            setTask(res.docs);
        } catch (e) {
            console.error("Failed to fetch user data", e);
        }
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
            <OverviewGrid
                Task={task}
                style={{
                    flexDirection: isBigScreen ? 'row' : 'column'
                }}
            />
            <MainGrid task={task} setTask={setTask} />
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
        backgroundColor: colors.background,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        position: 'sticky', // makes it sticky
        top: 0,             // sticks to the top
        zIndex: 10,
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
}