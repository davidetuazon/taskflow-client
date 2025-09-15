import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import sidebar from '../../../assets/icons/sidebar.svg';
import { useMediaQuery } from "react-responsive";

import Button from "../../commons/Button";
import Text from "../../commons/Text";

type Props = {
    style?: React.CSSProperties,
}

export default function TopBarLeft(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div style={ Object.assign({}, styles.container, props.style) }>
            {/* <div>
                {!isBigScreen && (
                    <img src={sidebar} style={isBigScreen ? styles.sidebar : styles.smallSidebar} />
                )}
            </div> */}
            <div
               style={{
                    ...styles.dashboard,
                    backgroundColor: isHovered ? colors.surface : colors.background,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link
                    to={'/'}
                    style={{
                        color: colors.primary,
                        textDecoration: 'none',
                    }}
                >
                    <Text
                        variant="heading"
                        textStyle={{ margin: 0 }}
                    >
                        Dashboard
                    </Text>
                </Link>
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    sidebar: {
        border: `1px solid ${colors.darkBorder}`,
        borderRadius: '8px',
        padding: '5px 5px',
        height: 35,
        cursor: 'pointer',
    },
    smallSidebar: {
        border: `1px solid ${colors.darkBorder}`,
        borderRadius: '8px',
        padding: '5px 5px',
        height: 25,
        cursor: 'pointer',
    },
    dashboard: {
        // border: '1px solid red',
        backgroundColor: colors.background,
        width: 'auto',
        alignContent: 'center',
        margin: 0,
        padding: '0px 5px',
        borderRadius: '8px',
    }
}