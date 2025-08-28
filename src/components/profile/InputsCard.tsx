import React from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";
import { useMediaQuery } from "react-responsive";
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

import Button from "../commons/Button";
import TextInput from "../commons/TextInputs";
import Text from "../commons/Text";


export default function InputsCard() {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const navigate = useNavigate()

    const handleOnSignOut = () => {
        Cookies.remove(ACCESS_TOKEN);
        navigate('/');
    }
    
    return (
        <div style={styles.container}>
            <div style={styles.body}>
                <Text variant="title">
                    This page is still under construction. Check back soon for improvement and updates!
                </Text>
            </div>
            <div style={styles.footer}>
                <Button
                    title="Sign Out"
                    style={isBigScreen ? styles.signOut : styles.smallSignOut}
                    titleStyle={{
                        color: colors.surface,
                        fontSize: isBigScreen?
                            typography.subtitle :
                            typography.caption
                    }}
                    onButtonPress={handleOnSignOut}
                />
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
     container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
    },
    body: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
    footer: {
        borderTop: `4px solid ${colors.darkBorder}`,
        width: '90%',
        justifyItems: 'center',
    },
    signOut: {
        backgroundColor: colors.secondary,
        border: `4px solid ${colors.border}`,
        padding: '10px 5px',
        marginTop: 30,
        borderRadius: '18px',
    },
    smallSignOut: {
        backgroundColor: colors.secondary,
        border: `4px solid ${colors.border}`,
        padding: '5px 10px',
        marginTop: 15,
        borderRadius: '13px',
        width: 'auto',
    }
}