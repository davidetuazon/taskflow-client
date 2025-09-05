import React, { useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";

import Text from "../commons/Text";
import Button from "../commons/Button";

type Props = {
    style?: React.CSSProperties,
    project: any,
}

export default function ProjectDetails(props: Props) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Text
                    variant="subtitle"
                    style={{ margin: 0 }}
                >
                    About
                </Text>
                <Button
                    title="Settings"
                    style={{
                        ...styles.settings,
                        backgroundColor: isHovered ? colors.darkBorder : colors.surface,
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    titleStyle={styles.btnTitle}
                />
            </div>
            <div style={styles.body}>
                <Text
                    variant="subtitle"
                    style={{ margin: 0, color: colors.textSecondary }}
                    textStyle={{ fontFamily: "Poppins-Light" }}
                >
                    {props.project.description || <i>"No description provided."</i>}
                </Text>
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        borderBottom: `1px solid ${colors.darkBorder}`,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'end',
        marginBottom: 10,
    },
    settings: {
        padding: '5px 5px',
        margin: 0,
        width: 'auto',
        borderRadius: '8px',
        border: `1px solid ${colors.darkBorder}`,
        cursor: 'pointer',
    },
    btnTitle: {
        margin: 0,
        fontSize: typography.caption,
        color: colors.textSecondary,
    },
    body: {
        // border: '1px solid red',
        alignItems: 'baseline',
        marginTop: 10
    },
}