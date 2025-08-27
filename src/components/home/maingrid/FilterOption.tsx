import React, { SetStateAction, useState } from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";

import Button from "../../commons/Button";
import { useMediaQuery } from "react-responsive";

type Props = {
    style?: React.CSSProperties,
    FilterTasks: () => void;
    FilterState: any,
}

export default function FilterOption(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });

    return (
        <div style={Object.assign({}, isBigScreen ? styles.container : styles.smallContainer, props.style)}>
            <Button
             title="filter by:"
             style={isBigScreen ? styles.filterBy : styles.smallFilterBy}
             titleStyle={styles.text}
            />
            <Button
                title={props.FilterState}
                style={Object.assign({},
                    isBigScreen ? styles.button : styles.smallButton,
                    { border: props.FilterState === "status" ?
                    `3px solid ${colors.surface}` :
                    `3px solid ${colors.textSecondary}` }
                )}
                titleStyle={styles.text}
                onButtonPress={props.FilterTasks}
            />
        </div>
    )
}

const styles : {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        flex: 1,
        justifyContent: 'flex-end',
        paddingRight: 10,
    },
    smallContainer: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'flex-start',
    },
    button: {
        border: `3px solid ${colors.surface}`,
        borderRadius: '15px',
        width: 'auto',
        padding: 10,
        margin: '20px 0',
        backgroundColor: colors.border,
        alignContent: 'center',
    },
    filterBy: {
        border: `3px solid ${colors.surface}`,
        backgroundColor: colors.background,
        width: 'auto',
        padding: 10,
        margin: '20px 0',
        pointerEvents: 'none',
    },
    text: {
        color: colors.textSecondary,
        fontSize: typography.caption
    },
    smallButton: {
        border: `3px solid ${colors.surface}`,
        borderRadius: '15px',
        width: 'auto',
        padding: 0,
        margin: '25px 0px',
        backgroundColor: colors.border,
        alignContent: 'center',
    },
    smallFilterBy: {
        border: `3px solid ${colors.surface}`,
        backgroundColor: colors.background,
        width: 'auto',
        padding: 0,
        margin: '25px 0px',
        pointerEvents: 'none',
        alignContent: 'center',
    },
}