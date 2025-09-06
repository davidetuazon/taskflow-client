import React, { useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";

import Text from "../commons/Text";
import Button from "../commons/Button";

type filterOption = 'default' | 'overdue' | 'today' | 'upcoming' | 'in-progress' | 'in-review';
type sortOption = 'default' | 'ascending' | 'descending';

type Props = {
    style?: React.CSSProperties,
    task: any[],
    filterState: string,
    setFilterState: React.Dispatch<React.SetStateAction<filterOption>>,
    sortState: string,
    setSortState: React.Dispatch<React.SetStateAction<sortOption>>,
    isOpen: string | null,
    setIsOpen: React.Dispatch<React.SetStateAction<'filter' | 'sort' | 'settings' | null>>
}

export default function TaskListOptions(props: Props) {
    const [isHovered, setIsHovered] = useState<string | null>(null);

    const filterOptions: filterOption[] = ['default', 'overdue', 'today', 'upcoming', 'in-progress', 'in-review'];
    const sortOptions: sortOption[] = ['default', 'ascending', 'descending'];

    return (
        <div style={styles.container}>
            <div style={styles.filterSort}>
                <div onClick={(e) => e.stopPropagation()}>
                    <Button
                        title={props.filterState === 'default' ? 'Filter ▼' : `${props.filterState}`}
                        style={{
                            ...styles.buttons,
                            backgroundColor: isHovered === 'filter' ? colors.darkBorder : colors.surface,
                        }}
                        onMouseEnter={() => setIsHovered('filter')}
                        onMouseLeave={() => setIsHovered(null)}
                        titleStyle={styles.text}
                        onButtonPress={() => props.setIsOpen(prev => (prev === 'filter' ? null : 'filter'))}
                    />
                    {props.isOpen === 'filter' && (
                        <div style={styles.filterDropdown}>
                            {filterOptions.map((opt: any, idx: number) => (
                                <div key={idx}>
                                    <Button
                                        style={{
                                            ...styles.dropdownButton,
                                            backgroundColor: isHovered === opt ?  colors.darkBorder : colors.surface,
                                            borderTopLeftRadius: idx === 0 ? '8px' : 0,
                                            borderTopRightRadius: idx === 0 ? '8px' : 0,
                                            borderBottomLeftRadius: idx === filterOptions.length - 1 ? '8px' : 0,
                                            borderBottomRightRadius: idx === filterOptions.length - 1 ? '8px' : 0,
                                        }}
                                        title={opt}
                                        titleStyle={styles.text}
                                        onButtonPress={() => {
                                            props.setFilterState(opt);
                                            props.setIsOpen(null);
                                        }}
                                        onMouseEnter={() => setIsHovered(opt)}
                                        onMouseLeave={() => setIsHovered(null)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                    <Button
                        title={props.sortState === 'default' ? "Sort ▼" : `${props.sortState}`}
                        style={{
                            ...styles.buttons,
                            backgroundColor: isHovered === 'sort' ? colors.darkBorder : colors.surface,
                        }}
                        onMouseEnter={() => setIsHovered('sort')}
                        onMouseLeave={() => setIsHovered(null)}
                        titleStyle={styles.text}
                        onButtonPress={() => props.setIsOpen(prev => (prev === 'sort' ? null : 'sort'))}
                    />
                    {props.isOpen === 'sort' && (
                        <div style={styles.sortDropdown}>
                            {sortOptions.map((opt: any, idx: number) => (
                                <div key={idx}>
                                    <Button
                                        style={{
                                            ...styles.dropdownButton,
                                            backgroundColor: isHovered === opt ?  colors.darkBorder : colors.surface,
                                            borderTopLeftRadius: idx === 0 ? '8px' : 0,
                                            borderTopRightRadius: idx === 0 ? '8px' : 0,
                                            borderBottomLeftRadius: idx === sortOptions.length - 1 ? '8px' : 0,
                                            borderBottomRightRadius: idx === sortOptions.length - 1 ? '8px' : 0,
                                        }}
                                        title={opt}
                                        titleStyle={styles.text}
                                        onButtonPress={() => {
                                            props.setSortState(opt);
                                            props.setIsOpen(null);
                                        }}
                                        onMouseEnter={() => setIsHovered(opt)}
                                        onMouseLeave={() => setIsHovered(null)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    container: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        justifyContent: 'space-between',
    },
    filterSort: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        gap: 10,
    },
    buttons: {
        padding: '5px 5px',
        margin: 0,
        width: 'auto',
        borderRadius: '8px',
        border: `1px solid ${colors.darkBorder}`,
        cursor: 'pointer',
    },
    text: {
        margin: 0,
        fontSize: typography.caption,
        color: colors.textSecondary,
    },
    filterDropdown: {
        border: `1px solid ${colors.darkBorder}`,
        borderRadius: '8px',
        zIndex: 10,
        minWidth: 'auto',
        position: 'absolute',
        marginTop: 3,
    },
    sortDropdown: {
        border: `1px solid ${colors.darkBorder}`,
        borderRadius: '8px',
        zIndex: 10,
        minWidth: 'auto',
        position: 'absolute',
        marginTop: 3,
    },
    dropdownButton: {
        // border: '1px solid red',
        padding: '10px 15px',
        margin: 0,
        width: 'auto',
        cursor: 'pointer',
        borderRadius: 0,
    }
}