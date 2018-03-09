import "./controls.less";
import * as React from "react";

import { BaseComponent } from "../base-component/base-component";

export module Ozytis.TextAreaControl{
    export interface TextAreaControlProps {
        label: string;
        value: any;
        onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
        className?: string;
        inputStyle?: React.CSSProperties;
        rows?: number;
        required?: boolean;
    }
    
}

export class TextAreaControl extends React.Component<Ozytis.TextAreaControl.TextAreaControlProps, {}>{
    constructor(props: Ozytis.TextAreaControl.TextAreaControlProps) {
        super(props);
    }

    control:HTMLTextAreaElement;

    render() {

        var className = "form-group " + (this.props.className + "");
     

        if (this.props.required) {
            className += " required";
        }

        return (
            <div className={className}>
                <label className={`control-label ${this.props.required ? "required" : ""}`}>{this.props.label}</label>
                <div className="controls">
                    <textarea ref={elem=>this.control=elem} {...this.props.required} 
                        rows={this.props.rows || 4} className="form-control" value={this.props.value} 
                        onChange={(e) => this.props.onChange(e)} style={this.props.inputStyle} />
                </div>
            </div >
        )
    }
}