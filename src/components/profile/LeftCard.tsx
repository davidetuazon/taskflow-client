import React, { useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";

import Button from "../commons/Button";
import { useMediaQuery } from "react-responsive";

type settingOptions = 'profile' | 'account';

export default function LeftCard() {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const [active, setActive] = useState<settingOptions>('profile');

    return (
        <div style={styles.container}>
            <Button
                title="Public profile"
                style={{
                    ...styles.category,
                    border: active === 'profile' ?
                    `2px solid ${colors.textSecondary}` :
                    `2px solid ${colors.darkBorder}`
                }}
                titleStyle={{
                    color: colors.textSecondary,
                    fontSize: isBigScreen ? typography.subtitle : typography.caption
                }}
                onButtonPress={() => {
                    setActive('profile');
                }}
            />
            <Button
                title="Account"
                style={{
                    ...styles.category,
                    border: active === 'account' ?
                    `2px solid ${colors.textSecondary}` :
                    `2px solid ${colors.darkBorder}`
                }}
                titleStyle={{
                    color: colors.textSecondary,
                    fontSize: isBigScreen ? typography.subtitle : typography.caption  
                }}
                onButtonPress={() => {
                    setActive('account');
                }}
            />
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        alignItems: 'center',
    },
    category: {
        backgroundColor: colors.background,
        width: '70%',
        padding: 10,
        margin: 5,
    }
}