import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../providers/AuthProvider";
import { toast } from "react-hot-toast";

import Button from "../commons/Button";
import Text from "../commons/Text";
import TextInput from "../commons/TextInputs";
import { mustNotBeEmptyOrSpace } from "../../utils/validators";
import { updatePublicProfile } from "../../services/api";


type Props = {
    style?: React.CSSProperties,
}

type Inputs = {
    firstName: string,
    lastName: string,
}

export default function PublicProfile(props: Props) {
    const { user, setUser } = useAuth();
    const { register, handleSubmit, watch, reset, formState: { errors, isDirty } } = useForm<Inputs>({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
        }
    });
    const [isHovered, setIsHovered] = useState<boolean>(false); 

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {
        if (!user) return;
        const payload: {
            firstName: string,
            lastName: string,
        } = {
            firstName: data.firstName || user?.firstName,
            lastName: data.lastName || user?.lastName,
        }

        toast.promise(
            updatePublicProfile(user?.username, payload)
            .then(response => {
                setUser(response);
            }), {
                loading: 'Updating public profile...',
                success: 'Public profile updated!',
                error: 'Failed to update public profile. Please try again.'
            }
        )
    }

    useEffect(() => {
        if (user) {
            reset({
                firstName: user?.firstName,
                lastName: user?.lastName,
            })
        }
    }, [user, reset]);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Text 
                    variant="heading"
                    style={{ marginTop: 0 }}
                >
                        Public Profile
                </Text>
            </div>
            <form>
                <Text
                    variant="subtitle"
                    style={styles.text}
                >
                    First name
                </Text>
                <TextInput
                    style={styles.fields}
                    textProps={{
                        ...register('firstName', {
                            validate: {
                                mustNotBeEmptyOrSpace,
                            }
                        })
                    }}
                    error = {errors.firstName?.message}
                />
                <Text
                    variant="subtitle"
                    style={styles.text}
                >
                    Last name
                </Text>
                <TextInput
                    style={styles.fields}
                    textProps={{
                        ...register('lastName', {
                            validate: {
                                mustNotBeEmptyOrSpace,
                            }
                        })
                    }}
                    error = {errors.lastName?.message}
                />
                <div style={styles.footer}>
                    <Button
                        title="Save changes"
                        style={{
                            ...styles.button,
                            backgroundColor: isHovered ? colors.primaryLight : colors.primary,
                            opacity: isDirty ? 1 : 0.8
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        disabled={!isDirty}
                        onButtonPress={handleSubmit(onSubmit)}
                    />
                </div>
            </form>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        flex: 1,
    },
    header: {
        borderBottom: `1px solid ${colors.darkBorder}`,
        marginBottom: 15,
    },
    text: {
        margin: '15px 0px'
    },
    fields: {
        borderRadius: '8px',
        height: 35,
    },
    footer: {
        marginTop: 30,
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