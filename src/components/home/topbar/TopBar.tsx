import React from "react";
import { useMediaQuery } from "react-responsive";

import TopBarLeft from "./TopBarLeft";
import TopBarMid from "./TopBarMid";
import TopBarRight from "./TopBarRight";

type Props = {
    style?: React.CSSProperties,
}

export default function TopBar(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 796 });
    return (
        <div style={styles.container}>
            <TopBarLeft style={ isBigScreen ? { flex: 1, paddingLeft: 20, } : { padding: 5, }} />
            <TopBarMid style={ isBigScreen ? {} : { padding: 5, }} />
            {isBigScreen && (
                <TopBarRight style={{ flex: 1, paddingRight: 45, }} />
            )}
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        position: 'sticky'
    }
}