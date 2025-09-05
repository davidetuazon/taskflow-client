import React, { useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";
import { useMediaQuery } from "react-responsive";
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

import Button from "../commons/Button";
import Text from "../commons/Text";


export default function InputsCard() {
    const isBigScreen = useMediaQuery({ minWidth: 768});
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleOnSignOut = () => {
        Cookies.remove(ACCESS_TOKEN);
        setUser(null);
        navigate('/');
    }
    
    return (
        <div style={styles.container}>
            <div style={styles.body}>
                <Text variant="title" textStyle={{ color: colors.textSecondary}}>
                    This section will get an update soon... Hang tight! :D
                    <br />
                    If you'd want to sign out, click the button below.
                </Text>
            </div>
            <div style={styles.footer}>
                <Button
                    title="Sign Out"
                    style={{
                        ...isBigScreen ? styles.signOut : styles.smallSignOut,
                        backgroundColor: isHovered ? colors.surface : colors.background,
                    }}
                    titleStyle={{
                        color: colors.textPrimary,
                        fontSize: isBigScreen?
                            typography.subtitle :
                            typography.caption
                    }}
                    onButtonPress={handleOnSignOut}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
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
        borderTop: `1px solid ${colors.darkBorder}`,
        width: '90%',
        justifyItems: 'center',
    },
    signOut: {
        border: `2px solid ${colors.secondary}`,
        padding: '10px 5px',
        marginTop: 30,
        borderRadius: '13px',
    },
    smallSignOut: {
        border: `2px solid ${colors.secondary}`,
        padding: '5px 10px',
        marginTop: 15,
        borderRadius: '13px',
        width: 'auto',
    }
}