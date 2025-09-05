import React, { useEffect } from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateTask } from "../../../services/api";

import Text from "../../commons/Text";
import TextInput from "../../commons/TextInputs";
import Button from "../../commons/Button";
import PopUpModal from "../../commons/PopUpModal";
import { useMediaQuery } from "react-responsive";

type Props = {
    style?: React.CSSProperties,
    task: any,
    onUpdate: (id: string, payload) => void | Promise<void>,
    IsOpen: boolean,
    OnClose: () => void,
}

type Inputs = {
    title: string,
    description: string,
    status: string,
    dueDate: string,
}

export default function EditTasKModal(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const { _id, title, description, status, dueDate } = props.task;
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>({
        defaultValues: {
            title: title,
            description: description,
            status: status,
            dueDate: dueDate?.slice(0, 10)
        }
    });
    
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!_id) return;

        // handle empty fields
        const fallback = (field: string, prev: string) => field.trim() === "" ? prev: field;
        const payload = {
            title: fallback(data.title, title),
            description: fallback(data.description, description),
            status: fallback(data.status, status),
            dueDate: fallback(data.dueDate, dueDate)
        };
        props.OnClose();
        try {
            await props.onUpdate(_id, payload);
        } catch (e) {
            console.error({ message: e });
        }
    }

    return (
        <PopUpModal
            isOpen={props.IsOpen}
            onClose={props.OnClose}
            containerStyle={styles.container}
        >
            <div style={{...styles.body, padding: isBigScreen ? '10px 20px' : 0 }}>
                <form style={styles.form}>
                    <Text variant="subtitle">
                        Title:
                    </Text>
                    <TextInput
                        style={{ border: `3px solid ${colors.secondary}` }}
                        textProps={{
                            placeholder: `${title}`,
                            ...register('title')
                        }}
                        error = {errors.title?.message}
                    />
                    <Text variant="subtitle">
                        Due:
                    </Text>
                    <div style={styles.fieldContainer}>
                        <input
                            type='date'
                            {...register('dueDate')}
                            style={styles.selectField}
                        />
                    </div>
                    <Text variant="subtitle">
                        Status:
                    </Text>
                    <div style={styles.fieldContainer}>
                        <select
                            {...register('status')}
                            style={styles.selectField}
                        >
                            <option value='todo' >todo</option>
                            <option value='in-progress'>in-progress</option>
                            <option value='done'>done</option>
                        </select>
                    </div>
                    <Text variant="subtitle">
                        Description:
                    </Text>
                    <TextInput
                        style={{ marginTop: 35, border: `3px solid ${colors.secondary}` }}
                        textProps={{
                            placeholder: `${description}`,
                            ...register('description')
                        }}
                        error = {errors.description?.message}
                    />
                    <div style={styles.footer}>
                        <Button 
                            title="No"
                            onButtonPress={props.OnClose}
                            style={styles.noButton}
                            titleStyle={{ fontSize: typography.title, color: colors.textSecondary }}
                        />
                        <Button
                            title="Update"
                            style={styles.yesButton}
                            titleStyle={{ fontSize: typography.title, color: colors.secondary }}
                            onButtonPress={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </PopUpModal>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        backgroundColor: colors.background,
        // padding: 20,
        // margin: 30,
        borderRadius: '23px',
        minWidth: '300px',
        maxWidth: '450px',
        border: `6px solid ${colors.secondary}`
    },
    body: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    form: {
        // border: '1px solid red',
        textAlign: 'start',
        padding: '10px 20px',
    },
    fieldContainer: {
        backgroundColor: colors.surface,
        border: `3px solid ${colors.secondary}`,
        borderRadius: 12,
        paddingLeft: 15,
        paddingRight: 15,
        height: 45,
        marginBottom: 10,
        marginTop: 35,
    },
    selectField: {
        border: 'none',
        backgroundColor: 'transparent',
        width: '100%',
        outline: 'none',
        height: 'inherit',
        fontFamily: 'Poppins-SemiBold',
        fontSize: typography.subtitle,
        color: colors.textPrimary,
    },
    footer: {
        // border: '1px solid red',
        display: 'flex',
        marginTop: 25,
        justifyContent: 'space-between',
        gap: 10,
    },
    yesButton: {
        border: `4px solid ${colors.darkBorder}`,
        // width: 'auto',
        padding: '20px 30px',
        backgroundColor: colors.border,
        textAlign: 'center',
        alignContent: 'center'
    },
    noButton: {
        border: `4px solid ${colors.surface}`,
        // width: 'auto',
        padding: '20px 30px',
        backgroundColor: colors.border,
        textAlign: 'center',
        alignContent: 'center'
    }
}