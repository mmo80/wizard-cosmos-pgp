import React, { FunctionComponent } from 'react';
import { SetForm } from "react-hooks-helper";
import { ErrorMessage } from '@hookform/error-message';

export interface IItemInput {
    label: string;
    value: string;
    name: string;
    type?: string;
    onChange: SetForm;
}

export const ItemInput: FunctionComponent<IItemInput> = (props: IItemInput) => {
    return <>
        <div>
            {props.type === "text" ? (
                <>
                    <label>{props.label}</label>
                    <input type={props.type} value={props.value} name={props.name} onChange={props.onChange} />
                </>
            ) : (
                    <>
                        <label />
                        <input type={props.type} value={props.value} name={props.name} onChange={props.onChange} />
                        {props.label}
                    </>
                )}
        </div>
    </>
}

ItemInput.defaultProps = {
    type: "text"
};

export default ItemInput;