import React, { SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { useMediaQuery } from "react-responsive";
import colors from "../../../constants/colors";
import { createTask, deleteTask, markTaskDone, updateTask } from "../../../services/api";

import TaskCard from "./TaskCard";
import GridHeader from "./GridHeader";
import SortOption from "./SortOption";
import FilterOption from "./FilterOption";
import { random } from "lodash";

type Props = {
    style?: React.CSSProperties,
    task: any,
    setTask: React.Dispatch<React.SetStateAction<any[]>>,
}

type SortOption = 'default' | 'dueDate';
type filterOption = 'status' | 'todo' | 'in-progress' | 'done';
const filterCycle: filterOption[] = ['status', 'todo', 'in-progress', 'done'];


export default function MainGrid(props: Props) {
    const { task, setTask } = props;
    const isBigScreen = useMediaQuery({ minWidth: 768 });
 
    const [sortState, setSortState] = useState<SortOption>('dueDate');
    const [filterState, setFilterState] = useState<filterOption>('status');
    
    const recomputeTask = (filter: filterOption, sort: SortOption) => {
        let newTasks = [...task];

        if (filter !== 'status') {
            newTasks = newTasks.filter((task: any) => task.status === filter);
        }

        if (sort !== 'dueDate') {
            newTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        }
        return newTasks;
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
        const prevTask = [...task];
        setTask(prev => prev.map(t => t._id === taskId ? { ...t, status: 'done' } : t ));

        const payload = { status: 'done' };
        try {
            await markTaskDone(taskId, payload);
        } catch (e) {
            console.error("Failed to update task status", e);
            setTask(prevTask);
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        const prevTask = [...task];
        setTask(prev => prev.filter(t => t._id !== taskId));

        try {
            await deleteTask(taskId);
        } catch (e) {
            console.error("Failed to delete task", e);
            setTask(prevTask);
        }
    }

    const handleUpdateTask = async (id: string, payload) => {
        const prevTask = [...task];
        setTask(task.map((t: any) => t._id === id ? { ...t, ...payload } : t));

        try {
            await updateTask(id, payload);
        } catch (e) {
            console.error("Failed to update task", e);
            setTask(prevTask);
        }
    }

    const handleCreateTask = async (payload) => {
        if (!payload) return;
        
        const temp = { ...payload, _id: random(99)}
        setTask(prev => [...prev, temp]);

        const prevTask = [...task];
        try {
            await createTask(payload);
        } catch (e) {
            console.error("Failed to create new task", e);
            setTask(prevTask);
        }
    }

    // derive tasks each render instead of storing copies
    const displayTasks = recomputeTask(filterState, sortState);

    return (
        <div style={isBigScreen ? styles.containerBigScreen : styles.container} >
            <div style={styles.mainCard}>
                <div style={styles.header}>
                    <GridHeader
                        SortTasks={applySort}
                        FilterTasks={applyFilter}
                        FilterState={filterState}
                        createTask={handleCreateTask}
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
                    {displayTasks.map((t: any) => (
                        <div key={t._id}>
                            <TaskCard
                                markAsDone={markAsDone}
                                deleteTask={handleDeleteTask}
                                task={t}
                                onUpdate={handleUpdateTask}
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
        padding: 10,
        // margin: 10,
        width: '90%',
        height: '90%',
    },
    mainCard: {
        // border: `3px solid ${colors.textSecondary}`,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        overflowY: 'auto',
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
        boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
    }
}