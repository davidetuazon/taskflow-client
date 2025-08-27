import React from "react";
import { useMediaQuery } from "react-responsive";

import Text from "../../commons/Text";
import SortOption from "./SortOption";
import FilterOption from "./FilterOption";

type Props = {
    style?: React.CSSProperties,
    SortTasks: () => void;
    FilterTasks: () => void;
    FilterState: any,
}

export default function GridHeader(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });

    return (
        <>
            <div style={styles.left}>
                <Text variant={isBigScreen ? 'title' : 'subtitle'}>
                    Your TaskFlow
                </Text>
            </div>
            <div style={styles.right}>
                {isBigScreen && (
                    <>
                        <FilterOption
                            FilterTasks={props.FilterTasks}
                            FilterState={props.FilterState}
                        />
                        <SortOption
                            SortTasks={props.SortTasks}
                        />
                    </>
                    
                )}
            </div>
        </>
        
    );
}

const styles : {[key: string]: React.CSSProperties} = {
    left: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        paddingLeft: 10,
    },
    right: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        paddingRight: 10,
    },
}