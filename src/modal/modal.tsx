import * as React from "react";

import { BaseComponent } from "../base-component/base-component";

export module Ozytis.Modal{

    export interface ModalProps {
        show: boolean;
        large?: boolean;
        onClose?: () => any;
        hideHeader?: boolean;
        renderHeader?: () => React.Component;
        title?: string;

        renderFooter?: () => JSX.Element;
    }

    export class ModalState {
        constructor(props: ModalProps) {

        }
    }
}

export class Modal extends BaseComponent<Ozytis.Modal.ModalProps, Ozytis.Modal.ModalState>{
    constructor(props: Ozytis.Modal.ModalProps) {
        super(props);

        this.state = new Ozytis.Modal.ModalState(props);
    }

    render() {
        return (
            <div className={`modal fade ${this.props.show ? "show d-block" : ""} ${this.props.large ? "large" : ""}`} role="dialog" aria-hidden={true}>
                <div className={`modal-dialog   ${this.props.large ? "modal-lg" : ""}`} role="document">
                    <div className={`modal-content rounded-0`}>
                        {!this.props.hideHeader &&
                            <div className="modal-header">
                                {this.props.renderHeader && this.props.renderHeader()}

                                {!this.props.renderHeader && this.props.title && <h5 className="modal-title">{this.props.title}</h5>}
                                {!this.props.renderHeader && this.props.onClose &&

                                    <button type="button" className="close" onClick={() => this.props.onClose()} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                }
                            </div>
                        }

                        <div className="modal-body">
                            {
                                this.props.children
                            }
                        </div>

                        {
                            this.props.renderFooter &&
                            <div className="modal-footer">
                                {
                                    this.props.renderFooter()
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}