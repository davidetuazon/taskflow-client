import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import colors from "../../../constants/colors";

import Text from "../../commons/Text";
import Container from "../../commons/Container";

type Props = {
    style?: React.CSSProperties,
    overview: any,
}

export default function InProgressCard(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 768});

    return (
        <Container style={isBigScreen ? styles.containerBigScreen : styles.container}>
            <Text
                variant={ isBigScreen ? "subtitle" : "caption" }
                style={{
                    padding: 0,
                    margin: 0,
                }}
                textStyle={{ color: colors.textPrimary, textAlign: 'start' }}
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
                {props.overview}
            </Text>
        </Container>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    containerBigScreen: {
        border: `3px solid ${colors.darkBorder}`,
        padding: 20,
        margin: '30px 20px',
        minWidth: '85px'
    },
    container: {
        border: `2px solid ${colors.secondary}`,
        padding: 10,
        margin: 0, 
    }
}