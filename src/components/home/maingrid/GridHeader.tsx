import React from "react";
import { useMediaQuery } from "react-responsive";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";

import Text from "../../commons/Text";
import SortOption from "./SortOption";
import FilterOption from "./FilterOption";
import Button from "../../commons/Button";
import { useLocation, useNavigate } from "react-router-dom";
import CreateTaskModal from "./CreateTaskModal";

type Props = {
    style?: React.CSSProperties,
    SortTasks: () => void;
    FilterTasks: () => void;
    FilterState: any,
    createTask: (payload) => void | Promise<void>,
}

export default function GridHeader(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const location = useLocation();
    const navigate = useNavigate();

    const isModalOpen = location.pathname === '/tasks/create';

    return (
        <div style={styles.container}>
            <div style={styles.left}>
                <Text variant='title'>
                    Your TaskFlow
                </Text>
                <Button
                    title="+"
                    style={{...styles.button, padding: isBigScreen ? '0px 5px' : '0px 0px' }}
                    titleStyle={{ fontSize: typography.heading, padding: 0, margin: 0 }}
                    onButtonPress={() => navigate('/tasks/create')}
                />
            </div>
            <div style={styles.right}>
                {isBigScreen && (
                    <>
                        <FilterOption
                            FilterTasks={props.FilterTasks}
                            FilterState={props.FilterState}
                        />
                        <SortOption
                            SortTasks={props.SortTasks}
                        />
                    </>
                    
                )}
            </div>
            <CreateTaskModal
                isOpen={isModalOpen}
                createTask={props.createTask}
            />
        </div>
    );
}

const styles : {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
        width: '100%',
    },
    left: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        paddingLeft: 10,
        alignItems: 'center',
        gap: 20,
    },
    right: {
        // border: '1px solid red',
        display: 'flex',
        paddingRight: 10,
    },
    button: {
        backgroundColor: colors.primary,
        border: `3px solid ${colors.darkBorder}`,
        margin: '20px 0px',
        width: 'auto',
        borderRadius: '15px'
    }
}