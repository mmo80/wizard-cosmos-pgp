import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, NavLink, useLocation } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import { IDetails, Routing } from './models';

import stepContacts from "./WizardSteps/stepContacts";
import stepAlternative from "./WizardSteps/stepAlternative";
import stepAlt1 from "./WizardSteps/stepAlt1";
import stepAlt2 from "./WizardSteps/stepAlt2";
import stepConnector from "./WizardSteps/stepConnector";
import stepDescription from "./WizardSteps/stepDescription";
import stepSummary from "./WizardSteps/stepSummary";
import stepThankYou from "./WizardSteps/stepThankYou";

createStore<IDetails>({
    yourDetails: {
        name: "",
        phone: "",
        email: "",
        approve: false
    }
});


const Pages: React.FC = () => {

    // useEffect(() => {
    //     console.log('wizardForm');
    // }, []);

    return (
        <>
            <Route exact path={Routing.CONTACT} component={stepContacts} />
            <Route path={Routing.ALT} component={stepAlternative} />
            <Route path={Routing.ALT1} component={stepAlt1} />
            <Route path={Routing.ALT2} component={stepAlt2} />
            <Route path={Routing.CONNECT} component={stepConnector} />
            <Route path={Routing.DESCRIPTION} component={stepDescription} />
            <Route path={Routing.SUMMARY} component={stepSummary} />
            <Route path={Routing.THANKS} component={stepThankYou} />
        </>
    );
};


const WizardForm: React.FC = () => {

    return <>
        <StateMachineProvider>
            <Router>
            <div className="row">
                <div className="col-12 col-md-7">
                    <Pages />
                </div>
            </div>
            </Router>
        </StateMachineProvider>
    </>;
}

export default WizardForm;