import React, { useEffect, useState } from "react";
import { fetchTask } from "../../../services/api";
import { useMediaQuery } from "react-responsive";
import colors from "../../../constants/colors";

import Text from "../../commons/Text";
import Container from "../../commons/Container";

type Props = {
    style?: React.CSSProperties,
}

export default function CompletedCard(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const [count, setCount] = useState(0);

    const init = async () => {
        const res = await fetchTask();
        const completedCount = res.docs.filter((task: any) => task.status === 'done').length;
        setCount(completedCount);
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
                Completed: 
            </Text>
            <Text
                variant={ isBigScreen ? "title" : "subtitle" }
                style={{
                    padding: 0,
                    margin: 0,
                }}
                textStyle={{ color: colors.accent }}
            >
                {count}
            </Text>
        </Container>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    containerBigScreen: {
        border: `3px solid ${colors.accent}`,
        padding: 30,
        margin: 20,
    },
    container: {
        border: `3px solid ${colors.accent}`,
        padding: 3,
        margin: 0,
    }
}