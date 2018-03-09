import * as React from "react";
import { BaseComponent } from "../base-component/base-component";
import { CSSProperties } from "react";
import { BootstrapModifier } from "../modifiers";

export module Ozytis.Panel {

    export interface PanelProps {
        renderHeader?: () => JSX.Element;
        renderTools?: () => JSX.Element;
        title?: string;
        subtitle?: string;
        renderFooter?: () => JSX.Element;
        onClick?: () => any;
        className?: string;
        noborder?: boolean;
        grow?: number;
        modifier?: BootstrapModifier;
    }

    export class PanelState {
        constructor(props: PanelProps) {

        }
    }
}

export class Panel extends BaseComponent<Ozytis.Panel.PanelProps, Ozytis.Panel.PanelState>{
    constructor(props: Ozytis.Panel.PanelProps) {
        super(props);

        this.state = new Ozytis.Panel.PanelState(props);
    }

    render() {

        var style: CSSProperties = {};

        if (this.props.grow) {
            style.flexGrow = this.props.grow;
        }

        return (
            <div onClick={() => this.props.onClick ? this.props.onClick() : void (0)}
                className={`card card-${this.props.modifier || "default"} rounded-0  ${this.props.className ? this.props.className : ""} ${this.props.noborder ? "border-0" : ""}`} style={style}>

                {this.props.renderHeader &&
                    <div className="card-header">
                        {
                            this.props.renderHeader()
                        }
                    </div>
                }

                <div className="card-body">
                    {
                        this.props.renderTools && (
                            <div className="card-tools">
                                {this.props.renderTools()}
                            </div>
                        )
                    }
                    {this.props.title && <h5 className="panel-title">{this.props.title}</h5>}
                    {this.props.subtitle && <h6 className="panel-subtitle">{this.props.subtitle}</h6>}
                    <div className="card-text">
                        {
                            this.props.children
                        }
                    </div>
                </div>

                {
                    this.props.renderFooter &&
                    <div className="card-footer">
                        {
                            this.props.renderFooter()
                        }
                    </div>
                }
            </div>

        )
    }
}