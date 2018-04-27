import * as React from "react";
import { BaseComponent } from "../base-component/base-component";

export module Ozytis.SelectControl {
    export interface SelectControlProps {
        options: any[];
        label: string;
        onChange: (value: string) => void;
        className?: string;
        inputStyle?: React.CSSProperties;
        value?: any;
        getOptionText: (opt: any) => string;
        getOptionValue: (opts: any) => string;
        noSelectionText?: string;
        cols?: number;
    }

    export class SelectControlState {
        constructor(props: Ozytis.SelectControl.SelectControlProps) {
        }
    }

}

export class SelectControl extends BaseComponent<Ozytis.SelectControl.SelectControlProps, Ozytis.SelectControl.SelectControlState> {
    constructor(props: Ozytis.SelectControl.SelectControlProps) {
        super(props);
        this.state = new Ozytis.SelectControl.SelectControlState(props);
    }

    optionHasChanged(value: any, valueIsSelected: boolean) {
        if (valueIsSelected) {
            this.props.onChange(value);
        }
    }

    render() {

        var value = this.props.value;

        return (

            <div className={"control-group " + this.props.className + (this.props.cols ? " col-md-" + this.props.cols : "")}>
                <label className="control-label">{this.props.label}</label>

                <div className="controls">
                    <select onChange={(e) => this.props.onChange(e.target.value)} value={value} className="form-control">

                        {
                            (this.props.noSelectionText || (this.props.options && !this.props.options.some(o => this.props.getOptionValue(o) == value))) &&
                            <option key="empty" value={null}>{this.props.noSelectionText || ""}</option>
                        }

                        {
                            this.props.options && this.props.options.map((option, index) => {

                                var value = this.props.getOptionValue(option);
                                var text = this.props.getOptionText(option);

                                return (
                                    <option value={value} key={"opt-" + index}>{text}</option>
                                );
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }
}