import React, { useEffect, useState } from "react";
import colors from "../constants/colors";
import { useAuth } from "../providers/AuthProvider";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import { getProject, listTask } from "../services/api";

import TopBar from "../components/home/topbar/TopBar";
import Text from "../components/commons/Text";
import ProjectDetail from "../components/project/ProjectDetail";
import TaskList from "../components/project/TaskList";
import TaskListOptions from "../components/project/TaskListOptions";
import TaskCreateForm from "../components/project/TaskCreateForm";
import ProjectDetailSettings from "../components/project/ProjectDetailSettings";

type filterOption = 'default' | 'overdue' | 'today' | 'upcoming' | 'in-progress' | 'in-review';
type sortOption = 'default' | 'ascending' | 'descending';

export default function ProjectTasks() {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const { user } = useAuth();
    const { username, slug } = useParams();
    const [project, setProject] = useState<any>({});
    const [task, setTask] = useState<any[]>([]);

    const [filterState, setFilterState] = useState<filterOption>('default');
    const [sortState, setSortState] = useState<sortOption>('default');
    const [isOpen, setIsOpen] = useState<'filter' | 'sort' | 'settings' | null>(null);

    const [isHovered, setIsHovered] = useState<string | null>(null);

    const init = async () => {
        if (!slug || !username) return;
        try {
            const proj = await getProject(username, slug);
            setProject(proj);

            const res = await listTask(username, slug, {filter: filterState, sort: sortState});
            setTask(res.docs);
        } catch (e) {
            console.error("Failed fetch: ", e);
        }
    }

    useEffect(() => {
        if (username && slug) {
            init();
        }
    }, [username, slug, filterState, sortState]);

    useEffect(() => {
        function handleClick() {
            setIsOpen(null);
        }

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const onClose = () => {
        setIsOpen(null);
    }

    return (
        <div style={styles.root}>
            <div style={styles.header}>
                <TopBar username={user?.username} />
            </div>
            <div style={styles.body}>
                <div style={styles.title}>
                    <Text
                        variant="heading"
                        style={{ margin: 0 }}
                    >
                        <Link
                            to={`/${username}/${project.slug}/tasks`}
                            style={{
                                color: colors.textPrimary,
                                textDecoration: isHovered === project.slug ? 'underline' : 'none',
                            }}
                            onMouseEnter={() => setIsHovered(project.slug)}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                           {project.slug}
                        </Link>
                    </Text>
                </div>
                <div style={isBigScreen ? styles.main : styles.mainSmall}>
                    <div style={styles.mainSection}>
                        {!isBigScreen && (
                            <ProjectDetail
                                project={project}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                            />
                        )}
                        <TaskListOptions
                            task={task}
                            filterState={filterState}
                            setFilterState={setFilterState}
                            sortState={sortState}
                            setSortState={setSortState}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                        <TaskList
                            username={username}
                            task={task}
                        />
                    </div>
                    <div style={isBigScreen ? styles.sideSection : styles.sideSectionSmall}>
                        {isBigScreen && (
                            <ProjectDetail
                                project={project}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                            />
                        )}
                        <TaskCreateForm
                            username={username}
                            project={project}
                            setTask={setTask}
                        />
                    </div>
                </div>
            </div>
             {isOpen === 'settings' && (
                <div style={styles.overlay}>
                    <ProjectDetailSettings
                        username={username}
                        project={project}
                        setProject={setProject}
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                </div>
            )}
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
        height: 'auto',
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
        flex: 1,
        gap: 25,
    },
    mainSmall: {
        // border: '1px solid red',
        paddingTop: 20,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'column',
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
        width: '45%',
        // padding: 10,
    },
    sideSectionSmall: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        // width: '45%',
        // padding: 10,
    },
    overlay: {
        // border: '1px solid red',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        zIndex: 20,
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(48, 48, 48, 0.2)',
        // transition: 'opacity 0.3s ease',
        // backdropFilter: 'blur(1px)',
        // WebkitBackdropFilter: 'blur(1px)',
    }
}