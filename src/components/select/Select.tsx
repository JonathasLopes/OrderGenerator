import { MdKeyboardArrowDown } from "react-icons/md";
import { ISelectOptions } from "../../interfaces/ISelectOptions";
import './Select.css';

interface ISelectProps {
    options: ISelectOptions[],
    firstOptionIsDisabled?: boolean,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    name: string
}

function Select(props: ISelectProps) {
    const { options, setValue, value, firstOptionIsDisabled = false, name } = props;

    return (
        <div className='select-wrapper'>
            <select onChange={(e) => setValue(e.target.value)} value={value} name={name}>
                {options.map((option, index) => {
                    return (
                        <option disabled={index === 0 && firstOptionIsDisabled} key={index} value={option.value}>{option.name}</option>
                    )
                })}
            </select>
            <MdKeyboardArrowDown className="select-icon" />
        </div>
    )
}

export default Select;