import React from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

const stepThankYou: React.FC = () => {
    const { state, action } = useStateMachine(updateAction);

    return (
        <div className="pt-2">
            <h3>Thank you for telling us and giving us an opportunity to act.</h3>
            <div>
                <p>After we have received your answers, we initiate an statement and give you feedback by phone or email. </p>
                <p>Our hope is to provide feedback within 1-3 business days.</p>
            </div>
        </div>
    );
};

export default stepThankYou;