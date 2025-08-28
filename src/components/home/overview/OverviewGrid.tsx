import React, { useEffect } from "react";
import Text from "../../commons/Text";
import DueTodayCard from "./DueTodayCard";
import InProgressCard from "./InProgressCard";
import CompletedCard from "./CompletedCard";
import OverdueCard from "./OverdueCard";

import { useAuth } from "../../../providers/AuthProvider";
import { useMediaQuery } from "react-responsive";
import TopBarMid from "../topbar/TopBarMid";

type Props = {
    style?: React.CSSProperties,
    children?: any,
    Task: any,
}

export default function OverviewGrid(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const { user } = useAuth();

    return (
        <div style={ Object.assign({}, styles.container, props.style) }>
            <div style={{
                ...styles.greetings,
                paddingTop: isBigScreen ? 30 : 5,
                paddingLeft: 20
                }}
            >
                <Text
                    variant={isBigScreen ? "heading" : "title"}
                    style={{ padding: 0, margin: 0, }}
                >
                    Welcome back, {user?.firstName}!
                </Text>
                <Text
                    variant={isBigScreen ? "title" : "subtitle"}
                    style={{ padding: 0, margin: 0, }}
                >
                    Here's what's on your plate today.
                </Text>
            </div>
            <div style={isBigScreen ? styles.statsBigScreen : styles.stats}>
                <DueTodayCard Task={props.Task} />
                <InProgressCard Task={props.Task} />
                <CompletedCard Task={props.Task} />
                <OverdueCard Task={props.Task} />
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    topbarMid: {
        // border: '1px solid red',
        padding: '0px 20px',
    },
    greetings: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '300px',
    },
    statsBigScreen: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // padding: 20,
    },
    stats: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
    }
}