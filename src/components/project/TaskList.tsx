import React, { useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";

import Text from "../commons/Text";
import { Link } from "react-router-dom";

type Props = {
    style?: React.CSSProperties,
    username: any,
    task: any[],
}

export default function TaskList(props: Props) {
    const [isHovered, setIsHovered] = useState<string | null>(null);

    return (
        <div>
            {props.task.length > 0 ? (
                <div style={styles.container}>
                    {props.task.map((t: any, idx: number) => (
                        <div
                            key={t._id}
                            style={{
                                borderBottom: idx === props.task.length - 1 ? "none" : `1px solid ${colors.darkBorder}`
                            }}
                        >
                            <div style={styles.content}>
                                <div style={styles.title}>
                                    <Text
                                        variant="subtitle"
                                        style={{
                                            ...styles.text,
                                        }}
                                    >
                                        <Link
                                            to={`/${props.username}/${t.projectId.slug}/${t._id}`}
                                            style={{
                                                color: isHovered === t._id ? colors.primary : colors.textPrimary,
                                                textDecoration: isHovered === t._id ? 'underline' : 'none',
                                            }}
                                            onMouseEnter={() => setIsHovered(t._id)}
                                            onMouseLeave={() => setIsHovered(null)}
                                        >
                                            {t.title}
                                        </Link>
                                    </Text>
                                </div>
                                <div style={styles.status}>
                                    <Text
                                        variant="subtitle"
                                        style={{
                                            ...styles.text,
                                        }}
                                        textStyle={{ color: colors.textSecondary }}
                                    >
                                        {t.status}
                                    </Text>
                                </div>
                                <div style={styles.deadline}>
                                    <Text
                                        variant="subtitle"
                                        style={{
                                            ...styles.text,
                                        }}
                                        textStyle={{ color: colors.textSecondary }}
                                    >
                                        📅 {t.dueDate.split("T")[0]}
                                    </Text>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ): (
                <div style={styles.container}>
                    <Text
                        variant="subtitle"
                        style={{ textAlign: 'center' }}
                    >
                        It looks like you're all caught up. Great job! How about starting a new task?
                    </Text>
                </div>
            )}
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        border: `1px solid ${colors.darkBorder}`,
        borderRadius: '8px',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        // flex: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    text: {
        margin: 0,
        fontFamily: 'Poppins-Light'
    },
    title: {
        // border: '1px solid red' ,
        width: '100%',
        textAlign: 'start'
    },
    status: {
        // border: '1px solid red' ,
        width: '100%',
        textAlign: 'center'
    },
    deadline: {
        // border: '1px solid red' ,
        width: '100%',
        textAlign: 'end'
    }
}