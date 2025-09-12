import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";
import { useForm, SubmitHandler } from "react-hook-form";
import { mustNotBeEmptyOrSpace } from "../../utils/validators";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateTask } from "../../services/api";

import Text from "../commons/Text";
import TextInput from "../commons/TextInputs";
import Select from "../commons/Select";
import Button from "../commons/Button";

type Props = {
    style?: React.CSSProperties,
    task: any,
    setTask: React.Dispatch<React.SetStateAction<any>>,
}

type Inputs = {
    title: string,
    description: string,
    status: string,
    dueDate: string,
}

type StatusOption = 'open' | 'in-progress' | 'in-review' | 'done';

export default function TaskForm(props: Props) {
    const { username, slug, id } = useParams();
    const statusOptions: StatusOption[] = ['open', 'in-progress', 'in-review', 'done'];
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const { register, handleSubmit, watch, reset, setValue, formState: { errors, isDirty } } = useForm<Inputs>({
        defaultValues: {
           title: props.task.title,
           status: props.task.status,
           dueDate: props.task.dueDate?.split('T')[0],
           description: props.task.description,
        }
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!username || !slug || !id) return;
        const payload: {
            title: string,
            status: string,
            dueDate: string,
            description: string,
        } = {
            title: data.title,
            status: data.status || props.task.status,
            dueDate: data.dueDate || props.task.dueDate?.split('T')[0],
            description: data.description || props.task.description,
        }
        console.log();

        toast.promise(
            updateTask(username, slug, id, payload)
            .then((response) => {
                props.setTask(response);
                reset();
            }), {
                loading: 'Updating task...',
                success: 'Task update successful',
                error: 'Failed to update task. Please try again.'
            }
        )
    }

    useEffect(() => {
        if (props.task) {
            reset({
                title: props.task.title,
                status: props.task.status,
                dueDate: props.task.dueDate?.split('T')[0],
                description: props.task.description,
            });
        }
    }, [props.task, reset]);

    return (
        <div style={styles.container}>
            <form style={styles.form}>
                <Text
                    variant="title"
                    style={{
                        ...styles.text,
                        marginTop: 10,
                    }}
                >
                    Task name:
                </Text>
                <TextInput
                    style={styles.fields}
                    textStyle={{ fontSize: typography.subtitle }}
                    textProps={{
                        ...register('title', {
                            validate: {
                                mustNotBeEmptyOrSpace
                            }
                        })
                    }}
                    error = {errors.title?.message}
                />
                <Text
                    variant="title"
                    style={styles.text}
                >
                    Task status:
                </Text>
                <Select
                    label="current status"
                    options={statusOptions.map((opt: string) => (
                        { value: opt, label: opt }
                    ))}
                    value={watch('status') || props.task.status}
                    onSelect={(val) => setValue('status', val, {shouldDirty: true})}
                    error = {errors.status?.message}
                />
                <Text
                    variant="title"
                    style={styles.text}
                >
                    Task due date:
                </Text>
                <input
                    style={styles.dateField}
                    type="date"
                    {...register('dueDate')}
                />
                <Text
                    variant="title"
                    style={styles.text}
                >
                    Task description:
                </Text>
                <TextInput
                    style={styles.fields}
                    textProps={{
                        ...register('description', {
                            validate: {
                                mustNotBeEmptyOrSpace
                            }
                        })
                    }}
                    error = {errors.description?.message}
                />
                <div style={styles.formFooter}>
                    <Button
                        title="Update Task"
                        style={{
                            ...styles.button,
                            backgroundColor: isHovered ? colors.primaryLight : colors.primary,
                            opacity: isDirty ? 1 : 0.8,
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onButtonPress={handleSubmit(onSubmit)}
                        disabled={!isDirty}
                    />
                </div>
            </form>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        border: `1px solid ${colors.darkBorder}`,
        borderRadius: '8px',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background,
        // flex: 1,
    },
    form: {
        padding: 10,
    },
    text: {
        // border: '1px solid red',
        marginTop: 20,
        marginBottom: 0,
    },
    fields: {
        height: 30,
        width: 'auto',
        borderRadius: '8px',
    },
    dateField: {
        border: `2px solid ${colors.darkBorder}`,
        borderRadius: '8px',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'transparent',
        width: 'auto',
        height: 30,
        fontFamily: 'Poppins-SemiBold',
        fontSize: typography.subtitle,
        color: colors.textPrimary,
    },
    formFooter: {
        // border: '1px solid red',
        marginTop: 20,
        marginBottom: 10,
        justifyItems: 'end',
    },
    button: {
        padding: '5px 10px',
        width: 'auto',
        margin: 0,
        borderRadius: '8px',
        border: `1px solid ${colors.darkBorder}`,
    },
}