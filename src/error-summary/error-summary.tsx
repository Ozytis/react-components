import * as React from "react";
import { BaseComponent } from "../base-component/base-component";


export class ErrorSummary extends BaseComponent<{ errors: string[], globalText?:string }, {}>{
    constructor(props?: { errors: string[] }) {
        super(props);
    }

    render() {

        if (!this.props.errors || this.props.errors.length === 0) {
            return null;
        }

        return (
            <div className="validation-summary-errors alert alert-danger rounded-0" role="alert">
                {this.props.globalText || "Veuillez corriger les erreurs suivantes :"} :
                    <ul>
                    {
                        this.props.errors.map && this.props.errors.map((error, index) => (
                            <li key={`error-${index}`}>{error}</li>
                        ))
                    }                   
                    </ul>
            </div>

        )
    }
}