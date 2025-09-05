import React, { useState } from "react";
import colors from "../constants/colors";
import typography from "../constants/typography";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import back from '../assets/icons/back.svg';
import signout from '../assets/icons/signout.svg';

import Button from "../components/commons/Button";
import Text from "../components/commons/Text";
import ProfileSettings from "../components/profile/ProfileSettings";



export default function Account() {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div style={styles.root}>
            <div style={styles.header}>
                <Button
                    title="Back"
                    style={{
                        ...isBigScreen ? styles.backButton : styles.smallBackButton,
                    backgroundColor: isHovered ? colors.surface : colors.background,
                    }}
                    titleStyle={{
                        color: colors.textPrimary,
                        fontSize: isBigScreen ?  typography.subtitle : typography.caption }}
                    onButtonPress={() => navigate(-1)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
                <Text
                    variant={isBigScreen ? "heading" : "title"}
                    style={isBigScreen ? styles.settings : styles.smallSettings}
                    textStyle={{ color: colors.primary }}
                >
                    Settings
                </Text>
            </div>
            <ProfileSettings />
        </div>
        
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        overflow: 'auto',
    },
    header: {
        // border: '1px solid red',
        borderBottom: `1px solid ${colors.darkBorder}`,
        backgroundColor: colors.background,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        border: `2px solid ${colors.primary}`,
        padding: '5px 5px',
        margin: '0px 20px',
        borderRadius: '13px',
        width: 'auto',
    },
    smallBackButton: {
        border: `2px solid ${colors.primary}`,
        padding: '5px 0px',
        width: 'auto',
    },
    settings: {
        // border: '2px solid red',
        padding: 10,
        margin: 0,
        borderLeft: `1px solid ${colors.darkBorder}`,
    },
    smallSettings: {
        // border: '2px solid red',
        padding: 14,
        margin: 0,
        borderLeft: `1px solid ${colors.darkBorder}`,
    }
}