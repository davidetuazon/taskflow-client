import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import colors from "../constants/colors";
import { mustBeValidEmail, mustNotBeEmptyOrSpace } from "../utils/validators";
import { register as registerUser } from "../services/api";
import { toast } from "react-hot-toast";

import Text from "../components/commons/Text";
import TextInput from "../components/commons/TextInputs";
import Button from "../components/commons/Button";
import Container from "../components/commons/Container";

type Inputs = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export default function Register() {
    const { register, trigger, handleSubmit, getValues, reset, setError, formState: { errors, isSubmitting }} = useForm<Inputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const payload: {
            username: string,
            firstName: string,
            lastName: string,
            email: string,
            password: string,
        } = {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        }
        try {
            await registerUser(payload);
            toast.success("Registration successful!");
            reset();
            setTimeout(() => {
                navigate('/login');
            }, 800);
        } catch (e: any) {
            if (e.field && e.message) {
                setError(e.field as keyof Inputs, { type: 'server', message: e.message })
            } else {
                toast.error(e.message);
            }
        }
    };

    return (
        <div style={styles.root}>
            <Container
                style={styles.container}
                >
                <Text
                    variant="heading"
                    style={{
                        color: colors.primary,
                        padding: 10,
                        margin: 10
                        }}
                >
                    Create a new Account
                </Text>
                <form style={styles.form}>
                    <TextInput
                        style={styles.fields}
                        textProps={{
                            placeholder: 'Username',
                            ...register("username", {
                                validate: {
                                    mustNotBeEmptyOrSpace
                                },
                            }),
                        }}
                        error = {errors.username?.message}
                    />
                    <TextInput
                        style={styles.fields}
                        textProps={{
                            placeholder: 'First Name',
                            ...register("firstName", {
                                validate: {
                                    mustNotBeEmptyOrSpace
                                },
                            }),
                        }}
                        error = {errors.firstName?.message}
                    />
                    <TextInput
                        style={styles.fields}
                        textProps={{
                            placeholder: 'Last Name',
                            ...register("lastName", {
                                validate: {
                                    mustNotBeEmptyOrSpace
                                },
                            }),
                        }}
                        error = {errors.lastName?.message}
                    />
                    <TextInput
                        style={styles.fields}
                        textProps={{
                            placeholder: 'Email',
                            type: 'email',
                            ...register("email", {
                                validate: {
                                    mustNotBeEmptyOrSpace,
                                    mustBeValidEmail,
                                },
                            }),
                        }}
                        error = {errors.email?.message}
                    />
                    <TextInput
                        style={styles.fields}
                        textProps={{
                            placeholder: 'Password',
                            type: 'password',
                            ...register("password", {
                                validate: {
                                    mustNotBeEmptyOrSpace,
                                    mustBeEightOrMoreCharacters: (val:string) => val.length >= 8 || "Password must be at least 8 characters"
                                },
                            }),
                            onChange: (e) => {
                                register('password').onChange(e);
                                trigger('password');
                            }
                        }}
                        error = {errors.password?.message}
                    />
                    <TextInput
                        style={styles.fields}
                        textProps={{
                            placeholder: 'Confirm Password',
                            type: 'password',
                            ...register("confirmPassword", {
                                validate: {
                                    mustNotBeEmptyOrSpace,
                                    mustBeSameWithPassword: 
                                    (val:string) => val === getValues('password') || "Password does not match"
                                },
                            }),
                            onChange: (e) => {
                                register('confirmPassword').onChange(e);
                                trigger('confirmPassword');
                            }
                        }}
                        error = {errors.confirmPassword?.message}
                    />
                    <div style={styles.footer}>
                        <Button
                            title="Submit"
                            onButtonPress={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </Container>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto',
    },
    container: {
        overflowY: 'auto',
        minWidth: '270px',
        width: '50%',
        margin: 20,
        padding: 30,
        border: `2px solid ${colors.darkBorder}`
    },
    footer: {
        // border: '1px solid red',
        marginTop: 25,
        justifyItems: 'center',
    },
    fields: {
        marginTop: 25,
    }
}