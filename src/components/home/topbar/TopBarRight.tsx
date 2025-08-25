import React, { use } from "react";
import colors from "../../../constants/colors";
import avatar from '../../../assets/profile.png';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";

type Props = {
    style?: React.CSSProperties,
    avatarStyle?: React.CSSProperties,
}

export default function TopBarRight(props: Props) {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div style={ Object.assign({}, styles.container, props.style) }>
            <div style={ Object.assign({}, styles.avatarContainer, props.avatarStyle) }>
                <img src={avatar} style={styles.avatar} onClick={() => navigate(`/account/${user._id}`)} />
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
        height: 50,
        cursor: 'pointer',
    },
    avatar: {
       objectFit: 'contain',
       width: '100%',
       height: 'inherit',
       border: `2px solid ${colors.surface}`,
       borderRadius: '12px',
       backgroundColor: colors.border,
    }
}
