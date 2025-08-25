import React, { useEffect, useState } from "react";
import { fetchTask } from "../../../services/api";
import { useMediaQuery } from "react-responsive";

import Text from "../../commons/Text";
import Container from "../../commons/Container";
import colors from "../../../constants/colors";


type Props = {
    style?: React.CSSProperties,
}

export default function OverdueCard(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const [count, setCount] = useState(0);

    const init = async () => {
        const res = await fetchTask();
        const overdueCount = res.docs.filter((task: any) => {
            const due = new Date(task.dueDate).getTime();
            return due < Date.now() && task.status !== 'done';
        }).length;
        setCount(overdueCount);
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
                Overdue:
            </Text>
            <Text
                variant={ isBigScreen ? "title" : "subtitle" }
                style={{
                    padding: 0,
                    margin: 0,
                }}
                textStyle={{ color: 'red' }}
            >
                {count}
            </Text>
        </Container>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    containerBigScreen: {
        border: '3px solid red',
        padding: 30,
        margin: 20,
    },
    container: {
        border: '3px solid red',
        padding: 3,
        margin: 0,
    }
}