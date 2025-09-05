import React, { useEffect, useState } from "react";
import { fetchProjects, getFeed, getTaskOverview, me } from "../services/api";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../providers/AuthProvider";
import colors from "../constants/colors";

import TopBar from "../components/home/topbar/TopBar";
import OverviewGrid from "../components/home/overview/OverviewGrid";
import ProjectGrid from "../components/home/sidebar/ProjectGrid";

type filterOption = 'overdue' | 'today';
const fitlerCycle: filterOption[] = ['overdue', 'today'];

export default function Home() {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const { setUser } = useAuth();

    const [project, setProject] = useState<any[]>([]);
    const [overview, setOverview] = useState<any>({});

    const [feed, setFeed] = useState<any[]>([]);
    const [filterState, setFilterState] = useState<filterOption>('overdue');
    
    const init = async () => {
        try {
            const loggedUser = await me();
            setUser(loggedUser);

            const proj = await fetchProjects();
            setProject(proj.docs);

            const view = await getTaskOverview();
            setOverview(view);

        } catch (e) {
            console.error("Failed to API call: ", e);
        }
    };

    useEffect(() => {
        // console.log("Mounted");
        init();
    }, []);

    // useEffect(() => {
    //     console.log(project);
    //     // init();
    // }, [project]);


    const applyFilter = () => {
        const currIdx = fitlerCycle.indexOf(filterState);
        const nextIdx = (currIdx + 1) % fitlerCycle.length;
        const nextFilter = fitlerCycle[nextIdx];

        setFilterState(nextFilter);
    }

    const getFeedTask = async (filter: string) => {
        const option = filter;
        try {
            const res = await getFeed(option);
            setFeed(res);
        } catch (e) {
            throw new Error("Failed to fetch feed");
        }
    }

    useEffect(() => {
        getFeedTask(filterState);
    }, [filterState]);

    return (
        <div style={styles.root}>
            <div style={styles.header}>
                <TopBar />
            </div>
            <div style={{...styles.body, flexDirection: isBigScreen ? 'row' : 'column'}}>
                <ProjectGrid project={project} />
                <OverviewGrid
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