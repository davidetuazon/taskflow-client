import React from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import { useLocation, useParams } from "react-router-dom";

import Text from "../../commons/Text";
import TextInput from "../../commons/TextInputs";
import Button from "../../commons/Button";
import PopUpModal from "../../commons/PopUpModal";
import Container from "../../commons/Container";

type Props = {
    style?: React.CSSProperties,
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
                containerStyle={styles.container}
            >
                <Text variant="title">
                    Mark this task as done?
                </Text>
                <div style={styles.footer}>
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
                    <Button 
                        title="No"
                        onButtonPress={props.OnClose}
                        style={styles.noButton}
                        titleStyle={{ fontSize: typography.title, color: 'red' }}
                    />
                </div>
            </PopUpModal>
        );
    }

    if (location.pathname.endsWith('edit')) {
        return (
            <PopUpModal isOpen={props.IsOpen} onClose={props.OnClose}>
                <Text variant="title">
                    {id}
                </Text>
            </PopUpModal>
        );
    }

    if (location.pathname.endsWith('delete')) {
        return (
            <PopUpModal
                isOpen={props.IsOpen}
                onClose={props.OnClose}
                containerStyle={styles.container}
            >
                <Text variant="title">
                    Are you sure you want to delete this task?
                </Text>
                <div style={styles.footer}>
                    <Button 
                        title="Yes"
                        onButtonPress={() => {
                            if (!id) return;
                            props.DeleteTask(id);
                            props.OnClose();
                        }}
                        style={styles.yesButton}
                        titleStyle={{ fontSize: typography.title,  color: colors.accent }}
                    />
                    <Button 
                        title="No"
                        onButtonPress={props.OnClose}
                        style={styles.noButton}
                        titleStyle={{ fontSize: typography.title, color: 'red' }}
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
        border: `4px solid ${colors.darkBorder}`
    },
    footer: {
        // border: '1px solid red',
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
    },
    yesButton: {
        border: `4px solid ${colors.surface}`,
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