import * as React from "react";


export module Ozytis.Layout {
    export interface RowProps {
        className?: string;
        onClick?: () => any;
    }
}

export class Row extends React.Component<Ozytis.Layout.RowProps, {}>{
    render() {
        return (
            <div className={`row ${this.props.className ? this.props.className : ""}`} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}