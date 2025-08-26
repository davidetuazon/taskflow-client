import React, { useCallback, useState } from "react";
import { mustBeValidEmail, mustNotBeEmptyOrSpace } from "../utils/validators";
import { useForm, SubmitHandler } from 'react-hook-form';
import { throttle } from "lodash";
import { login } from "../services/api";
import { ACCESS_TOKEN } from "../utils/constants";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import colors from "../constants/colors";
import TaskFlow from '../assets/TaskFlowV2.svg';

import Button from "../components/commons/Button";
import Text from "../components/commons/Text";
import TextInput from "../components/commons/TextInputs";
import Container from "../components/commons/Container";

type Inputs = {
    email: string,
    password: string,
}

export default function Login() {
    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<Inputs>();
    const [registrationError, setRegistrationError] = useState<string>('');
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = useCallback(throttle(async (data) => {
        try {
            const response = await login(data.email, data.password);
            Cookies.set(ACCESS_TOKEN, response.token);
            navigate('/');
        } catch (e: any) {
            const status = e?.response?.status;
            switch (status) {
                case 400:
                    setRegistrationError('email / password is incorrect');
                    break;
                default: 
                    setRegistrationError('Unknown error occured, please try again');
            }
        }
    }, 2000, { trailing: true }), []);
    
    return (
        <div style={styles.root}>
            <Container 
                style={{
                    minWidth: '200px',
                    overflowY: 'auto',
                    margin: 20,
                    padding: 30,
                }}
            >
                <div style={styles.inputs}>
                    <Text variant="heading" style={{ color: colors.primary }}>
                        Welcome to TaskFlow
                    </Text>

                    <form style={styles.form}>

                        { registrationError && (
                        <Text
                            variant="subtitle"
                            style={{
                            textAlign: 'center',
                            color: 'red'
                            }}
                        >
                            {registrationError}
                        </Text>
                        )}

                        <TextInput
                        style={{ marginTop: 40 }}
                        textProps={{
                            type: "email",
                            placeholder: "email",
                            ...register("email", {
                                validate: {
                                    mustNotBeEmptyOrSpace,
                                    mustBeValidEmail
                                }
                            })
                        }}
                        error = {errors.email?.message}
                        />

                        <TextInput
                            style={{ marginTop: 40 }}
                            textProps={{
                                type: "password",
                                placeholder: "password",
                                ...register("password", {
                                    validate: {
                                        mustNotBeEmptyOrSpace,
                                    }
                                })
                            }}
                            error = {errors.password?.message}
                        />

                        <div style={styles.buttons}>
                            <Button title="Login" onButtonPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
                            <Button style={{ backgroundColor: colors.secondary }} title="Register" onButtonPress={() => navigate('/register')} />
                        </div>

                    </form>
                </div>
            </Container>
        </div>
    );
};


const styles: {[key: string]: React.CSSProperties} = {
    root: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto',
        // backgroundImage: `url(${TaskFlow})`,
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
    },
    buttons: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    inputs: {
        // border: '1px solid red',
        margin: 10,
    }
}