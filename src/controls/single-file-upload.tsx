import "./controls.less";
import * as React from "react";

import { BaseComponent } from "../base-component/base-component";

export module Ozytis.SingleFileUploadControl {

    export interface SingleFileUploadControlProps {
        label: string;
        onChange: (value: string) => void;
        className?: string;
        inputStyle?: React.CSSProperties;
        value: string;
        showPreview?: boolean;
    }

    export class SingleFileUploadControlState {
        loading = false;
    }
}

export class SingleFileUploadControl extends BaseComponent<Ozytis.SingleFileUploadControl.SingleFileUploadControlProps, Ozytis.SingleFileUploadControl.SingleFileUploadControlState>{
    constructor(props: Ozytis.SingleFileUploadControl.SingleFileUploadControlProps) {
        super(props);
        var state = new Ozytis.SingleFileUploadControl.SingleFileUploadControlState();

        this.state = state;
    }

    onChange(fileList: FileList) {

        if (this.state.loading || fileList.length === 0) {
            return;
        }

        this.setState({ loading: true }).then(() => {

            var reader = new FileReader();

            reader.onloadend = result => {
                this.setState({ loading: false });
                this.props.onChange((result.target as FileReader).result);
            };

            reader.readAsDataURL(fileList[0]);
        });
    }

    control: HTMLInputElement;

    render() {



        return (
            <div className={"form-group " + this.props.className}>
                <label className="control-label">{this.props.label}</label>
                <div className="controls">
                    <input type="file" ref={input => this.control = input} onChange={(e) => this.onChange(e.target.files)} />
                    {
                        this.state.loading &&
                        <i className="fa fa-refresh fa-spin" />
                    }
                </div>
                {this.props.showPreview &&
                    <div className="image-preview">
                        <img src={this.props.value} />
                    </div>
                }
            </div>
        )
    }
}