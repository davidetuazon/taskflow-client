import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { mustNotBeEmptyOrSpace } from "../../utils/validators";
import { useParams } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { createTask } from "../../services/api";

import TextInput from "../commons/TextInputs";
import Text from "../commons/Text";
import Button from "../commons/Button";
import Select from "../commons/Select";

type Props = {
    style?: React.CSSProperties,
    setTask: React.Dispatch<React.SetStateAction<any[]>>,
    project: any,
}

type Inputs = {
    title: string,
    description: string,
    dueDate: string,
    assignedTo: string,
}

type Options = {
    value: string,
    label: string,
}

export default function TaskCreateForm(props: Props) {
    const { user } = useAuth();
    const { slug } = useParams();
    const { register, handleSubmit, reset, trigger, setValue, watch, formState: { errors, isSubmitting } } = useForm<Inputs>({
        defaultValues: {
            dueDate: new Date().toISOString().split('T')[0],
            description: "",
            assignedTo: "",
        }
    });

    const description = watch('description', '');
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if(!slug) return;
        const payload: {
            title: string,
            description: string,
            dueDate: string,
            assignedTo: string,
        } = {
            title: data.title,
            description: data.description,
            dueDate: data.dueDate || new Date().toISOString().split('T')[0],
            assignedTo: data.assignedTo || user?._id,
        }
        // console.log(payload);
        toast.promise(
            createTask(slug, payload)
            .then((response) => {
                props.setTask(prev => [response, ...prev]);
                reset();
            }), {
                loading: 'Creating new task...',
                success: 'New task created',
                error: 'Failed to create new task. Please try again.'
            }
        )
    }

    return (
        <div style={styles.container}>
            <Text
                variant="title"
                textStyle={styles.text}
            >
                Create new task
            </Text>
            <p style={styles.p}>
                Required fields are marked with an asterisk (*).
            </p>
            <form>
                <Text
                    variant="subtitle"
                    textStyle={styles.text}
                >
                    Task name *
                </Text>
                <TextInput
                    style={styles.fields}
                    textStyle={{ fontSize: typography.subtitle}}
                    textProps={{
                        ...register('title', {
                            validate: {
                                mustNotBeEmptyOrSpace,
                            }
                        })
                    }}
                    error = {errors.title?.message}
                />
                <p style={styles.p}>
                    Great names are short but descriptive.
                </p>
                <Text
                    variant="subtitle"
                    textStyle={styles.text}
                >
                    Task description
                </Text>
                <TextInput
                    style={styles.fields}
                    textStyle={{ fontSize: typography.subtitle}}
                    textProps={{
                        ...register('description'),
                        onChange: (e: any) => {
                            register('description').onChange(e);
                            trigger('description');
                        },
                        maxLength: 350
                    }}
                    error = {undefined}
                />
                <p style={styles.p}>
                    {description?.length} / 350 characters
                </p>
                <Text
                    variant="subtitle"
                    textStyle={styles.text}
                >
                    Task due date *
                </Text>
                <input
                    style={styles.dateField}
                    type='date'
                    {...register('dueDate')}
                />
                <p style={styles.p}>
                    Pick a due date. If you skip it, it'll be set to today.
                </p>
                <Text
                    variant="subtitle"
                    textStyle={styles.text}
                >
                    Assign to *
                </Text>
                <Select
                    label={`You (${user?.fullName})`}
                    options={props.project.members?.map((m: any) => (
                        { value: m._id, label: m.fullName}
                    )) || []}
                    value={watch('assignedTo')}
                    onSelect={(val) => setValue('assignedTo', val)}
                    error = {errors.assignedTo?.message}
                />
                <p style={styles.p}>
                    Who should handle this? By default, it's assigned to you.
                </p>
                <div style={styles.footer}>
                    <Button
                        title="Create new Task"
                        titleStyle={{ fontSize: typography.subtitle }}
                        style={{
                            ...styles.button,
                            backgroundColor: isHovered ? colors.darkBorder : colors.background,
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onButtonPress={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
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
        padding: 10,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.background
    },
    text: {
        // border: '1px solid red',
        marginTop: 5,
        marginBottom: 5,
    },
    p: {
        // border: '1px solid red',
        marginTop: 5,
        marginBottom: 10,
        fontSize: typography.caption,
        fontFamily: 'Poppins-Light',
        color: colors.textSecondary,
    },
    fields: {
        height: 35,
        // border: `2px solid ${colors.darkBorder}`,
    },
    dateField: {
        border: `2px solid ${colors.darkBorder}`,
        borderRadius: '13px',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'transparent',
        width: 'auto',
        height: 30,
        fontFamily: 'Poppins-SemiBold',
        fontSize: typography.subtitle,
        color: colors.textPrimary,
    },
    footer: {
        // border: '1px solid red',
        marginTop: 20,
        marginBottom: 5,
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