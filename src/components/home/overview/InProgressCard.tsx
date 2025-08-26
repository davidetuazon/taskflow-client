import React, { useEffect, useState } from "react";
import { fetchTask } from "../../../services/api";
import { useMediaQuery } from "react-responsive";
import colors from "../../../constants/colors";

import Text from "../../commons/Text";
import Container from "../../commons/Container";

type Props = {
    style?: React.CSSProperties,
}

export default function InProgressCard(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const [count, setCount] = useState(0);

    const init = async () => {
        const res = await fetchTask();
        const inProgressCount = res.docs.filter((task: any) => {
            const due = new Date(task.dueDate).getTime();
            return due > Date.now() && (task.status === 'in-progress' || task.status === 'todo');
        }).length;
        setCount(inProgressCount);
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
                textStyle={{ color: colors.textSecondary, textAlign: 'start' }}
            >
                In-Progress
            </Text>
            <Text
                variant={ isBigScreen ? "title" : "subtitle" }
                style={{
                    padding: 0,
                    margin: 0,
                }}
                textStyle={{ color: colors.secondary, textAlign: 'start' }}
            >
                {count}
            </Text>
        </Container>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    containerBigScreen: {
        border: `3px solid ${colors.secondary}`,
        padding: 20,
        margin: '30px 20px',
        minWidth: '120px'
    },
    container: {
        border: `3px solid ${colors.secondary}`,
        padding: 3,
        margin: 0, 
    }
}