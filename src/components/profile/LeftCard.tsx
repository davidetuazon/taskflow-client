import React, { useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";

import Button from "../commons/Button";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";

type settingOptions = 'profile' | 'account';

type Props = {
    style?: React.CSSProperties;
    user: any,
    active: any,
    setActive: React.Dispatch<React.SetStateAction<settingOptions>>,
}

export default function LeftCard(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <Button
                title="Public profile"
                style={{
                    ...styles.category,
                    border: props.active === 'profile' ?
                    `2px solid ${colors.textSecondary}` :
                    `2px solid ${colors.darkBorder}`
                }}
                titleStyle={{
                    color: colors.textSecondary,
                    fontSize: isBigScreen ? typography.subtitle : typography.caption
                }}
                onButtonPress={() => {
                    props.setActive('profile');
                    navigate(`/${props.user?.username}/account/profile`, { replace: true });
                }}
            />
            <Button
                title="Account"
                style={{
                    ...styles.category,
                    border: props.active === 'account' ?
                    `2px solid ${colors.textSecondary}` :
                    `2px solid ${colors.darkBorder}`
                }}
                titleStyle={{
                    color: colors.textSecondary,
                    fontSize: isBigScreen ? typography.subtitle : typography.caption  
                }}
                onButtonPress={() => {
                    props.setActive('account');
                    navigate(`/${props.user?.username}/account/admin`, { replace: true });
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