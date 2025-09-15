import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";
import { useParams } from "react-router-dom";
import { getTaskActivityLog } from "../../services/api";

import Text from "../commons/Text";

type Props = {
    style?: React.CSSProperties,
    logsUpdated: any,
}

export default function TaskLogs(props: Props) {
    const { username, slug, id } = useParams();
    const [logs, setLogs] = useState<any[]>([]);

    const init = async () => {
        if (!username || !slug || !id) return;
        try {
            const res = await getTaskActivityLog(username, slug, id);
            setLogs(res);
        } catch (e) {
            throw new Error("Failed to fetch activity logs");
        }
    }

    useEffect(() => {
        init();
    }, [props.logsUpdated]);


    return (
        <>
            {logs.length !== 0 ? (
                <div style={Object.assign({}, styles.container, props.style)}>
                    {logs.map((log: any, idx: number) => (
                    <div
                        key={idx}
                        style={{
                            ...styles.content,
                            borderBottom: idx === logs.length - 1 ? 'none' : `1px solid ${colors.darkBorder}`
                        }}
                    >
                        <Text
                            variant="caption"
                            style={styles.text}
                        >
                            {log.action}&nbsp;
                            <span style={styles.span}>
                                ({log.createdAt?.split('T')[0]})
                            </span>
                        </Text>
                        <Text
                            variant="caption"
                            style={styles.text}
                        >
                            {log.by?.fullName} :&nbsp;&nbsp;{log.details}
                        </Text>
                    </div>
                ))} 
                </div>
            ) : (
                <div 
                    style={{
                        borderTop: `1px solid ${colors.darkBorder}`,
                        padding: 10,
                    }}
                >
                     <Text
                        variant="caption"
                        style={styles.text}
                    >
                        No logs for this task yet
                    </Text>
                </div>
            )}
        </>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        border: `1px solid ${colors.darkBorder}`,
        borderRadius: '8px',
    },
    content: {
        // border: '1px solid red',
        padding: 10,
    },
    text: {
        // border: '1px solid red',
        margin: 0,
        color: colors.textSecondary,
        padding : '5px 0px',
    },
    span: {
        color: colors.textSecondary,
    }
}