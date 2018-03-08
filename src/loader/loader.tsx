import * as React from "react";
import { BaseComponent } from "../base-component";

export module Ozytis.Loader{

    export interface LoaderProps {
        loaderClass?: string;
        usualClass: string;
        loading: boolean;
    }
}

export class Loader extends BaseComponent<Ozytis.Loader.LoaderProps, {}>{
    constructor(props: Ozytis.Loader.LoaderProps) {
        super(props);
    }

    render() {
        var loaderClass = this.props.loaderClass || "far fa-sync fa-spin mr-2";

        if (this.props.loading) {
            return (
                <i className={loaderClass} />
            )
        } else {
            return (
                <i className={this.props.usualClass} />
            )
        }
    }
}