import React from "react";
import Text from "../../commons/Text";
import DueTodayCard from "./DueTodayCard";
import InProgressCard from "./InProgressCard";
import InReviewCard from "./CompletedCard";
import OverdueCard from "./OverdueCard";

import { useAuth } from "../../../providers/AuthProvider";
import { useMediaQuery } from "react-responsive";
import Feed from '../feed/Feed';

type Props = {
    style?: React.CSSProperties,
    children?: any,
    username: any,
    overview: any,
    filterState: any,
    applyFilter: () => void,
    feed: any[],
}

export default function OverviewGrid(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const { user } = useAuth();
    const { done, dueToday, inProgress, inReview, overDue } = props.overview;

    return (
        <div style={ Object.assign({}, styles.container, props.style) }>
            <div style={{
                ...styles.greetings,
                margin: isBigScreen ? 0 : 10
                }}
            >
                <Text
                    variant={isBigScreen ? "title" : "subtitle"}
                    style={styles.text}
                >
                    Welcome back, {user?.firstName}!
                </Text>
                <Text
                    variant={isBigScreen ? "subtitle" : "caption"}
                    style={styles.text}
                >
                    Here's what's on your plate today.
                </Text>
            </div>
            <div style={isBigScreen ? styles.statsBigScreen : styles.stats}>
                <DueTodayCard overview={dueToday} />
                <InProgressCard overview={inProgress} />
                <InReviewCard overview={inReview} />
                <OverdueCard overview={overDue} />
            </div>
            <Feed
                username={props.username}
                filterState={props.filterState}
                applyFilter={props.applyFilter}
                feed={props.feed}
                style={{
                ...styles.feed,
                margin: isBigScreen ? 0 : 10
                }}
            />
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    greetings: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
    },
    statsBigScreen: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 20,
    },
    stats: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 'auto',
        margin: '20px 0px',
        gap: 5
    },
    feed: {
        // border: '1px solid red',
    },
    text: {
        // border: '1px solid red',
        margin: '5px 0px'
    }
}