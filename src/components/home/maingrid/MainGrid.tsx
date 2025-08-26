import React, { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { useMediaQuery } from "react-responsive";
import colors from "../../../constants/colors";
import { fetchTask } from "../../../services/api";

import TaskCard from "./TaskCard";
import GridHeader from "./GridHeader";
import SortOption from "./SortOption";
import FilterOption from "./FilterOption";


type Props = {
    style?: React.CSSProperties,
}

type SortOption = 'default' | 'dueDate' | 'status';

export default function MainGrid(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const [task, setTask] = useState<any[]>([]);
    const [originalTask, setOriginalTask] = useState<any[]>([]); // keep original
    const [sortState, setSortState] = useState<SortOption>('default');

    const init = async() => {
        try {
            const res = await fetchTask();
            setTask(res.docs);
            setOriginalTask(res.docs);
        } catch (e) {
            console.error("Failed to fetch task: ", e);
        }
    }

    const statusOrder: Record<string, number> = {
        'todo': 1,
        'in-progress': 2,
        'done': 3
    };

    const applySort = (option: SortOption) => {
        if (option === "default") {
            setTask(originalTask);
            setSortState("default");
            return;
        }

        if (sortState === option) {
            setTask(originalTask);
            setSortState("default");
        } else {
            const sorted = [...task];

            if (option === "dueDate") {
                sorted.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
            }
            setTask(sorted);
            setSortState(option);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div style={isBigScreen ? styles.containerBigScreen : styles.container} >
            <div style={styles.mainCard}>
                <div style={styles.header}>
                    <GridHeader
                        SortByDate={() => applySort("dueDate")}
                        SortByDefault={() => applySort("default")}
                        SortByStatus={() => applySort("status")}
                    />
                </div>
                {!isBigScreen && (
                        <div style={styles.filterSort}>
                            <SortOption
                                DueDateSort={() => applySort("dueDate")}
                                DefaultSort={() => applySort("default")}
                                style={{
                                    // border: '1px solid red',
                                    backgroundColor: colors.background,
                                    justifyContent: 'center',
                                    padding: 0,
                                    margin: 0,
                                    flex: 'none',
                                }}
                            />
                        </div>
                    )}
                <div style={isBigScreen ? styles.taskCardBigScreen : styles.taskCard}>
                    {task.map((t: any) => (
                        <div key={t._id}>
                            <TaskCard
                                Task={task}
                                Title={t.title}
                                Description={t.description}
                                Status={t.status}
                                DueDate={t.dueDate}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    containerBigScreen: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        padding: 10,
        width: '90%',
    },
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
        padding: 10,
        margin: 10,
        width: '90%',
    },
    mainCard: {
        // border: `3px solid ${colors.textSecondary}`,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        // border: '2px solid red',
        borderBottom: `3px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    taskCardBigScreen: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
        padding: '30px 10px',
    },
    taskCard: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 30,
        padding: '30px 10px',
        overflowY: 'auto',
    },
    filterSort: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        margin: 0,
    }
}