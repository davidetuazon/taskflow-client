import React from "react";
import colors from "../constants/colors";
import typography from "../constants/typography";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import Button from "../components/commons/Button";
import Text from "../components/commons/Text";
import ProfileSettings from "../components/profile/ProfileSettings";



export default function Account() {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const navigate = useNavigate();

    return (
        <div style={styles.root}>
            <div style={styles.header}>
                <Button
                    title="back"
                    style={isBigScreen ? styles.backButton : styles.smallBackButton}
                    titleStyle={{
                        color: colors.primary,
                        fontSize: isBigScreen ?  typography.subtitle : typography.caption }}
                    onButtonPress={() => navigate(-1)}
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
        backgroundColor: colors.background,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: colors.surface,
        border: `4px solid ${colors.darkBorder}`,
        padding: '5px 0px',
        margin: 20,
        borderRadius: '15px',
    },
    smallBackButton: {
        backgroundColor: colors.surface,
        border: `4px solid ${colors.darkBorder}`,
        padding: '5px 0px',
        margin: 15,
        width: 'auto',
    },
    settings: {
        // border: '2px solid red',
        padding: 15,
        margin: 0,
        borderLeft: `4px solid ${colors.textSecondary}`,
    },
    smallSettings: {
        // border: '2px solid red',
        padding: 15,
        margin: 0,
        borderLeft: `3px solid ${colors.textSecondary}`,
    }
}