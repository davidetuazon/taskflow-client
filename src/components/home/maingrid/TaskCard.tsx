import React from "react";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import Container from "../../commons/Container";
import Text from "../../commons/Text";
import Button from "../../commons/Button";

type Props = {
    Task: any,
    style?: React.CSSProperties,
    Title: string,
    Description: string,
    Status: string,
    DueDate: string,
    TaskID: string,
}

export default function TaskCard(props: Props) {
    const {
        Title,
        Description,
        Status,
        DueDate,
        TaskID,
    } = props;

    const overDue = new Date(DueDate).getTime() > Date.now();

    const handleOnDone = () => {
        
    }

    const handleOnDelete = () => {
        alert(TaskID);
    }
    
    return (
        <Container style={{
                    ...styles.container,
                    border: overDue ?
                        `3px solid ${colors.darkBorder}` :
                        '3px solid rgba(255, 0, 0, 0.35)',
                    }}
        >
            <div style={styles.title}>
                <Text variant="heading">
                    {Title}
                </Text>
            </div>
            <div style={styles.body}>
                <p style={styles.p}>
                    Due:
                </p>
                <Text variant="subtitle"
                    textStyle={{ 
                        color: new Date(DueDate).getTime() > Date.now() ?
                            colors.textPrimary :
                            'red'
                        }}
                >
                    {DueDate.split("T")[0]}
                </Text>
                <p style={styles.p}>
                    Status:
                </p>
                <Text variant="subtitle">
                    {Status}
                </Text>
                <p style={styles.p}>
                    Description:
                </p>
                <Text variant="subtitle">
                    {Description}
                </Text>
            </div>
            <div style={styles.footer}>
                <Button
                    title="Done"
                    style={styles.button}
                    titleStyle={{ color: colors.accent }}
                    onButtonPress={handleOnDone}
                />
                <Button
                    title="Edit"
                    style={styles.button}
                    titleStyle={{ color: colors.primary }}
                />
                <Button
                    title="Delete"
                    style={styles.button}
                    titleStyle={{ color: 'red' }}
                    onButtonPress={handleOnDelete}
                />
            </div>
        </Container>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // padding: 10,
        border: `3px solid ${colors.border}`,
        maxWidth: '350px',
        width: '310px',
        borderRadius: '23px',
        backgroundColor: colors.background,
    },
    title: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        paddingLeft: 20,
    },
    body: {
        // border: '1px solid red',
        textAlign: 'justify',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: '5px 20px',
    },
    footer: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 5,
    },
    button: {
        border: `1px solid ${colors.surface}`,
        width: 'auto',
        padding: 5,
        backgroundColor: colors.border,
    },
    p: {
        // border: '1px solid red',
        padding: 0,
        margin: 0,
        fontFamily: 'Poppins-SemiBold',
        fontSize: typography.caption,
        color: colors.textSecondary,
    }
}