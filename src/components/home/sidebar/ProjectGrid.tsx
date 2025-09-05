import React from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import ProjectHeader from "./ProjectHeader";
import ProjectNameCard from "./ProjectNameCard";

type Props = {
    style?: React.CSSProperties,
    project: any,
}

export default function ProjectGrid(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 768});
    const navigate = useNavigate()

    return (
        <div style={isBigScreen ? styles.containerBigScreen : styles.container}>
            <div style={styles.mainCard}>
                <div style={styles.header}>
                    <ProjectHeader />
                </div>
                <div style={isBigScreen ? styles.body : styles.smallBody}>
                    {props.project.map((p: any) => (
                            <div key={p._id} onClick={() => navigate(`/projects/${p.slug}/tasks`, { replace: true })}>
                                <ProjectNameCard project={p} />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    containerBigScreen: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderRight: `1px solid ${colors.darkBorder}`,
        position: 'sticky',
        top: 0,
        left: 0,
        height: '98dvh',
        backgroundColor: colors.surface,
        // flex: 1,
    },
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: 15,
        height: '90%',
        // backgroundColor: colors.surface,
        // borderRadius: '12px',
    },
    mainCard: {
        // border: '2px solid red',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        overflowY: 'auto',
    },
    header: {
        // border: '2px solid red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    body: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 10,
        padding: 20,
        overflow: 'auto',
    },
    smallBody: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 10,
        padding: 20,
        backgroundColor: colors.surface,
        borderRadius: '12px',
        overflow: 'auto',
    }
}