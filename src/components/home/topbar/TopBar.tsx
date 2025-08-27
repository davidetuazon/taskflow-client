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
            <TopBarLeft style={
                            isBigScreen ?
                            { flex: 1, paddingLeft: 20, } :
                            { padding: 5 }}
            />
            <TopBarMid style={
                            isBigScreen ?
                            {} :
                            { flex: 1, padding: 5, }}
            />
            <TopBarRight style={Object.assign({}, {flex: isBigScreen ? 1 : 'none'}, styles.topbarRight)} />
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
    },
    topbarRight: {
        paddingRight: 20,
        paddingLeft: 5,
    }
}