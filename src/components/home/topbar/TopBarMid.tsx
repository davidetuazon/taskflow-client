import React, { useEffect, useState } from "react";
import { searchTask } from "../../../services/api";
import TextInput from "../../commons/TextInputs";
import Button from "../../commons/Button";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import { useMediaQuery } from "react-responsive";

type Props = {
    style?: React.CSSProperties,
}

export default function TopBarMid(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 769 });
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    
    const searchResults = async () => {
        if (!query) {
            setResults([]);
            return;
        }
        const res = await searchTask(query);
        setResults(res);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            searchResults();
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <div style={ Object.assign({}, styles.container, props.style) }>
            <TextInput
                style={{ 
                    paddingLeft: 20,
                    paddingRight: 20,
                    border: `3px solid ${colors.border}` }}
                textProps={{
                    placeholder: 'Search tasks...',
                    value: query,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
                }}
                textStyle={{ fontSize: isBigScreen ? typography.subtitle : typography.caption }}
            />

            {(results?.length ?? 0) > 0 && (
                <div style={styles.dropdown}>
                    {results.map((task:any) => (
                        <div
                            key={task._id}
                        >
                            <Button
                                title={task.title}
                                style={styles.button}
                                titleStyle={styles.results}
                                onButtonPress={() => alert(task.description)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        position: 'relative'
    },
    dropdown: {
        position: 'absolute',
        top: '85%',
        left: '0',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: colors.background,
        border: `2px solid ${colors.border}`,
        borderRadius: '8px',
        width: 'auto',
        padding: 0, margin: 0,
    },
    button: {
        // border: '1px solid red',
        backgroundColor: colors.surface,
        // margin: 10,
        padding: 15,
    },
    results: {
        // border: 'none',
        backgroundColor: 'transparent',
        outline: 'none',
        fontFamily: 'Poppins-SemiBold',
        fontSize: typography.subtitle,
        color: colors.textPrimary,
    }
}