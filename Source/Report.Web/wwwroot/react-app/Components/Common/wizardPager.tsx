import React, { FunctionComponent } from 'react';
import { NavLink } from "react-router-dom";

export interface IWizardPage {
    backto: string;
    nextLabel?: string;
}

export const WizardPager: FunctionComponent<IWizardPage> = (props: IWizardPage) => {
    return <>
        <div aria-label="Page navigation">
            <NavLink className="btn btn-primary btn-lg" to={props.backto}>Previous</NavLink>
            <input type="submit" className="ml-3 btn btn-primary btn-lg" value={props.nextLabel} />
        </div>
    </>
}

WizardPager.defaultProps = {
    nextLabel: "Next"
};

export default WizardPager;