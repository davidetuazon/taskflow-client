import React, { useEffect, useState } from "react";
import { fetchTask } from "../../../services/api";
import { useMediaQuery } from "react-responsive";

import Text from "../../commons/Text";
import Container from "../../commons/Container";
import colors from "../../../constants/colors";


type Props = {
    style?: React.CSSProperties,
    Task: any,
}

export default function OverdueCard(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const [count, setCount] = useState(0);

    const init = () => {
        const overdueCount = props.Task.filter((task: any) => {
            const due = new Date(task.dueDate).getTime();
            return due < Date.now() && task.status !== 'done';
        }).length;
        setCount(overdueCount);
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
                Overdue
            </Text>
            <Text
                variant={ isBigScreen ? "title" : "subtitle" }
                style={{
                    padding: 0,
                    margin: 0,
                }}
                textStyle={{ color: 'red', textAlign: 'start' }}
            >
                {count}
            </Text>
        </Container>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    containerBigScreen: {
        border: '3px solid red',
        padding: 20,
        margin: '30px 20px',
        minWidth: '120px'
    },
    container: {
        border: '3px solid red',
        padding: 3,
        margin: 0,
    }
}