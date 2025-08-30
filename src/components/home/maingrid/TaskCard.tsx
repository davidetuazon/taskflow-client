import React, { useEffect, useState } from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import Container from "../../commons/Container";
import Text from "../../commons/Text";
import Button from "../../commons/Button";
import TaskModal from "./TaskModal";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    style?: React.CSSProperties,
    markAsDone: (taskId: string) => void,
    deleteTask: (taskId: string) => void,
    task: any,
    onUpdate: (id: string, payload) => void | Promise<void>,
}

export default function TaskCard(props: Props) {
    const { _id, title, description, status, dueDate } = props.task;
    const navigate = useNavigate();
    const location = useLocation();

    const isModalOpen =
        location.pathname === `/tasks/${_id}/done` ||
        location.pathname === `/tasks/${_id}/edit` ||
        location.pathname === `/tasks/${_id}/delete`;

    const overDue = new Date(dueDate).getTime() > Date.now();

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
                    {title}
                </Text>
            </div>
            <div style={styles.body}>
                <p style={styles.p}>
                    Due:
                </p>
                <Text variant="subtitle"
                    textStyle={{ 
                        color: new Date(dueDate).getTime() > Date.now() ?
                            colors.textPrimary :
                            'red'
                        }}
                >
                    {dueDate.split("T")[0]}
                </Text>
                <p style={styles.p}>
                    Status:
                </p>
                <Text variant="subtitle">
                    {status}
                </Text>
                <p style={styles.p}>
                    Description:
                </p>
                <Text variant="subtitle">
                    {description}
                </Text>
            </div>
            <div style={styles.footer}>
                <Button
                    title="Done"
                    style={{
                        ...styles.button,
                        pointerEvents: status === 'done' ? 'none' : 'auto'
                    }}
                    titleStyle={{ color: status === 'done' ? colors.darkBorder : colors.accent }}
                    onButtonPress={() => navigate(`/tasks/${_id}/done`)}
                />
                <Button
                    title="Edit"
                    style={styles.button}
                    titleStyle={{ color: colors.secondary }}
                    onButtonPress={() => navigate(`/tasks/${_id}/edit`)}
                />
                <Button
                    title="Delete"
                    style={styles.button}
                    titleStyle={{ color: 'red' }}
                    onButtonPress={() => navigate(`/tasks/${_id}/delete`)}
                />
                <TaskModal
                    isOpen={isModalOpen}
                    onClose={() => navigate(-1)}
                    markAsDone={props.markAsDone}
                    deleteTask={props.deleteTask}
                    onUpdate={props.onUpdate}
                    task={props.task}
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