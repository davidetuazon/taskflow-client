import React, { SetStateAction, useState } from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";

import Button from "../../commons/Button";

type Props = {
    style?: React.CSSProperties,
    DueDateSort: () => void,
    DefaultSort: () => void,
}

type SortOption = 'default' | 'dueDate';

export default function SortOption(props: Props) {
    const [active, setActive] = useState<SortOption>('default');

    return (
        <div style={Object.assign({}, styles.container, props.style)}>
            <Button
             title="sort by:"
             style={styles.sortBy}
             titleStyle={styles.text}
             onButtonPress={() => {
                setActive('default');
                props.DefaultSort();
             }}
            />
            <Button
                title="due date"
                style={{
                    ...styles.button,
                    border: active === "dueDate" ?
                    `3px solid ${colors.textSecondary}`
                    : `3px solid ${colors.surface}`
                }}
                titleStyle={styles.text}
                onButtonPress={() => {
                    setActive(prev => prev === 'dueDate' ? 'default' : 'dueDate');
                    props.DueDateSort();
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
    },
    text: {
        color: colors.textSecondary,
        fontSize: typography.caption
    }
}