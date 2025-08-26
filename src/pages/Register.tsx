import React, { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { throttle } from "lodash";
import { useNavigate } from "react-router-dom";
import colors from "../constants/colors";
import TaskFlow from '../assets/TaskFlowV2.svg';
import { mustBeValidEmail, mustNotBeEmptyOrSpace } from "../utils/validators";
import { register as registerUser } from "../services/api";

import Text from "../components/commons/Text";
import TextInput from "../components/commons/TextInputs";
import Button from "../components/commons/Button";
import Container from "../components/commons/Container";

type Inputs = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export default function Register() {
    const { register, handleSubmit, getValues, formState: { errors, isSubmitting }} = useForm<Inputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = useCallback(throttle(async (data) => {
        try {
            await registerUser(data);
            navigate('/login');
        } catch (e) {
            console.error({ message: e });
        }
    }, 2000, { trailing: true }), []);

    return (
        <div style={styles.root}>
            <Container
                style={{ 
                    overflowY: 'auto',
                    minWidth: '270px',
                    width: '50%',
                    margin: 20,
                    padding: 30,
                }}
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
                        style={{ marginTop: 25 }}
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
                        style={{ marginTop: 25 }}
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
                        style={{ marginTop: 25 }}
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
                        style={{ marginTop: 25 }}
                        textProps={{
                            placeholder: 'Password',
                            type: 'password',
                            ...register("password", {
                                validate: {
                                    mustNotBeEmptyOrSpace,
                                    mustBeEightOrMoreCharacters: (val:string) => val.length >= 8 || "Password must be at least 8 characters"
                                },
                            }),
                        }}
                        error = {errors.password?.message}
                    />
                    <TextInput
                        style={{ marginTop: 25 }}
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
                        }}
                        error = {errors.confirmPassword?.message}
                    />

                    <div style={styles.footer}>
                        <Button title="Submit" onButtonPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
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
    //     backgroundImage: `url(${TaskFlow})`,
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center',
    },
    footer: {
        // border: '1px solid red',
        // width: '100%',
        marginTop: 25,
        justifyItems: 'center',
    }
}