import "./controls.less";
import * as React from "react";

import {BaseComponent} from "..";

export module Ozytis.TextControl{
    export interface TextControlProps {
        label: string;
        value: any;
        onChange: React.ChangeEventHandler<HTMLInputElement>;
        cols?: number;
        placeHolder?: string;
        type?: "text" | "date" | "email" | "number" | "url";
        required?: boolean;
        min?: number;
        max?: number;
        addOn?: React.ReactNode;
        className?: string;
    }
    
}

export class TextControl extends BaseComponent<Ozytis.TextControl.TextControlProps, {}>{
    constructor(props: Ozytis.TextControl.TextControlProps) {
        super(props);      
    }

    input: HTMLInputElement;

    select() {
        this.input.select();
    }

    render() {


        var required = this.props.required || false;

        return (
            <div className={`form-group ${(this.props.cols ? "col-md-" + this.props.cols : "")} ${this.props.className || ""}`}>
                <label className={`control-label ${(required ? " required" : "")}`}>{this.props.label}</label>
                <div className={`controls ${this.props.addOn ? "input-group" : ""}`} >
                    <input ref={(input) => { this.input = input }} {...this.props.min ? { min: this.props.min } : {}} {...this.props.max ? { max: this.props.max } : {}} className={`form-control rounded-0 ${this.props.type == "number" ? "text-right" : ""}`} required={required} type={this.props.type || "text"} value={this.props.value} placeholder={this.props.placeHolder} onChange={(e) => this.props.onChange(e)} />
                    {
                        this.props.addOn &&
                        <span className="input-group-append">
                            {
                                <span className="input-group-text"> {this.props.addOn}</span>
                            }
                        </span>
                    }
                </div>
            </div>
        )
    }
}