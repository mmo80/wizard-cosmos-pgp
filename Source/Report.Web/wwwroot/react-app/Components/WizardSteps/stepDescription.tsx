import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { IFormData, Routing } from '../models';
import WizardPager from '../Common/wizardPager';
import Steps from '../Common/steps';

// step4
const stepDescription: React.FC = () => {
    const { state, action } = useStateMachine(updateAction);
    const { handleSubmit, register, errors } = useForm({
        defaultValues: state.yourDetails
    });
    const { push } = useHistory();

    const texts = {
        errorMsg: "Describe your experience in more detail.",
        top: "Describe your experience in more detail.",
    };
    const onSubmit = (data: IFormData): void => {
        action(data);
        push(Routing.SUMMARY);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Steps step={5} />
            <p>
                {texts.top}
            </p>
            <div className="form-group">
                <textarea className="form-control" name="description" ref={register({ required: texts.errorMsg })} rows={3}></textarea>
                <ErrorMessage errors={errors} name="description" as="div" className="invalid-feedback" />
            </div>
            <div>
                <WizardPager backto={Routing.CONNECT} />
            </div>
        </form>
    );
};

export default stepDescription;