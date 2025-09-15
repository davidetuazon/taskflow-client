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
    const isBigScreen = useMediaQuery({ minWidth: 768 });

    return (
        <div style={{
            ...styles.container,
            padding: isBigScreen ? '0px 20px' : '0px 10px',
            }}>
            <TopBarLeft />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    }}
            >
                <TopBarMid 
                    style={{
                        padding: isBigScreen ? '0px 20px' : '0px 10px'
                    }}
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
    },
    topbarRight: {
        width: '10%',
    }
}