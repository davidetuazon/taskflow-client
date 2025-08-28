import React, { useState } from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import Container from "../../commons/Container";
import Text from "../../commons/Text";
import Button from "../../commons/Button";
import TaskModal from "./TaskModal";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    style?: React.CSSProperties,
    Title: string,
    Description: string,
    Status: string,
    DueDate: string,
    TaskID: string,
    MarkAsDone: (taskId: string) => void,
    DeleteTask: (taskId: string) => void,
}

export default function TaskCard(props: Props) {
    const { Title, Description, Status, DueDate, TaskID, } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const isModalOpen =
        location.pathname === `/tasks/${TaskID}/done` ||
        location.pathname === `/tasks/${TaskID}/edit` ||
        location.pathname === `/tasks/${TaskID}/delete`;

    const overDue = new Date(DueDate).getTime() > Date.now();

    return (
        <Container style={{
                    ...styles.container,
                    border: overDue ?
                        `3px solid ${colors.darkBorder}` :
                        '3px solid rgba(255, 0, 0, 0.35)',
                    }}
        >
            <div style={styles.title}>
                <Text variant="heading">
                    {Title}
                </Text>
            </div>
            <div style={styles.body}>
                <p style={styles.p}>
                    Due:
                </p>
                <Text variant="subtitle"
                    textStyle={{ 
                        color: new Date(DueDate).getTime() > Date.now() ?
                            colors.textPrimary :
                            'red'
                        }}
                >
                    {DueDate.split("T")[0]}
                </Text>
                <p style={styles.p}>
                    Status:
                </p>
                <Text variant="subtitle">
                    {Status}
                </Text>
                <p style={styles.p}>
                    Description:
                </p>
                <Text variant="subtitle">
                    {Description}
                </Text>
            </div>
            <div style={styles.footer}>
                <Button
                    title="Done"
                    style={{
                        ...styles.button,
                        pointerEvents: Status === 'done' ? 'none' : 'auto'
                    }}
                    titleStyle={{ color: Status === 'done' ? colors.darkBorder : colors.accent }}
                    onButtonPress={() => navigate(`/tasks/${TaskID}/done`)}
                />
                <Button
                    title="Edit"
                    style={styles.button}
                    titleStyle={{ color: colors.primary }}
                    onButtonPress={() => navigate(`/tasks/${TaskID}/edit`)}
                />
                <Button
                    title="Delete"
                    style={styles.button}
                    titleStyle={{ color: 'red' }}
                    onButtonPress={() => navigate(`/tasks/${TaskID}/delete`)}
                />
                <TaskModal
                    Title={props.Title}
                    IsOpen={isModalOpen}
                    OnClose={() => navigate(-1)}
                    MarkAsDone={props.MarkAsDone}
                    DeleteTask={props.DeleteTask}
                />
            </div>
        </Container>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // padding: 10,
        border: `3px solid ${colors.border}`,
        maxWidth: '350px',
        width: '310px',
        borderRadius: '23px',
        backgroundColor: colors.background,
    },
    title: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        paddingLeft: 20,
    },
    body: {
        // border: '1px solid red',
        textAlign: 'justify',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: '5px 20px',
    },
    footer: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 5,
    },
    button: {
        border: `1px solid ${colors.surface}`,
        width: 'auto',
        padding: 5,
        backgroundColor: colors.border,
    },
    p: {
        // border: '1px solid red',
        padding: 0,
        margin: 0,
        fontFamily: 'Poppins-SemiBold',
        fontSize: typography.caption,
        color: colors.textSecondary,
    }
}