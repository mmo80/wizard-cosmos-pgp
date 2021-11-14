import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { IFormData, Alternative, Routing } from '../models';
import WizardPager from '../Common/wizardPager';
import Steps from '../Common/steps';

// step1
const stepAlternative: React.FC = () => {
    const { state, action } = useStateMachine(updateAction);
    const { handleSubmit, register, errors } = useForm({
        defaultValues: state.yourDetails
    });
    const { push } = useHistory();

    const texts = {
        errorMsg: "Choose one of the alternatives.",
        question: "What would you like?",
        alternative1: "I would like a beer",
        alternative2: "I would like a glas of wine"
    }

    const onSubmit = (data: IFormData): void => {
        action(data);
        
        if (data.alternative === Alternative.Alt1) {
            push(Routing.ALT1);
        }
        else if (data.alternative === Alternative.Alt2) {
            push(Routing.ALT2);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Steps step={2} />
            <p>{texts.question}</p>
            <div className="form-group">
                <div className="form-check">
                    <input type="radio"
                        name="alternative"
                        id="alternative1"
                        value={Alternative.Alt1}
                        ref={register({ required: texts.errorMsg })}
                        className="form-check-input"
                        defaultChecked={state.yourDetails.alternative === Alternative.Alt1} />
                    <label className="form-check-label" htmlFor="alternative1">
                        {texts.alternative1}
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio"
                        name="alternative"
                        id="alternative2"
                        value={Alternative.Alt2}
                        ref={register({ required: texts.errorMsg })}
                        className="form-check-input"
                        defaultChecked={state.yourDetails.alternative === Alternative.Alt2} />
                    <label className="form-check-label" htmlFor="alternative2">
                        {texts.alternative2}
                    </label>
                </div>
                <ErrorMessage errors={errors} name="alternative" as="div" className="invalid-feedback" />
            </div>
            <div>
                <WizardPager backto={Routing.CONTACT} />
            </div>
        </form>
    );
};

export default stepAlternative;
