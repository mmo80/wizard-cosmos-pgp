import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { IFormData, Alternative, Routing, IAlternative } from '../models';
import RadioInput from '../Common/radioInput';
import WizardPager from '../Common/wizardPager';
import Steps from '../Common/steps';

// step3
const stepConnector: React.FC = () => {
    const { state, action } = useStateMachine(updateAction);
    const { handleSubmit, register, errors } = useForm({
        defaultValues: state.yourDetails
    });
    const { push } = useHistory();
    const [backLink, setBackLink] = useState<string>('/');

    const texts = {
        errorMsg: "Choose one of the alternatives.",
        top: "When do you like to drink?",
        i: "You will have the opportunity to describe more in detail further ahead.",
    };
    const answers: IAlternative[] = [
        {label: "Early in the morning", value: "morning"},
        {label: "At lunch", value: "lunch"},
        {label: "Late at night", value: "night"},
    ];

    useEffect(() => {
        var data: IFormData = state.yourDetails;

        if (data != null) {
            if (data.alternative === Alternative.Alt2) {
                setBackLink(Routing.ALT2);
            }
            else if (data.alternative === Alternative.Alt1) {
                setBackLink(Routing.ALT1);
            }
        }
    }, []);

    const onSubmit = (data: IFormData): void => {
        action(data);
        push(Routing.DESCRIPTION);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Steps step={4} />
            <p>
                {texts.top}<br />
                <i>{texts.i}</i>
            </p>
            <div className="form-group">
                {answers.map((q: IAlternative, index: number) => (
                    <RadioInput name="connector" id={"connector"+index} value={q.value} key={q.value} checked={state.yourDetails.connector === q.value} refobject={register({ required: texts.errorMsg })} label={q.label} />
                ))}
                <ErrorMessage errors={errors} name="connector" as="div" className="invalid-feedback" />
            </div>
            <div>
                <WizardPager backto={backLink} />
            </div>
        </form>
    );
};

export default stepConnector;
