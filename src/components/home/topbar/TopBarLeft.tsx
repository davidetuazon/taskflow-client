import React from "react";
import { useNavigate } from "react-router-dom";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import Button from "../../commons/Button";

type Props = {
    style?: React.CSSProperties,
}

export default function TopBarLeft(props: Props) {
    const navigate = useNavigate();

    return (
        <div style={ Object.assign({}, styles.container, props.style) }>
            <Button
                title="Dashboard"
                style={{
                    // border: '1px solid red',
                    backgroundColor: colors.background,
                    width: 'auto',
                    alignContent: 'center',
                    margin: 0, padding: 0,
                }}
                titleStyle={{ color: colors.primary, fontSize: typography.heading }}
                onButtonPress={() => navigate('/')}
            />
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
    }
}