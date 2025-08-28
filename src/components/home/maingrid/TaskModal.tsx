import React from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import { useLocation, useParams } from "react-router-dom";

import Text from "../../commons/Text";
import TextInput from "../../commons/TextInputs";
import Button from "../../commons/Button";
import PopUpModal from "../../commons/PopUpModal";
import Container from "../../commons/Container";
import EditTasKModal from "./EditTaskModal";

type Props = {
    style?: React.CSSProperties,
    Title: string,
    IsOpen: boolean,
    OnClose: () => void,
    MarkAsDone: (taskId: string) => void,
    DeleteTask: (taskId: string) => void,
}

export default function TaskModal(props: Props) {
    const { id } = useParams();
    const location = useLocation();

    if (location.pathname.endsWith('done')) {
        return (
            <PopUpModal
                isOpen={props.IsOpen}
                onClose={props.OnClose}
                containerStyle={{...styles.container, border: `6px solid ${colors.accent}`}}
            >
                <Text variant="title" style={styles.text}>
                    Mark "{props.Title}" as done?
                </Text>
                <div style={styles.footer}>
                    <Button 
                        title="No"
                        onButtonPress={props.OnClose}
                        style={styles.noButton}
                        titleStyle={{ fontSize: typography.title, color: colors.textSecondary }}
                    />
                    <Button 
                        title="Yes"
                        onButtonPress={() => {
                            if (!id) return;
                            props.MarkAsDone(id);
                            props.OnClose();
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
            <EditTasKModal Title={props.Title} IsOpen={props.IsOpen} OnClose={props.OnClose} />
        );
    }

    if (location.pathname.endsWith('delete')) {
        return (
            <PopUpModal
                isOpen={props.IsOpen}
                onClose={props.OnClose}
                containerStyle={{...styles.container, border: '6px solid red'}}
            >
                <Text variant="title" style={styles.text}>
                    This will delete "{props.Title}". Are you sure?
                </Text>
                <div style={styles.footer}>
                    <Button 
                        title="No"
                        onButtonPress={props.OnClose}
                        style={styles.noButton}
                        titleStyle={{ fontSize: typography.title, color: colors.textSecondary }}
                    />
                    <Button 
                        title="Yes"
                        onButtonPress={() => {
                            if (!id) return;
                            props.DeleteTask(id);
                            props.OnClose();
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