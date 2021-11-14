import React, { FunctionComponent, useEffect, useState } from "react";

export interface ISteps {
    step: number;
}

export const Steps: FunctionComponent<ISteps> = (props: ISteps) => {

    let steps:string[] = [];
    [...Array(6)].map((x, i) => {
        let cssClass = '';
        if (props.step >= i+1) { cssClass = 'done'; }
        if (props.step === i+1) { cssClass = 'current'; }
        steps.push(cssClass);
    });

    return <>
        <div className="steps clearfix">
            <ul role="tablist" className="">
            {steps.map((x, i) =>
                <li role="tab" key={i} className={x}><span className="number"></span> </li>
            )}
            </ul>
        </div>
    </>
}

Steps.defaultProps = {
    step: 1
};

export default Steps;










