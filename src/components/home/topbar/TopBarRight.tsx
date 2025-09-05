import React, { use, useState } from "react";
import colors from "../../../constants/colors";
import profile from '../../../assets/icons/profile.svg';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";
import { useMediaQuery } from "react-responsive";

type Props = {
    style?: React.CSSProperties,
    avatarStyle?: React.CSSProperties,
}

export default function TopBarRight(props: Props) {
    const { user } = useAuth();
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const [isHovered, setIsHovered] = useState<string | null>(null)

    return (
        <div style={ Object.assign({}, styles.container, props.style) }>
            <div style={ Object.assign({}, styles.avatarContainer, props.avatarStyle) }>
                <Link
                    to={`/account/settings/${user?._id}`}
                    style={isBigScreen ? styles.link : styles.smallLink}
                >
                    <img
                        src={profile}
                        style={{
                            ...styles.avatar,
                            backgroundColor: isHovered === user ? colors.surface : colors.background,
                        }}
                        onMouseEnter={() => setIsHovered(user)}
                        onMouseLeave={() => setIsHovered(null)}
                    />
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
       border: `1px solid ${colors.darkBorder}`,
       borderRadius: '8px',
       padding: '5px 2px',
    },
    link: {
        // border: '1px solid white',
        height: 22,
        cursor: 'pointer',
    },
    smallLink: {
         // border: '1px solid white',
        height: 25,
        cursor: 'pointer',
    }
}
