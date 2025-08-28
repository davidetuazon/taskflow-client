import React from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import { useParams } from "react-router-dom";

import Text from "../../commons/Text";
import TextInput from "../../commons/TextInputs";
import Button from "../../commons/Button";
import PopUpModal from "../../commons/PopUpModal";

type Props = {
    style?: React.CSSProperties,
    Title: string,
    IsOpen: boolean,
    OnClose: () => void,
}

export default function EditTasKModal(props: Props) {
    const { id } = useParams();
    return (
        <PopUpModal
            isOpen={props.IsOpen}
            onClose={props.OnClose}
            containerStyle={styles.container}
        >
            <div style={styles.body}>

            </div>
            <div style={styles.footer}>
                <Button title="Update Task" />
            </div>
        </PopUpModal>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        backgroundColor: colors.background,
        padding: 20,
        margin: 30,
        borderRadius: '23px',
        minWidth: '300px',
        maxWidth: '450px',
        border: `6px solid ${colors.primary}`
    },
    body: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
    },
    footer: {
        // border: '1px solid red',
        display: 'flex',
    }
}