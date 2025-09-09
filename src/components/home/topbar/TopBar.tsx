import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import TopBarLeft from "./TopBarLeft";
import TopBarMid from "./TopBarMid";
import TopBarRight from "./TopBarRight";
import { useAuth } from "../../../providers/AuthProvider";

type Props = {
    style?: React.CSSProperties,
    username: any,
}

export default function TopBar(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 796 });

    return (
        <div style={styles.container}>
            <TopBarLeft />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <TopBarMid
                    style={
                        isBigScreen ?
                        { flex: 1 } :
                        { flex: 'none' }
                    }
                />
                <TopBarRight
                    style={Object.assign({}, styles.topbarRight)}
                    username={props.username}
                />
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        margin: 0,
        padding: '0px 20px',
        flex: 1,
        justifyContent: 'space-between',
        minHeight: '50px',
    },
    topbarRight: {
        paddingLeft: 20,
    }
}