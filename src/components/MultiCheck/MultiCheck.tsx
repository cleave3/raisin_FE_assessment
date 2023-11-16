import React, { ChangeEvent } from "react";
import CheckBox from "../CheckBox";
import "./MultiCheck.css";

export type Option = {
    label: string;
    value: string;
};

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
    label?: string;
    options: Option[];
    columns?: number;
    values?: string[];
    onChange?: (options: Option[]) => void;
};

const MultiCheck: React.FunctionComponent<Props> = ({
    label,
    options = [],
    columns = 1,
    values = [],
    onChange,
}): JSX.Element => {
    const handleChange = ({ target: { checked, value } }: ChangeEvent<HTMLInputElement>) => {
        let currentOptions: Option[] = [];

        if (checked) {
            currentOptions = options.filter(option => [...values, value].includes(option.value));
        } else {
            currentOptions = options.filter(option => values.includes(option.value) && option.value !== value);
        }

        onChange?.(currentOptions);
    };

    const handleSelectAll = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
        let currentOptions: Option[] = [];

        if (checked) currentOptions = options;

        onChange?.(currentOptions);
    };

    const isChecked = (value: string) => values.includes(value);

    const isAllSelected = values.length === options?.length;

    const showSelectAllCheckbox = options.length > 0;

    return (
        <>
            <div className="multiCheck-label">{label}</div>
            <div className="multiCheck" style={{ columnCount: columns }}>
                {showSelectAllCheckbox ? (
                    <CheckBox label={"Select all"} checked={isAllSelected} onChange={handleSelectAll} />
                ) : null}
                {options.map(({ label, value }, i) => (
                    <CheckBox key={i} label={label} value={value} checked={isChecked(value)} onChange={handleChange} />
                ))}
            </div>
        </>
    );
};

export default MultiCheck;
