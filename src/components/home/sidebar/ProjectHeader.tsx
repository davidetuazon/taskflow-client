import React, { useState } from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import Text from "../../commons/Text";
import Button from "../../commons/Button";


export default function ProjectHeader() {
    const isBigScreen = useMediaQuery({ minWidth: 768});
    const navigate = useNavigate();
    const [isHovered,setIsHovered] = useState<string | null>(null);

    return (
        <div style={styles.container}>
            <Text variant="title">
                Projects
            </Text>
            {isBigScreen && (
                <Button
                    title="New"
                    style={{
                        ...styles.button,
                        backgroundColor: isHovered === 'new' ?colors.primaryLight : colors.primary,
                    }}
                    titleStyle={styles.buttonText}
                    onButtonPress={() =>navigate('/projects')}
                    onMouseEnter={() => setIsHovered('new')}
                    onMouseLeave={() => setIsHovered(null)}
                />
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
        padding: '5px 0px',
        width: 'auto',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    text: {
        fontSize: typography.subtitle,
        color: colors.textPrimary,
        padding: 0,
        margin: 0,
    }
}