import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { mustBeValidProjectName, mustNotBeEmptyOrSpace } from "../../utils/validators";
import { toast } from "react-hot-toast";
import deleteIcon from '../../assets/icons/delete.svg';
import { updateProject } from "../../services/api";
import { useMediaQuery } from "react-responsive";

import Text from "../commons/Text";
import TextInput from "../commons/TextInputs";
import Button from "../commons/Button";

type Props = {
    style?: React.CSSProperties,
    username: any,
    project: any,
    setProject: React.Dispatch<React.SetStateAction<any>>,
    isOpen: any,
    onClose: () => void,
}

type Inputs = {
    title: string,
    description: string,
}

export default function ProjectDetailSettings(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<string | null>(null);
    const { register, handleSubmit, trigger, watch, reset, setError, formState: { errors, isDirty, isSubmitting } } = useForm<Inputs>({
        defaultValues: {
            title: props.project.slug,
            description: props.project.description,
        }
    })
    const description = watch('description', '');

    useEffect(() => {
        if (props.isOpen === 'settings') {
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
        }
    }, [props.isOpen])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!slug) return;
        const payload: {
            title: string,
            description: string,
        } = {
            title: data.title,
            description: data.description,
        }
        // console.log(payload);
        try {
            const res = await updateProject(props.username, slug, payload);
            props.setProject(res);
            reset();
            if (res.slug && res.slug !== slug) {
                toast.success("Project updated successfully!");
                props.onClose();
                setTimeout(() => {
                    navigate(`/${props.username}/${res.slug}/tasks`)
                }, 400);
            }
        } catch (e: any) {
            if (e.message.includes('already exists')) {
                setError('title', {
                    type: 'server',
                    message: errors.title?.message ?
                        `${errors.title.message}` :
                        e.message,
                })
            } else {
                toast.error(e.message);
            }
        }
    }

    return (
        <div 
            style={{
                ...styles.container,
                ...(isVisible ? styles.containerVisible : {}),
                width: isBigScreen ? '50%' : '80%'
                }}
                onClick={(e) => e.stopPropagation()}
            >
            <div
                style={styles.header}
            >
                <Text
                    variant="subtitle"
                    style={{ margin: 0 }}
                >
                    Edit project details
                </Text>
                <div
                    style={{
                        cursor: 'pointer',
                        borderRadius: '8px',
                        backgroundColor: isHovered === 'delete' ? colors.surface : colors.background,
                    }}
                    onMouseEnter={() => setIsHovered('delete')}
                    onMouseLeave={() => setIsHovered(null)}
                >
                    <img
                        style={{
                            height: 20,
                            paddingTop: 5,
                            paddingLeft: 4,
                            paddingRight: 4,
                        }}
                        src={deleteIcon}
                    />
                </div>
            </div>
            <form style={styles.form}>
                <div
                    style={styles.body}
                >
                    <Text
                        variant="subtitle"
                        // style={{ border: '1px solid red' }}
                    >
                        Project name
                    </Text>
                    <TextInput
                        style={styles.fields}
                        textStyle={styles.text}
                        textProps={{
                            ...register('title', {
                                validate: {
                                    mustNotBeEmptyOrSpace,
                                    mustBeValidProjectName,
                                }
                            }),
                            onChange: (e) => {
                                register('title').onChange(e);
                                trigger('title')
                            }
                        }}
                        error = {errors.title?.message}
                    />
                    <Text
                        variant="subtitle"
                        // style={{ border: '1px solid red' }}
                    >
                        Description
                    </Text>
                    <TextInput
                        style={styles.fields}
                        textStyle={styles.text}
                        textProps={{
                            placeholder: "Short description of this project",
                            ...register('description'),
                            onChange: (e) => {
                                register('description').onChange(e);
                                trigger('description');
                            },
                            maxLength: 150
                        }}
                        error = {errors.description?.message}
                    />
                    <p style={styles.p}>
                        {description.length} / 150 characters
                    </p>
                    <div style={styles.footer}>
                        <Button
                            title="Cancel"
                            style={{
                                ...styles.cancelBtn,
                                backgroundColor: isHovered === 'cancel' ? colors.darkBorder : colors.surface,
                            }}
                            onMouseEnter={() => setIsHovered('cancel')}
                            onMouseLeave={() => setIsHovered(null)}
                            onButtonPress={props.onClose}
                        />
                        <Button
                            title="Save changes"
                            style={{
                                ...styles.updateBtn,
                                backgroundColor: isHovered === 'update' ? colors.primaryLight : colors.primary,
                                opacity: isDirty ? 1 : 0.8,
                            }}
                            onMouseEnter={() => setIsHovered('update')}
                            onMouseLeave={() => setIsHovered(null)}
                            onButtonPress={handleSubmit(onSubmit)}
                            disabled={!isDirty}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        border: `1px solid ${colors.darkBorder}`,
        borderRadius: "8px",
        backgroundColor: colors.surface,
        height: 'auto',
        opacity: 0,
        transform: "scale(0.95)",
        transition: "transform 0.4s ease, opacity 0.4s ease",
    },
    containerVisible: {
        opacity: 1,
        transform: "scale(1)",
    },
    header: {
        borderBottom: `1px solid ${colors.darkBorder}`,
        padding: '20px 10px',
        backgroundColor: colors.background,
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    form: {
        // border: '1px solid red',
        padding: '0px 10px',
    },
    body: {
        // border: '1px solid white',
        // width: 'auto',
    },
    fields: {
        backgroundColor: colors.surface,
        height: 35,
        borderRadius: '8px',
        padding: '0px 10px'
        // width: '100%',
    },
    text: {
        fontSize: typography.subtitle,
    },
    p: {
        // border: '1px solid red',
        marginTop: 5,
        paddingLeft: 15,
        fontSize: typography.caption,
        fontFamily: 'Poppins-Light',
        color: colors.textSecondary,
    },
    footer: {
        // border: '1px solid white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 20,
    },
    cancelBtn: {
        border: `1px solid ${colors.darkBorder}`,
        padding: '5px 10px',
        margin: '10px 0px',
        borderRadius: '8px',
        width: 'auto',
    },
    updateBtn: {
        border: `1px solid ${colors.darkBorder}`,
        padding: '5px 10px',
        margin: '10px 0px',
        borderRadius: '8px',
        width: 'auto',
    },
};