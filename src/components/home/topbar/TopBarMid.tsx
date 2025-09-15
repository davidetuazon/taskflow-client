import React, { useEffect, useState } from "react";
import { searchProject } from "../../../services/api";
import TextInput from "../../commons/TextInputs";
import Button from "../../commons/Button";
import colors from "../../../constants/colors";
import typography from "../../../constants/typography";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

type Props = {
    style?: React.CSSProperties,
}

export default function TopBarMid(props: Props) {
    const isBigScreen = useMediaQuery({ minWidth: 768 });
    const navigate = useNavigate();
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [isHovered, setIsHovered] = useState<string | null>(null)
    
    const searchResults = async () => {
        if (!query) {
            setResults([]);
            return;
        }
        const res = await searchProject(query);
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
            {/* {isBigScreen && ( */}
                <TextInput
                    style={isBigScreen ? styles.searchbar : styles.searchbarIcon}
                    textProps={{
                        placeholder: 'Search',
                        value: query,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
                    }}
                    textStyle={{ fontSize: isBigScreen ? typography.subtitle : typography.caption }}
                />
            {/* )} */}
            {(results?.length ?? 0) > 0 && (
                <div style={styles.dropdown}>
                    {results.map((proj:any, idx: number) => (
                        <div
                            key={proj._id}
                        >
                            <Button
                                title={proj.title}
                                style={{
                                    ...styles.button,
                                    borderTopLeftRadius: idx === 0 ? '8px': 0,
                                    borderTopRightRadius: idx === 0 ? '8px': 0,
                                    borderBottomLeftRadius: idx === results.length - 1 ? '8px': 0,
                                    borderBottomRightRadius: idx === results.length - 1 ? '8px': 0,
                                    backgroundColor: isHovered === proj.title ? colors.surface : colors.background,
                                }}
                                titleStyle={styles.results}
                                onMouseEnter={() => setIsHovered(proj.title)}
                                onMouseLeave={() => setIsHovered(null)}
                                onButtonPress={() => navigate(`/${proj.owner?.username}/${proj.slug}/tasks`)}
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
        position: 'relative',
        padding: '0 20px',
        margin: 0,
        width: 'auto',
    },
    searchbar: {
        border: `1px solid ${colors.darkBorder}`,
        height: 30,
        borderRadius: '8px',
    },
    searchbarIcon: {
        border: `1px solid ${colors.darkBorder}`,
        height: 30,
        borderRadius: '8px',
    },
    dropdown: {
        position: 'absolute',
        top: '85%',
        left: '7.5%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: colors.background,
        border: `1px solid ${colors.darkBorder}`,
        borderRadius: '8px',
        width: 'auto',
        padding: 0, margin: 0,
    },
    button: {
        // border: '1px solid red',
        backgroundColor: colors.background,
        width: 'auto',
        margin: '0px 0px',
        padding: '10px 10px',
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