import React, { useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";
import settings from '../../assets/icons/settings.svg';

import Text from "../commons/Text";
import ProjectDetailSettings from "./ProjectDetailSettings";

type Props = {
    style?: React.CSSProperties,
    project: any,
    isOpen: any,
    setIsOpen: React.Dispatch<React.SetStateAction<'filter' | 'sort' | 'settings' | null>>,
}

export default function ProjectDetail(props: Props) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Text
                    variant="subtitle"
                    style={{
                        margin: 0,
                    }}
                >
                    About
                </Text>
                <div
                    style={{
                        ...styles.settings,
                        backgroundColor: isHovered ? colors.darkBorder : colors.surface,
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.setIsOpen(prev => (prev === 'settings' ? null : 'settings'))
                    }}
                >
                    <img 
                        src={settings}
                        style={styles.settingsIcon}
                    />
                </div>
            </div>
            <div style={styles.body}>
                <Text
                    variant="subtitle"
                    style={{ margin: 0, color: colors.textSecondary }}
                    textStyle={{ fontFamily: "Poppins-Light" }}
                >
                    {props.project.description || <i>No description provided.</i>}
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
        marginBottom: 10,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'space-between',     
    },
    settings: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        margin: 0,
        width: 'auto',
        borderRadius: '8px',
        // border: `1px solid ${colors.darkBorder}`,
        cursor: 'pointer',
    },
    settingsIcon: {
        // border: '1px solid red',
        height: 20,
        color: colors.primary,
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