import "./more-actions-menu.less";
import * as React from "react";
import { BaseComponent } from "../index";
import { Loader } from "../index";

export module Ozytis.MoreActionMenu {

    export interface MoreActionsMenuProps {
        items: MoreActionsMenuItem[];
        className?: string;
    }
    export class MoreActionsMenuState {
        constructor(props: MoreActionsMenuProps) {
            this.itemsState = [];
            props.items.forEach(item => {
                this.itemsState.push(false);
            })
        }

        isExpanded = false;
        itemsState: boolean[];
    }
}

export interface MoreActionsMenuItem {
    title: string;
    icon?: string;
    action: () => Promise<any>;
    show: boolean;
}

export class MoreActionsMenu extends BaseComponent<Ozytis.MoreActionMenu.MoreActionsMenuProps, Ozytis.MoreActionMenu.MoreActionsMenuState>{
    constructor(props: Ozytis.MoreActionMenu.MoreActionsMenuProps) {
        super(props);
        this.state = new Ozytis.MoreActionMenu.MoreActionsMenuState(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    performAction(itemIndex) {
        if (this.state.itemsState[itemIndex]) {
            return;
        }

        var item = this.props.items[itemIndex];

        var states = this.state.itemsState;
        states[itemIndex] = true;

        this.setState({ itemsState: states }).then(() => item.action()).then(() => {
            var states = this.state.itemsState;
            states[itemIndex] = false;
            return this.setState({ itemsState: states, isExpanded: false });
        });
    }

    render() {
        return (
            <div className={`more-action-menu ${this.props.className ? this.props.className : ""}`} tabIndex={0} onBlur={() => this.setState({ isExpanded: false })}>
                <span className="menu-trigger" onClick={() => this.setState({ isExpanded: !this.state.isExpanded })}>
                    <i className="far fa-ellipsis-h" />
                </span>
                {this.state.isExpanded &&
                    <div className="menu-actions" >
                        <ul className="menu-actions-list">
                            {
                                this.props.items.map((item, itemIdx) => {

                                    if (!item.show) {
                                        return;
                                    }

                                    return (
                                        <li className="menu-action-item" key={"menu-item-" + itemIdx} onClick={() => this.performAction(itemIdx)}>
                                            {
                                                item.icon &&
                                                <span className="menu-icon mr-1">
                                                    <Loader usualClass={item.icon} loading={this.state.itemsState[itemIdx]} />
                                                </span>
                                            }
                                            <span className="menu-title">
                                                {item.title}
                                            </span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
            </div>
        )
    }
}