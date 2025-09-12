import React, { useEffect, useState } from "react";
import colors from "../constants/colors";
import typography from "../constants/typography";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import deleteIcon from '../assets/icons/delete.svg';

import TopBar from "../components/home/topbar/TopBar";
import Text from "../components/commons/Text";
import { deleteTask, getTask } from "../services/api";
import Task from "../components/task/TaskForm";
import TaskLogs from "../components/task/TaskLogs";
import toast from "react-hot-toast";

type Props = {
    style?: React.CSSProperties,
}

export default function ProjectTask(props: Props) {
    const { user } = useAuth();
    const { username, slug, id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState<any>({});
    const [isHovered, setIsHovered] = useState<string | null>(null);

    const init = async () => {
        if (!username || !slug || !id) return;
        try {
            const res = await getTask(username, slug, id);
            setTask(res);
        } catch (e) {
            console.error("Failed to fetch task: ", e);
        }
    }

    const onDelete = async () => {
        if (!username || !slug || !id) return;
        
        toast.promise(
            deleteTask(username, slug, id)
            .then(response => {
                console.log(response);
                navigate(-1);
            }) , {
                loading: 'Deleting task...',
                success: 'Task deleted successfully!',
                error: 'Failed to delete task. Please try again.'
            }
        )
    }

    useEffect(() => {
        init();
    }, [username, slug, id]);

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
                            to={`/${task.createdBy?.username}/${task.projectId?.slug}/tasks`}
                            style={{
                                color: colors.primary,
                                textDecoration: isHovered === slug ? 'underline' : 'none',
                            }}
                            onMouseEnter={() => setIsHovered(slug ?? null)}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            {slug}
                       </Link>
                       &nbsp;/&nbsp;{task.title}
                    </Text>
                </div>
                <div style={styles.main}>
                    <div style={styles.mainSection}>
                        <div style={styles.mainHeader}>
                            <div style={styles.statusDue}>
                                <Text
                                    variant="subtitle"
                                    style={styles.text}
                                >
                                    Current status:
                                </Text>
                                <div style={styles.buttons}>
                                    <Text
                                        variant="subtitle"
                                        style={styles.text}
                                    >
                                        {task.status}
                                    </Text>
                                </div>
                            </div>
                            <div style={styles.statusDue}>
                                <Text
                                    variant="subtitle"
                                    style={styles.text}
                                >
                                    Due date:
                                </Text>
                                <div style={styles.buttons}>
                                    <Text
                                        variant="subtitle"
                                        style={styles.text}
                                    >
                                        {task.dueDate?.split('T')[0]}
                                    </Text>
                                </div>
                            </div>
                            <div
                                style={{                        
                                    borderRadius: '8px',
                                    backgroundColor: isHovered === 'delete' ? colors.darkBorder : colors.surface,
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={() => setIsHovered('delete')}
                                onMouseLeave={() => setIsHovered(null)}
                                onClick={() => onDelete()}
                            >
                                <img
                                    src={deleteIcon}
                                    style={{
                                        height: 20,
                                        paddingTop: 5,
                                        paddingLeft: 4,
                                        paddingRight: 4,
                                    }}
                                />
                            </div>
                        </div>
                        <Task 
                            task={task}
                            setTask={setTask}
                        />
                    </div>
                    <div style={styles.sideSection}>
                        <div style={styles.sideHeader}>
                            <Text
                                variant="subtitle"
                                style={styles.text}
                            >
                                Task activity logs
                            </Text>
                        </div>
                        <TaskLogs />
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
        alignItems: 'baseline',
        gap: 20,
    },
    main: {
        // border: '1px solid red',
        paddingTop: 20,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        flex: 1,
        gap: 25,
    },
    statusDue: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 10,
    },
    mainSection: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // padding: 10,
    },
    mainHeader: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
    },
    buttons: {
        padding: '3px 10px',
        margin: 0,
        width: 'auto',
        borderRadius: '8px',
        border: `1px solid ${colors.darkBorder}`,
        // cursor: 'pointer',
    },
    text: {
        margin: 0,
        fontFamily: 'Poppins-Light',
        color: colors.textPrimary,
    },
    sideSection: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        width: '45%',
        // padding: 10,
    },
    sideHeader: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        marginBottom: 20,
        padding: 4,
    },
}