import * as React from "react";
import { BaseComponent } from "../base-component/base-component";



export module Ozytis.CheckBox {
    export interface CheckBoxProps {
        label: string;
        value: boolean;
        onChange: (checked: boolean) => void;
        className?: string;
        cols?: number;
    }


    export class CheckBoxState {

    }
}


export class CheckBoxControl extends BaseComponent<Ozytis.CheckBox.CheckBoxProps, Ozytis.CheckBox.CheckBoxState>{
    constructor(props: Ozytis.CheckBox.CheckBoxProps) {
        super(props);
        this.state = new Ozytis.CheckBox.CheckBoxState();
    }

    render() {
        return (

            <div className={`form-check ${this.props.className || ""} ${this.props.cols ? " col-md-" + this.props.cols : ""}`}>
                <input className="form-check-input" type="checkbox" checked={this.props.value} onChange={(e) => this.props.onChange(e.target.checked)} />
                <label className="form-check-label">                 
                    {this.props.label}
                </label>
            </div>

        )
    }
}