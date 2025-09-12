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
import TextInput from "../commons/TextInputs";
import PublicProfile from "./PublicProfile";

type Props = {
    style?: React.CSSProperties,
    active: any;
}

export default function InputsCard(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 768});
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleOnSignOut = () => {
        Cookies.remove(ACCESS_TOKEN);
        setUser(null);
        navigate('/');
    }
    
    return (
        <div style={styles.container}>
            <div style={styles.body}>
                { props.active === 'profile' ? (
                    <PublicProfile />
                ) : (
                    <div>
                        mount account settings component
                    </div>
                )}
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
        width: '100%',
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