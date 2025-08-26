import React, { SetStateAction, useState } from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";

import Button from "../../commons/Button";

type Props = {
    style?: React.CSSProperties,
}

type SortOption = 'default' | 'status';

export default function FilterOption(props: Props) {
    const [active, setActive] = useState<SortOption>('default');

    return (
        <div style={Object.assign({}, styles.container, props.style)}>
            <Button
             title="filter by:"
             style={styles.sortBy}
             titleStyle={styles.text}
             onButtonPress={() => {
                setActive('default');
             }}
            />
            <Button
                title="status"
                style={{
                    ...styles.button,
                    border: active === "status" ?
                    `3px solid ${colors.textSecondary}`
                    : `3px solid ${colors.surface}`
                }}
                titleStyle={styles.text}
                onButtonPress={() => {
                    setActive(prev => prev === 'status' ? 'default' : 'status');
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
        flex: 1,
        justifyContent: 'flex-end',
        paddingRight: 10,
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