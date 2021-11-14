import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { IFormData, Routing, IAlternative } from '../models';
import RadioInput from '../Common/radioInput';
import WizardPager from '../Common/wizardPager';
import Steps from '../Common/steps';

// step2a
const stepAlt1: React.FC = () => {
    const { state, action } = useStateMachine(updateAction);
    const { handleSubmit, register, errors } = useForm({
        defaultValues: state.yourDetails
    });
    const { push } = useHistory();

    const texts = {
        errorMsg: "Choose one of the alternatives.",
        top: "What type of beer do you like?",
        i: "You will have the opportunity to describe more in detail further ahead.",
    };
    const answers: IAlternative[] = [
        {label: "Pale Lager and Pilsner", value: "lager"},
        {label: "Stout", value: "stout"},
        {label: "Porter", value: "porter"},
        {label: "India Pale Ale", value: "ipa"},
    ];

    const onSubmit = (data: IFormData): void => {
        action(data);
        push(Routing.CONNECT);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Steps step={3} />
            <p>
                {texts.top}<br />
                <i>{texts.i}</i>
            </p>
            <div className="form-group">
                {answers.map((q: IAlternative, index: number) => (
                    <RadioInput name="alt1" id={"alt1"+index} value={q.value} key={q.value} checked={state.yourDetails.alt1 === q.value} refobject={register({ required: texts.errorMsg })} label={q.label} />
                ))}
                <ErrorMessage errors={errors} name="alt1" as="div" className="invalid-feedback" />
            </div>
            <div>
                <WizardPager backto={Routing.ALT} />
            </div>
        </form>
    );
};

export default stepAlt1;
