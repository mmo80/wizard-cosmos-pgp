import React, { FunctionComponent, createRef } from 'react';
import { SetForm } from "react-hooks-helper";
import { ErrorMessage } from '@hookform/error-message';

export interface IRadioInput {
    label: string;
    value: string;
    name: string;
    id: string;
    refobject: React.Ref<HTMLInputElement>;
    checked: boolean;
}

export const RadioInput: FunctionComponent<IRadioInput> = (props: IRadioInput) => {
    return <>
        <div className="form-check">
            <input className="form-check-input" type="radio" name={props.name} id={props.id} value={props.value} ref={props.refobject} defaultChecked={props.checked} />
            <label className="form-check-label" htmlFor={props.id}>
                {props.label}
            </label>
        </div>
    </>
}

export default RadioInput;