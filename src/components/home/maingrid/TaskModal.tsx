import React, { use, useEffect } from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import { useLocation, useParams } from "react-router-dom";

import Text from "../../commons/Text";
import TextInput from "../../commons/TextInputs";
import Button from "../../commons/Button";
import PopUpModal from "../../commons/PopUpModal";
import Container from "../../commons/Container";
import EditTaskModal from "./EditTaskModal";

type Props = {
    style?: React.CSSProperties,
    isOpen: boolean,
    onClose: () => void,
    markAsDone: (taskId: string) => void,
    deleteTask: (taskId: string) => void,
    task: any,
    onUpdate: (id: string, payload) => void | Promise<void>,
}

export default function TaskModal(props: Props) {
    const { _id, title } = props.task;
    const location = useLocation();

    if (location.pathname.endsWith('done')) {
        return (
            <PopUpModal
                isOpen={props.isOpen}
                onClose={props.onClose}
                containerStyle={{...styles.container, border: `6px solid ${colors.accent}`}}
            >
                <Text variant="title" style={styles.text}>
                    Mark "{title}" as done?
                </Text>
                <div style={styles.footer}>
                    <Button 
                        title="No"
                        onButtonPress={props.onClose}
                        style={styles.noButton}
                        titleStyle={{ fontSize: typography.title, color: colors.textSecondary }}
                    />
                    <Button 
                        title="Yes"
                        onButtonPress={() => {
                            if (!_id) return;
                            props.markAsDone(_id);
                            props.onClose();
                        }}
                        style={styles.yesButton}
                        titleStyle={{ fontSize: typography.title,  color: colors.accent }}
                    />
                </div>
            </PopUpModal>
        );
    }

    if (location.pathname.endsWith('edit')) {
        return (
            <EditTaskModal
                task={props.task}
                onUpdate={props.onUpdate}
                IsOpen={props.isOpen}
                OnClose={props.onClose}
            />
        );
    }

    if (location.pathname.endsWith('delete')) {
        return (
            <PopUpModal
                isOpen={props.isOpen}
                onClose={props.onClose}
                containerStyle={{...styles.container, border: '6px solid red'}}
            >
                <Text variant="title" style={styles.text}>
                    This will delete "{title}". Are you sure?
                </Text>
                <div style={styles.footer}>
                    <Button 
                        title="No"
                        onButtonPress={props.onClose}
                        style={styles.noButton}
                        titleStyle={{ fontSize: typography.title, color: colors.textSecondary }}
                    />
                    <Button 
                        title="Yes"
                        onButtonPress={() => {
                            if (!_id) return;
                            props.deleteTask(_id);
                            props.onClose();
                        }}
                        style={styles.yesButton}
                        titleStyle={{ fontSize: typography.title,  color: 'red' }}
                    />
                </div>
            </PopUpModal>
        );
    }
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        backgroundColor: colors.background,
        padding: 20,
        margin: 30,
        borderRadius: '23px',
        minWidth: '300px',
        maxWidth: '450px',
    },
    text: {
        // border: '1px solid red',
        padding: '30px 20px',
    }, 
    footer: {
        // border: '1px solid red',
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // gap: 20,
    },
    yesButton: {
        border: `4px solid ${colors.darkBorder}`,
        width: 'auto',
        padding: '20px 30px',
        backgroundColor: colors.border,
        textAlign: 'center',
    },
    noButton: {
        border: `4px solid ${colors.surface}`,
        width: 'auto',
        padding: '20px 30px',
        backgroundColor: colors.border,
        textAlign: 'center',
    }
}