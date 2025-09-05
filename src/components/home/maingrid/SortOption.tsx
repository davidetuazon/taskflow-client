import React, { SetStateAction, useState } from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";

import Button from "../../commons/Button";
import { useMediaQuery } from "react-responsive";

type Props = {
    style?: React.CSSProperties,
    SortTasks: () => void,
}

type SortOption = 'default' | 'dueDate';

export default function SortOption(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const [active, setActive] = useState<SortOption>('default');

    return (
        <div style={Object.assign({}, isBigScreen ? styles.container : styles.smallContainer, props.style)}>
            <Button
             title="sort by:"
             style={isBigScreen ? styles.sortBy : styles.smallSortBy}
             titleStyle={styles.text}
            />
            <Button
                title="due date"
                style={Object.assign({},
                    isBigScreen ? styles.button : styles.smallButton,
                    {border: active === "dueDate" ?
                    `3px solid ${colors.textSecondary}`
                    : `3px solid ${colors.surface}`}
                )}
                titleStyle={styles.text}
                onButtonPress={() => {
                    setActive(prev => prev === 'dueDate' ? 'default' : 'dueDate');
                    props.SortTasks();
                }}
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
        justifyContent: 'flex-end',
    },
    smallContainer: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'flex-start',
        width: 'auto',
        flex: 1,
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
    sortBy: {
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
    smallSortBy: {
        border: `3px solid ${colors.surface}`,
        backgroundColor: colors.background,
        width: 'auto',
        padding: 0,
        margin: '25px 0',
        pointerEvents: 'none',
    },
}