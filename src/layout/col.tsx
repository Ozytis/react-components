import * as React from "react";

export module Ozytis.Layout {
    export interface ColProps {
        className?: string;
        cols: number;
        offset?: number;
    }
}

export class Col extends React.Component<Ozytis.Layout.ColProps, {}>{
    render() {
        return (
            <div className={`col-md-${this.props.cols} ${this.props.offset ? "col-md-offset-" + this.props.offset : ""}   ${this.props.className ? this.props.className : ""}`} >
                {this.props.children}
            </div>
        );
    }
}