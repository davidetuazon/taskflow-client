import React, { useState } from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";

import Text from "../../commons/Text";
import Button from "../../commons/Button";

type Props = {
    style?: React.CSSProperties,
    username: any,
}

export default function ProjectHeader(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 768});
    const navigate = useNavigate();
    const [isHovered,setIsHovered] = useState<string | null>(null);

    return (
        <div style={styles.container}>
            <Text variant="title">
                Projects
            </Text>
            {isBigScreen && (
                <Link
                    to={`/${props.username}/new`}
                    style={styles.link}
                >
                    <div
                        style={{
                            ...styles.button,
                            backgroundColor: isHovered === 'new' ?colors.primaryLight : colors.primary,
                        }}
                        onMouseEnter={() => setIsHovered('new')}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <Text
                            variant="subtitle"
                            style={styles.text}
                        >
                            New
                        </Text>
                    </div>
                </Link>
            )}
        </div>
    )
}

const styles : {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        gap: 20,
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
    },
    button: {
        margin: '10px 0px',
        padding: '5px 15px',
        width: 'auto',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    text: {
        margin: 0,
    },
    link: {
        // border: '1px solid red',
        color: colors.textPrimary,
        textDecoration: 'none',
    }
}