import * as React from "react";
import { BaseComponent } from "../base-component/base-component";

export class PanelGroup extends BaseComponent<{ withMargins?: boolean, className?:string }, {}> {

    render(){
        return  (
            <div className={`${this.props.className? this.props.className:""}  ${this.props.withMargins?"card-deck": "card-group"}`}>
            {
                this.props.children
            }
            </div>            
        );
    }

}
