import React, { use } from "react";
import colors from "../../../constants/colors";
import avatar from '../../../assets/profile.png';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";
import { useMediaQuery } from "react-responsive";

type Props = {
    style?: React.CSSProperties,
    avatarStyle?: React.CSSProperties,
}

export default function TopBarRight(props: Props) {
    const { user } = useAuth();
    const isBigScreen = useMediaQuery({ minWidth: 769 });

    return (
        <div style={ Object.assign({}, styles.container, props.style) }>
            <div style={ Object.assign({}, styles.avatarContainer, props.avatarStyle) }>
                <Link to={`/account/settings/${user?._id}`} style={isBigScreen ? styles.link : styles.smallLink}>
                    <img src={avatar} style={styles.avatar} />
                </Link>
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container:{
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    avatarContainer: {
        // border: '1px solid red',
        paddingTop: 4,
    },
    avatar: {
       objectFit: 'contain',
       width: '100%',
       height: 'inherit',
       border: `3px solid ${colors.surface}`,
       borderRadius: '12px',
       backgroundColor: colors.darkBorder,
    },
    link: {
        height: 50,
        cursor: 'pointer',
    },
    smallLink: {
        // border: '1px solid red',
        height: 35,
        cursor: 'pointer',
    }
}
