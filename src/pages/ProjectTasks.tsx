import React, { useEffect, useState } from "react";
import colors from "../constants/colors";

import TopBar from "../components/home/topbar/TopBar";
import Text from "../components/commons/Text";
import { Link, useParams } from "react-router-dom";
import { getProject, listTask } from "../services/api";
import ProjectDetails from "../components/project/ProjectDetails";
import TaskList from "../components/project/TaskList";
import TaskListOptions from "../components/project/TaskListOptions";
import TaskCreateForm from "../components/project/TaskCreateForm";

type filterOption = 'default' | 'overdue' | 'today' | 'upcoming' | 'in-progress' | 'in-review';
type sortOption = 'default' | 'ascending' | 'descending';

export default function ProjectTasks() {
    const { slug } = useParams();
    const [project, setProject] = useState<any>({});
    const [task, setTask] = useState<any[]>([]);

    const [filterState, setFilterState] = useState<filterOption>('default');
    const [sortState, setSortState] = useState<sortOption>('default');
    const [isOpen, setIsOpen] = useState<'filter' | 'sort' | null>(null);

    const [isHovered, setIsHovered] = useState<string | null>(null);

    const init = async () => {
        if (!slug) return;
        try {
            const proj = await getProject(slug);
            setProject(proj);

            const res = await listTask(slug, {filter: filterState, sort: sortState});
            setTask(res.docs);
        } catch (e) {
            console.error("Failed to API call: ", e);
        }
    }

    useEffect(() => {
        init();
    }, [slug, filterState, sortState]);

    useEffect(() => {
        function handleClick() {
            setIsOpen(null);
        }

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <div style={styles.root}>
            <div style={styles.header}>
                <TopBar />
            </div>
            <div style={styles.body}>
                <div style={styles.title}>
                    <Text
                        variant="heading"
                        style={{ margin: 0 }}
                    >
                        <Link
                            to={`/projects/${project.slug}/tasks`}
                            style={{
                                color: colors.textPrimary,
                                textDecoration: isHovered === project.slug ? 'underline' : 'none',
                            }}
                            onMouseEnter={() => setIsHovered(project.slug)}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            {project.title}
                        </Link>
                    </Text>
                </div>
                <div style={styles.main}>
                    <div style={styles.mainSection}>
                        <TaskListOptions
                            task={task}
                            filterState={filterState}
                            setFilterState={setFilterState}
                            sortState={sortState}
                            setSortState={setSortState}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                        <TaskList task={task} />
                    </div>
                    <div style={styles.sideSection}>
                        <ProjectDetails project={project} />
                        <TaskCreateForm project={project} setTask={setTask} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    root: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.surface,
        height: '100%',
        width: '100%',
        overflow: 'auto',
        position: 'absolute',
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
        flexDirection: 'column',
        width: '75%',
        padding: 10,
        height: 'inherit',
        marginBottom: 10,
    },
    title: {
        // border: '1px solid red',
        borderBottom: `1px solid ${colors.darkBorder}`,
        paddingTop: 20,
        paddingBottom: 20,
        height: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    addTaskBtn: {
        padding: '5px 10px',
        margin: 0,
        width: 'auto',
        borderRadius: '8px',
        border: `1px solid ${colors.darkBorder}`,
        cursor: 'pointer',
    },
    main: {
        // border: '1px solid red',
        paddingTop: 20,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        gap: 25,
    },
    mainSection: {
        //  border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // padding: 10,
    },
    sideSection: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        // padding: 10,
    }
}