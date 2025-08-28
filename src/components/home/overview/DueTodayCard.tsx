import React, { useEffect, useState } from "react";
import { fetchTask } from "../../../services/api";
import { useMediaQuery } from "react-responsive";
import colors from "../../../constants/colors";

import Text from "../../commons/Text";
import Container from "../../commons/Container";


type Props = {
    style?: React.CSSProperties,
    Task: any,
}

export default function DueTodayCard(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const [count, setCount] = useState(0);

    const init = () => {

        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

        const dueTodayCount = props.Task.filter((task: any) => {
            const due = new Date(task.dueDate).getTime();
            return due >= startOfToday && due <= endOfToday && task.status !== 'done';
        }).length;
        setCount(dueTodayCount);
    };

    useEffect(() => {
        init();
    }, [props.Task]);

    return (
        <Container style={isBigScreen ? styles.containerBigScreen : styles.container}>
            <Text
                variant={ isBigScreen ? "subtitle" : "caption" }
                style={{
                    padding: 0,
                    margin: 0,
                }}
                textStyle={{ color: colors.textSecondary, textAlign: 'start' }}
            >
                Due Today
            </Text>
            <Text
                variant={ isBigScreen ? "title" : "subtitle" }
                style={{
                    padding: 0,
                    margin: 0,
                }}
                textStyle={{ color: colors.primary, textAlign: 'start' }}
            >
                {count}
            </Text>
        </Container>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    containerBigScreen: {
        border: `3px solid ${colors.primary}`,
        padding: 20,
        margin: '30px 20px',
        minWidth: '120px'
    },
    container: {
        border: `3px solid ${colors.primary}`,
        padding: 3,
        margin: 0,
    }
}