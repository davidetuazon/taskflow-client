import React from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { useMediaQuery } from "react-responsive";
import colors from "../../../constants/colors";

import Container from "../../commons/Container";
import Text from "../../commons/Text";


type Props = {
    style?: React.CSSProperties,
}

export default function MainGrid(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const { user } = useAuth();

    return (
        <div style={isBigScreen ? styles.containerBigScreen : styles.container} >
            <Container style={styles.leftCard}>
                <Text variant={ isBigScreen ? "title" : "subtitle" }>
                    Today's tasks:
                </Text>
            </Container>
            <Container style={styles.rightCard}>
                <Text variant={ isBigScreen ? "title" : "subtitle" }>
                    Upcoming deadlines:
                </Text>
            </Container>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    containerBigScreen: {
        border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        padding: 30,
        margin: 20,
        width: '90%',
    },
    container: {
        border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
        padding: 20,
        margin: 10,
        width: '80%',
    },
    leftCard: {
        border: `4px solid ${colors.primary}`,
        display: 'flex',
        // flex: 1,
    },
    rightCard: {
        border: `4px solid ${colors.secondary}`,
        display: 'flex',
        // flex: 1,
    }
}