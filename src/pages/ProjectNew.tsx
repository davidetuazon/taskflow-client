import React, { useCallback, useState } from "react";
import colors from "../constants/colors";
import typography from "../constants/typography";
import { useAuth } from "../providers/AuthProvider";
import { useForm, SubmitHandler } from "react-hook-form";
import { mustNotBeEmptyOrSpace, mustBeValidProjectName } from "../utils/validators";
import { useMediaQuery } from "react-responsive";

import TopBar from "../components/home/topbar/TopBar";
import Text from "../components/commons/Text";
import TextInput from "../components/commons/TextInputs";
import Button from "../components/commons/Button";
import { createProject } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

type Inputs = {
    title: string,
    description: string,
    members?: string[],
}

export default function Project() {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const { user } = useAuth();
    const { username } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, trigger, watch, setError, formState: { errors, isSubmitting} } = useForm<Inputs>();
    const description = watch('description', '');

    const [isHovered, setIsHovered] = useState<string | null>(null);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!username) return;

        const payload: {
            title: string,
            description: string,
            members?: string[],
        } = {
            title: data.title,
            description: data.description,
            members: data.members,
        }
        // console.log(payload);
        try {
            const newProject = await createProject(username, payload);
            const { slug } = newProject;
            toast.success("Project created succesfully");
            setTimeout(() => {
                navigate(`/${username}/${slug}/tasks`);
            }, 800)
        } catch (e: any) {
            if (e.message.includes('already exists')) {
                setError('title', {
                    type: 'server',
                    message: errors.title?.message ?
                        `${errors.title.message}. Also: ${e.message}` :
                        e.message,
                });
            } else {
                 toast.error(e.message);
            }
        }
    }

    return (
        <div style={styles.root}>
            <div style={styles.header}>
                <TopBar
                    username={username}
                />
            </div>
            <div 
                style={{
                    ...styles.body,
                    width: isBigScreen ? '40%' : 'auto'
                    }}
            >
                <div style={{ width: '100%'}}>
                    <Text variant="heading" style={{ margin: 0 }}>
                        Create a new project
                    </Text>
                    <p 
                        style={styles.p}
                    >
                        <i>Required fields are marked with an asterisk (*).</i>
                    </p>
                </div>
                <form style={styles.form}>
                    <div style={{...styles.formMain, flexDirection: isBigScreen ? 'row': 'column' }}>
                        <div 
                            style={{
                                width: '40%',
                            }}
                        >
                            <Text
                                variant="caption"
                            >
                                Owner
                            </Text>
                            <Text
                                variant="title"
                                style={{
                                    // border: '1px solid red',
                                }}
                            >
                                {user?.email.split('@')[0]}/
                            </Text>
                        </div>
                        <div 
                            style={{
                                width: '100%',
                            }}
                        >
                            <Text
                                variant="caption"
                            >
                                Project name *
                            </Text>
                            <TextInput
                                style={styles.fields}
                                textProps={{
                                    ...register('title', {
                                        validate: {
                                            mustNotBeEmptyOrSpace,
                                            mustBeValidProjectName,
                                        }
                                    }),
                                    onChange: (e) => {
                                        register('title').onChange(e);
                                        trigger('title');
                                    }
                                }}
                                error = {errors.title?.message}
                            />
                            <p 
                                style={styles.p}
                            >
                                Great project names are short and memorable. Any space will be replaced with -.
                            </p>
                            {/* <p 
                                style={styles.p}
                            >
                                <i>Any space in the project name will be replaced with _.</i>
                            </p> */}
                        </div>
                    </div>
                    <div style={styles.formSub}>
                        <Text
                                variant="caption"
                            >
                                Description
                        </Text>
                        <TextInput
                            style={styles.fields}
                            textProps={{
                                ...register('description'),
                                onChange: (e) => {
                                    register('description').onChange(e);
                                    trigger('description');
                                },
                                maxLength: 150,
                            }}
                            error = {errors.description?.message}
                        />
                        <p 
                            style={styles.p}
                        >
                            {description.length} / 150 characters
                        </p>
                    </div>
                    <div style={styles.formFooter}>
                        <Button
                            title="Create Project"
                            style={{
                                ...styles.button,
                                backgroundColor: isHovered === "create" ? colors.primaryLight : colors.primary
                            }}
                            onButtonPress={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            onMouseEnter={() => setIsHovered('create')}
                            onMouseLeave={() => setIsHovered(null)}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        overflow: 'auto',
        backgroundColor: colors.surface,
    },
    header: {
        borderBottom: `1px solid ${colors.darkBorder}`,
        backgroundColor: colors.background,
        width: '100%',
        zIndex: 10,
    },
    body: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        padding: '30px 20px',
    },
    form: {
        // border: '1px solid white',
        padding: '20px 0px',
        width: '100%',
    },
    fields: {
        backgroundColor: colors.surface,
        height: 35,
        borderRadius: '8px',
    },
    formMain: {
        // border: '1px solid white',
        display: 'flex',
        width: '100%',
    },
    formSub: {
        // border: '1px solid white',
        gap: 20,
        width: '100%',
    },
    formFooter: {
        // border: '1px solid white',
        justifyItems: 'end',
        width: '100%',
    },
    button: {
        width: 'auto',
        padding:'5px 20px',
        margin: '40px 0px',
        borderRadius: '8px',
    },
    p: {
        // border: '1px solid red',
        margin: 0,
        fontSize: typography.caption,
        fontFamily: 'Poppins-Light',
        color: colors.textSecondary,
    },
}