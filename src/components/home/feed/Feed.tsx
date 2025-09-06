import React, { useState } from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import Text from "../../commons/Text";

type Props = {
    style?: React.CSSProperties,
    filterState: any,
    username: any,
    applyFilter: () => void,
    getFeedTask: (filter: string) => void | Promise<void>,
    feed: any[],
}


export default function Feed(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const [isHovered, setIsHovered] = useState<string |null>(null);

    return (
        <div style={Object.assign({}, styles.container, props.style)}>
            <div style={styles.header}>
                <Text 
                variant={isBigScreen ? "title" : "subtitle"}
            >
                Feed
            </Text>
            <div
                style={{
                    ...styles.filterbtn,
                    backgroundColor: isHovered === props.filterState ? colors.darkBorder : colors.surface,
                }}
                onClick={() => {
                    props.applyFilter();
                    props.getFeedTask(props.filterState);
                }}
                onMouseEnter={() => setIsHovered(props.filterState)}
                onMouseLeave={() => setIsHovered(null)}
            >
                <Text
                    variant="subtitle"
                    style={{ margin: 0 }}
                >
                    {props.filterState}
                </Text>
            </div>
            </div>
            <div style={styles.body}>
                {props.feed.length > 0 ? (
                    props.feed.map((task: any, idx: number) => (
                        <div key={task._id}>
                            <div
                                style={{
                                    ...styles.content,
                                    borderBottom: idx === props.feed.length - 1 ? "none" : `1px solid ${colors.darkBorder}`,
                                    }}
                                >
                                <div>
                                    <Text
                                        variant="heading"
                                        style={styles.text}
                                    >
                                        <Link
                                            to={`${props.username}/projects/${task.projectId.slug}/tasks/${task._id}`}
                                            style={{
                                                color: isHovered === task._id ? colors.primary : colors.textPrimary,
                                                textDecoration: isHovered === task._id ? 'underline' : 'none',
                                            }}
                                            onMouseEnter={() => setIsHovered(task._id)}
                                            onMouseLeave={() => setIsHovered(null)}
                                        >
                                            {task.title}
                                        </Link>
                                    </Text>
                                </div>
                                <div>
                                    <p style={styles.p}>Due:</p>
                                    <Text
                                        variant="subtitle"
                                        style={styles.text}
                                    >
                                        {task.dueDate.split("T")[0]} ({task.status})
                                    </Text>
                                    <p style={styles.p}>Descrption:</p>
                                    <Text
                                        variant="subtitle"
                                        style={styles.text}
                                    >
                                        {task.description}
                                    </Text>
                                </div>   
                            </div>
                        </div>
                    )
                )) :
                <div>
                    <Text
                        variant="heading"
                        style={styles.feedEmpty}
                    >
                        Great job! You're all caught up. Check for other task status.
                    </Text>    
                </div>
                }
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid white',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        // border: '1px solid white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filterbtn: {
        backgroundColor: colors.surface,
        border: `2px solid ${colors.darkBorder}`,
        borderRadius: '8px',
        width: 'auto',
        padding: '0px 10px',
        margin: '15px 0px',
        alignContent: 'center',
        cursor: 'pointer',
    },
    filtertxt: {
        color: colors.textPrimary,
    },
    body: {
        border: `1px solid ${colors.darkBorder}`,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.surface,
        // height: '100%',
        borderRadius: '13px',
        overflow: 'auto',
    },
    content: {
        // borderBottom: `1px solid ${colors.darkBorder}`,
        // border: '1px solid red',
        padding: '10px 20px',
        backgroundColor: colors.surface,
        gap: 20,
        alignItems: 'center'
    },
    text: {
        // border: '1px solid red',
        margin: '5px 0px',
    },
    p: {
        // border: '1px solid red',
        margin: 0,
        fontSize: typography.caption,
        fontFamily: 'Poppins-Light',
    },
    feedEmpty: {
        // border: '1px solid red',
        paddingLeft: 20,
        paddingRight: 20,
    }
}