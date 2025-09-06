import React, { useEffect, useState } from "react";
import { fetchProjects, getFeed, getTaskOverview, me } from "../services/api";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../providers/AuthProvider";
import colors from "../constants/colors";

import TopBar from "../components/home/topbar/TopBar";
import OverviewGrid from "../components/home/overview/OverviewGrid";
import ProjectGrid from "../components/home/sidebar/ProjectGrid";
import { useParams } from "react-router-dom";

type filterOption = 'overdue' | 'today';
const fitlerCycle: filterOption[] = ['overdue', 'today'];

export default function Home() {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const { setUser } = useAuth();
    const [username, setUsername] = useState<string |null>(null);

    const [project, setProject] = useState<any[]>([]);
    const [overview, setOverview] = useState<any>({});

    const [feed, setFeed] = useState<any[]>([]);
    const [filterState, setFilterState] = useState<filterOption>('overdue');
    
    const init = async () => {
        try {
            const loggedUser = await me();
            setUser(loggedUser);
            setUsername(loggedUser?.username);

            const proj = await fetchProjects(loggedUser?.username);
            setProject(proj.docs);

            const view = await getTaskOverview();
            setOverview(view);

        } catch (e) {
            console.error("Failed to API call: ", e);
        }
    };

    useEffect(() => {
        init();
    }, []);

    // useEffect(() => {
    //     console.log(project);
    // }, [project]);

    const applyFilter = () => {
        const currIdx = fitlerCycle.indexOf(filterState);
        const nextIdx = (currIdx + 1) % fitlerCycle.length;
        const nextFilter = fitlerCycle[nextIdx];

        setFilterState(nextFilter);
    }

    const getFeedTask = async (filter: string) => {
        if (!username) return;
        const option = filter;
        try {
            const res = await getFeed(option, username);
            setFeed(res);
        } catch (e) {
            throw new Error("Failed to fetch feed");
        }
    }

    useEffect(() => {
        if (!username) return;
        getFeedTask(filterState);
    }, [username, filterState]);

    return (
        <div style={styles.root}>
            <div style={styles.header}>
                <TopBar username={username} />
            </div>
            <div style={{...styles.body, flexDirection: isBigScreen ? 'row' : 'column'}}>
                <ProjectGrid
                    username={username}
                    project={project}
                />
                <OverviewGrid
                    username={username}
                    overview={overview}
                    filterState={filterState}
                    applyFilter={applyFilter}
                    getFeedTask={getFeedTask}
                    feed={feed}
                    style={{ margin: isBigScreen ? '40px 30px' : '10px 5px' }}
                />
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        // height: '100%',
        // overflow: 'auto',
    },
    header: {
        borderBottom: `1px solid ${colors.darkBorder}`,
        backgroundColor: colors.background,
        width: '100%',
        zIndex: 10,
    },
    body: {
        // border: '1px solid red',
        display: 'flex',
        // flexDirection: 'row',
        flex: 1,
        width: '100%',
    }
}