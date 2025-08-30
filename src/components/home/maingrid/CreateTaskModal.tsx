import React from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { mustNotBeEmptyOrSpace } from "../../../utils/validators";

import PopUpModal from "../../commons/PopUpModal";
import Button from "../../commons/Button";
import Text from "../../commons/Text";
import TextInput from "../../commons/TextInputs";

type Props = {
    isOpen: boolean,
    createTask: (payload) => void | Promise<void>, 
}

type Inputs = {
    title: string,
    description: string,
    status: string,
    dueDate: string,
}

export default function CreateTaskModal(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<Inputs>({
        defaultValues: {
            dueDate: new Date().toISOString().split("T")[0],
            status: 'todo',
        }
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!data) return;
        const payload: {
            title: string,
            description: string,
            status: string,
            dueDate: string,
        } = {
            title: data.title,
            description: data.description,
            status: data.status,
            dueDate: data.dueDate,
        };
        navigate(-1);
        try {
            await props.createTask(payload);
        } catch (e) {
            console.error("Failed to create new task", e);
        }
    }

    if (location.pathname.endsWith('create')) {
        return (
        <PopUpModal
            isOpen={props.isOpen}
            onClose={() => navigate(-1)}
            containerStyle={styles.container}
        >
            <div style={{...styles.body, padding: isBigScreen ? '10px 20px' : 0 }}>
                <Text variant="heading">
                    Create New Task
                </Text>
                <form style={styles.form}>
                    <TextInput
                        textProps={{
                            placeholder: 'Task Title',
                            ...register('title', {
                                validate: {
                                    mustNotBeEmptyOrSpace
                                }
                            })
                        }}
                        error = {errors.title?.message}
                    />
                    <div style={styles.fieldContainer}>
                        <input
                            type='date'
                            {...register('dueDate')}
                            style={styles.selectField}
                        />
                    </div>
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
                    <TextInput
                        style={{ marginTop: 35 }}
                        textProps={{
                            placeholder: 'Task Description',
                            ...register('description', {
                                validate: {
                                    mustNotBeEmptyOrSpace
                                }
                            })
                        }}
                        error = {errors.description?.message}
                    />
                    <div style={styles.footer}>
                        <Button 
                            title="Cancel"
                            style={styles.cancelButton}
                            titleStyle={{ fontSize: typography.title, color: colors.textSecondary }}
                            onButtonPress={() => navigate(-1)}
                        />
                        <Button
                            title="Add"
                            style={styles.createButton}
                            titleStyle={{ fontSize: typography.title, color: colors.primary }}
                            onButtonPress={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </PopUpModal>
        );
    }
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        backgroundColor: colors.background,
        // padding: 20,
        borderRadius: '23px',
        minWidth: '300px',
        maxWidth: '450px',
        border: `6px solid ${colors.primary}`
    },
    body: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    form: {
        // border: '1px solid red',
        textAlign: 'start',
        padding: '10px 20px',
    },
    fieldContainer: {
        backgroundColor: colors.surface,
        border: `3px solid ${colors.primary}`,
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
    createButton: {
        border: `4px solid ${colors.darkBorder}`,
        // width: 'auto',
        padding: '20px 30px',
        backgroundColor: colors.border,
        textAlign: 'center',
        alignContent: 'center'
    },
    cancelButton: {
        border: `4px solid ${colors.surface}`,
        // width: 'auto',
        padding: '20px 30px',
        backgroundColor: colors.border,
        textAlign: 'center',
        alignContent: 'center'
    }
}