import * as React from "react";

export class Container extends React.Component<{ fluid: boolean, className?: string }, {}>{
    render() {
        return (
            <div className={`${this.props.fluid ? "container-fluid" : "container"} ${this.props.className ? this.props.className : ""}`} >
                {this.props.children}
            </div>
        );
    }
}