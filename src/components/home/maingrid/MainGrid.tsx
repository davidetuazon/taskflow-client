import React, { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { useMediaQuery } from "react-responsive";
import colors from "../../../constants/colors";
import { deleteTask, fetchTask, markTaskDone } from "../../../services/api";

import TaskCard from "./TaskCard";
import GridHeader from "./GridHeader";
import SortOption from "./SortOption";
import FilterOption from "./FilterOption";


type Props = {
    style?: React.CSSProperties,
}

type SortOption = 'default' | 'dueDate';
type filterOption = 'status' | 'todo' | 'in-progress' | 'done';
const filterCycle: filterOption[] = ['status', 'todo', 'in-progress', 'done'];


export default function MainGrid(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const [task, setTask] = useState<any[]>([]);
    const [originalTask, setOriginalTask] = useState<any[]>([]);    // keep original
    const [sortState, setSortState] = useState<SortOption>('dueDate');
    const [filterState, setFilterState] = useState<filterOption>('status');

    const init = async() => {
        try {
            const res = await fetchTask();

            setTask(res.docs);
            setOriginalTask(res.docs);
        } catch (e) {
            console.error("Failed to fetch task: ", e);
        }
    }

    useEffect(() => {
        init();
    }, []);
    
    const recomputeTask = (filter: filterOption, sort: SortOption) => {
        let newTasks = [...originalTask];

        if (filter !== 'status') {
            newTasks = newTasks.filter((task: any) => task.status === filter);
        }

        if (sort !== 'dueDate') {
            newTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        }

        setTask(newTasks);
    }

    const applySort = () => {
        const nextSort = sortState === 'default' ? 'dueDate' : 'default';
        setSortState(nextSort);
        recomputeTask(filterState, nextSort);
    }

    const applyFilter = () => {
        const currIdx = filterCycle.indexOf(filterState);
        const nextIdx = (currIdx + 1) % filterCycle.length;
        const nextFilter = filterCycle[nextIdx];
        
        setFilterState(nextFilter);
        recomputeTask(nextFilter, sortState);
    }

    const markAsDone = async (taskId: string) => {
        const payload = {
            status: 'done'
        };
        try {
            await markTaskDone(taskId, payload);
            await init();
        } catch (e) {
            console.error("Failed to update task status", e);
        }
    }

    const DeleteTask = async (taskId: string) => {
        try {
            await deleteTask(taskId);
            await init();
        } catch (e) {
            console.error("Failed to delete task", e);
        }
    }

    return (
        <div style={isBigScreen ? styles.containerBigScreen : styles.container} >
            <div style={styles.mainCard}>
                <div style={styles.header}>
                    <GridHeader
                        SortTasks={applySort}
                        FilterTasks={applyFilter}
                        FilterState={filterState}
                    />
                </div>
                {!isBigScreen && (
                        <div style={styles.filterSort}>
                            <FilterOption
                                FilterTasks={applyFilter}
                                FilterState={filterState}
                            />
                            <SortOption
                                SortTasks={applySort}
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
                                Title={t.title}
                                Description={t.description}
                                Status={t.status}
                                DueDate={t.dueDate}
                                TaskID={t._id}
                                MarkAsDone={markAsDone}
                                DeleteTask={DeleteTask}
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
        borderBottom: `3px solid ${colors.darkBorder}`,
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
        gap: 40,
        padding: '30px 10px',
    },
    taskCard: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 40,
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