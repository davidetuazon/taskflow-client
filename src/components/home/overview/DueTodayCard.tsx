import React, { useEffect, useState } from "react";
import { fetchTask } from "../../../services/api";
import { useMediaQuery } from "react-responsive";
import colors from "../../../constants/colors";

import Text from "../../commons/Text";
import Container from "../../commons/Container";


type Props = {
    style?: React.CSSProperties,
}

export default function DueTodayCard(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const [count, setCount] = useState(0);

    const init = async () => {
        const res = await fetchTask();

        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

        const dueTodayCount = res.docs.filter((task: any) => {
            const due = new Date(task.dueDate).getTime();
            return due >= startOfToday && due <= endOfToday && task.status !== 'done';
        }).length;
        setCount(dueTodayCount);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <Container style={isBigScreen ? styles.containerBigScreen : styles.container}>
            <Text
                variant={ isBigScreen ? "subtitle" : "caption" }
                style={{
                    padding: 0,
                    margin: 0,
                }}
                textStyle={{ color: colors.textSecondary }}
            >
                Due Today: 
            </Text>
            <Text
                variant={ isBigScreen ? "title" : "subtitle" }
                style={{
                    padding: 0,
                    margin: 0,
                }}
                textStyle={{ color: colors.primary }}
            >
                {count}
            </Text>
        </Container>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    containerBigScreen: {
        border: `3px solid ${colors.primary}`,
        padding: 30,
        margin: 20,
    },
    container: {
        border: `3px solid ${colors.primary}`,
        padding: 3,
        margin: 0,
    }
}