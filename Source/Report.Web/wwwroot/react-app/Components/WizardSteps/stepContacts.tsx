import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useHistory, withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { IFormData, Routing } from '../models';
import Steps from '../Common/steps';

// start/root
const stepContacts: React.FC = () => {
    const { state, action } = useStateMachine(updateAction);
    const { handleSubmit, errors, register } = useForm({
        defaultValues: state.yourDetails
    });
    const { push } = useHistory();

    const onSubmit = (data: IFormData): void => {
        action(data);
        push(Routing.ALT);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Steps step={1} />
            <p>Fill in your name and contact information. We need this information when handling your case. If you want to know more about how we handle your personal data <a href="#">click here</a>.</p>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text"
                    className="form-control"
                    name="name"
                    placeholder="Fill in your name"
                    ref={register({ required: "Kindly fill in your name." })} />
                <ErrorMessage errors={errors} name="name" as="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Fill in your phone"
                    ref={register({ required: "Kindly fill in your phone." })} />
                <ErrorMessage errors={errors} name="phone" as="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="text"
                    className="form-control"
                    name="email"
                    placeholder="Fill in your e-mail"
                    ref={register({ required: "Kindly fyll i ditt e-mail." })} />
                <ErrorMessage errors={errors} name="email" as="div" className="invalid-feedback" />
            </div>
            <div>
                <input type="submit" value="Next" className="btn btn-primary btn-lg" />
            </div>
        </form>
    );
}

export default withRouter(stepContacts);