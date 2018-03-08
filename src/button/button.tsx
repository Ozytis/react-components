import * as React from "react";
import { BootstrapModifier } from "../modifiers";

export module Ozytis.Button{
    export interface ButtonProps {
        className?: string;
        modifier: BootstrapModifier;
        onClick?: (e: React.MouseEvent<HTMLElement>) => void;
        title?: string;
        sm?: boolean;
    }
}

export class Button extends React.Component<Ozytis.Button.ButtonProps, {}>{

    onClick(e: React.MouseEvent<HTMLElement>) {
        if (this.props.onClick) {
            this.props.onClick(e);
        } else {
            console.log("no click handler defined");
        }
    }

    render() {

        var className = "btn rounded-0 btn-" + this.props.modifier;

        if (this.props.sm) {
            className += " btn-sm";
        }       

        if(this.props.className){
            className += " " + this.props.className;
        }

        return (
            <button className={className} onClick={(e) => this.onClick(e)} title={this.props.title} >
                {this.props.children}
            </button>
        )
    }
}