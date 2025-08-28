import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";
import { useAuth } from "../../providers/AuthProvider";

import Text from "../commons/Text";
import TextInput from "../commons/TextInputs";
import LeftCard from "./LeftCard";
import InputsCard from "./InputsCard";
import { useMediaQuery } from "react-responsive";

export default function ProfileSettings() {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const { user } = useAuth();

    return (
        <div style={isBigScreen ? styles.container : styles.smallContainer}>
            <div style={styles.nameCard}>
                    <Text
                        variant="title"
                        style={{ margin: 5 }}
                    >
                        {user?.fullName}
                    </Text>
                    <p style={styles.p}>Your personal account</p>
            </div>
            <div style={isBigScreen ? styles.mainCard : styles.smallMainCard}>
                <LeftCard />
                <InputsCard />
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 30,
        width: '70%',
        padding: 30,
    },
    smallContainer: {
        border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 10,
        width: '90%',
        padding: 10,
    },
    nameCard: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        margin: 0,
    },
    mainCard: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        gap: 30,
    },
    smallMainCard: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        gap: 10,
    },
    p: {
        // border: '1px solid red',
        padding: 0,
        margin: 5,
        fontFamily: 'Poppins-SemiBold',
        fontSize: typography.caption,
        color: colors.textSecondary,
    }
}