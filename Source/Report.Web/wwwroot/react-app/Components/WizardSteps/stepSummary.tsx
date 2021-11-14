import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { ErrorMessage } from '@hookform/error-message';
import updateAction from "./updateAction";
import { IFormData, Routing } from '../models';
import WizardPager from '../Common/wizardPager';
import Steps from '../Common/steps';
import { getService } from '../wizardService';

// step5
const stepSummary: React.FC = () => {
    const { state, action } = useStateMachine(updateAction);
    const { handleSubmit, register, errors } = useForm({
        defaultValues: state.yourDetails
    });
    const { push } = useHistory();

    const errorMsg: string = "Without your consent, we are not able to process your information and therefore can not receive your notification via this form.";

    const onSubmit = (data: IFormData): void => {
        action(data);
        let apiData: IFormData = state.yourDetails
        save(apiData);
    }

    const save = (data: IFormData): void => {
        let _service = getService();
        if (_service != null) {
            _service.Save(data).then(x => {
                push(Routing.THANKS);
            });
        }
    }

    const click = (): void => {
        state.yourDetails.approve = !state.yourDetails.approve;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Steps step={6} />
            <p>Carefully read the summary below. If there is something you want to change, you can easily go back and adjust the text.</p>
            <div>
                <p>{state.yourDetails.name}</p>
                <p>{state.yourDetails.phone}</p>
                <p>{state.yourDetails.email}</p>
                <p>{state.yourDetails.alternative}</p>
                <p>{state.yourDetails.description}</p>
            </div>
            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox"
                        className="custom-control-input" 
                        id="approve" 
                        name="approve" 
                        onClick={() => click() } 
                        ref={register({ required: errorMsg })} />
                    <label className="custom-control-label" htmlFor="approve">By checking this box, you give your consent for xxxxxx to process your personal data in accordance with the Data Protection Ordinance (GDPR). 
                    The purpose of this questionnaire is solely to be able to contact you to ask further questions. Read more about how we handle your personal information <a href="#">here</a>.</label>
                </div>
                <ErrorMessage errors={errors} name="approve" as="div" className="invalid-feedback" />
            </div>
            <div>
                <WizardPager backto={Routing.DESCRIPTION} nextLabel="Send" />
            </div>

        </form>
    );
};

export default stepSummary;