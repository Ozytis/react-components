import "./wizard.less";
import * as React from "react";
import { Loader, Button, BaseComponent } from "..";


export module Ozytis.Wizard{

    export interface WizardProps {
        onFinalValidation?: () => Promise<any>;
        displayProgressBar?: boolean;
        finalValidationText?: string;
        nextStepText?:string;
        previousStepText?:string;
        doneText?:string;
    }

    export class WizardState {
        constructor(props: WizardProps) {

        }

        currentStep: number = 0;
        currentEndStep = 0;
        totalSteps: number = 1;
        finalCheck = false;
    }

    export interface WizardStepProps {
        title: string;
        subTitle?: string;
        onValidateNext?: () => Promise<boolean>;
    }

    export class WizardStepState {
        constructor(props: WizardStepProps) {

        }
    }
}

export class Wizard extends BaseComponent<Ozytis.Wizard.WizardProps, Ozytis.Wizard.WizardState>{
    constructor(props: Ozytis.Wizard.WizardProps) {
        super(props);
        this.state = new Ozytis.Wizard.WizardState(props);
    }

    componentDidMount() {
        this.setState({ totalSteps: (this.props.children as any).length });
    }

    validateNextStep: () => Promise<boolean>;

    nextStep() {
        if (this.validateNextStep) {
            return this.validateNextStep().then(result => {
                if (result) {
                    this.setState({ currentStep: this.state.currentStep + 1, currentEndStep: Math.max(this.state.currentEndStep, this.state.currentStep + 1) });
                }
            });
        } else {
            return this.setState({ currentStep: this.state.currentStep + 1, currentEndStep: Math.max(this.state.currentEndStep, this.state.currentStep + 1) });
        }
    }

    previousStep() {
        this.setState({ currentStep: this.state.currentStep - 1 });
    }

    finalValidation() {
        if (this.state.finalCheck) {
            return;
        }

        return this.setState({ finalCheck: true, currentStep: this.state.currentStep }).then(() => {
            if (this.props.onFinalValidation) {
                this.props.onFinalValidation().then(() => {
                    this.setState({ finalCheck: false });
                });
            }
        });
    }

    render() {

        var percentage = this.state.currentStep / this.state.totalSteps * 100;

        return (
            <div className="wizard" role="wizard">
                <div className="card-group steps-summary rounded-0">
                    {React.Children.map(this.props.children, (child: React.ReactElement<Ozytis.Wizard.WizardStepProps>, index) => {
                        return (
                            <div
                                className={`card rounded-0 border-0 ${this.state.currentStep == index ? "selected" : "unselected"} ${this.state.currentStep > index ? "done" : ""}`} key={`step-li-${index}`} >

                                <span className="stepNumber">
                                    {index + 1}
                                </span>
                                <span className="stepDesc">
                                    {child.props.title}

                                    {
                                        child.props.subTitle && child.props.subTitle.length > 0 &&
                                        <small>{child.props.subTitle}</small>
                                    }
                                </span>

                            </div>
                        )
                    })}
                </div>

                <div className="stepContainer">

                    {
                        this.props.displayProgressBar !== false &&
                        <div className="progress progress-striped active progress-sm content">
                            <div aria-valuemax={100} aria-valuemin={0} role="progressbar" className="progress-bar progress-bar-success step-bar" style={{ width: percentage + "%" }}>
                                <span className="sr-only"> {Math.round(percentage)}% {this.props.doneText || "complet"}</span>
                            </div>
                        </div>
                    }

                    {
                        React.Children.map(this.props.children, (child: React.ReactElement<Ozytis.Wizard.WizardStepProps>, index: number) => {

                            var show = this.state.currentStep === index;

                            if (show) {
                                this.validateNextStep = child.props.onValidateNext;
                                return (child);
                            } else {
                                return;
                            }
                        })
                    }
                </div>

                <div className="action-bar mt-2">


                    {
                        this.state.currentStep > 0 &&
                        <Button modifier="light" className={`mr-2`} onClick={() => this.previousStep()} >
                            <i className="far fa-chevron-left mr-2" />
                            { this.props.previousStepText ||"Précédent" }
                        </Button>
                    }

                    {
                        this.state.currentStep < this.state.totalSteps - 1 &&
                        <Button modifier="light" className="ml-2" onClick={() => this.nextStep()}>
                            {this.props.nextStepText || "Suivant" }
                            <i className="far fa-chevron-right ml-2" />
                        </Button>
                    }

                    {
                        this.state.currentStep == this.state.totalSteps - 1 &&
                        <Button modifier="primary" className="pull-right" onClick={() => this.finalValidation()}>
                            <Loader usualClass="far fa-check mr-2" loading={this.state.finalCheck} />
                            {this.props.finalValidationText || "Valider"}
                        </Button>
                    }
                </div>
            </div>
        )
    }
}


export class WizardStep extends BaseComponent<Ozytis.Wizard.WizardStepProps, Ozytis.Wizard.WizardStepState>{
    constructor(props: Ozytis.Wizard.WizardStepProps) {
        super(props);
        this.state = new Ozytis.Wizard.WizardStepState(props);
    }

    render() {
        return (
            <div className="content">

                {this.props.children}

            </div>
        );
    }
}