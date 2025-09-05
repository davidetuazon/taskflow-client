import React, { useState } from "react";
import colors from "../../../constants/colors";
import { useAuth } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";

import Container from "../../commons/Container";
import Text from "../../commons/Text";

type Props = {
    style?: React.CSSProperties,
    project: any,
}

export default function ProjectNameCard(props: Props) {
    const { title, slug } = props.project;
    const username = props.project.owner.email.split('@')[0];
    const [isHovered, setIsHovered] = useState<string | null>(null);

    return (
        <Container style={styles.container}>
            <Text variant="subtitle" style={styles.text}>
                <Link
                    to={`/projects/${slug}/tasks`}
                    key={slug}
                    style={{
                        color: colors.textPrimary,
                        textDecoration: isHovered === slug ? 'underline' : 'none'
                    }}
                    onMouseEnter={() => setIsHovered(slug)}
                    onMouseLeave={() => setIsHovered(null)}
                >
                    {username}/{title}
                </Link>            
            </Text>
        </Container>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: `2px solid ${colors.darkBorder}`,
        backgroundColor: colors.surface,
        display: 'flex',
        padding: '0px 10px',
        cursor: 'pointer',
        alignItems: 'start'
    },
    text: {
        // border: '1px solid red',
        margin: 0,
    }
}