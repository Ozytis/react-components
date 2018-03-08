import * as React from "react";

import { BaseComponent } from "..";

export module Ozytis.Tabs{

    export interface TabsProps {
        currentIndex?: number;
        onTabChange?: (newIndex) => void;
        orientation?: "horizontal" | "vertical";
        className?: string;
    }

    export class TabsState {
        currentTab: number;
    }

    export class TabPaneState {

    }
    
    export class TabPaneProps {
        title: string;
    }
    
}

export class Tabs extends BaseComponent<Ozytis.Tabs.TabsProps, Ozytis.Tabs.TabsState>{

    public static defaultProps: Partial<Ozytis.Tabs.TabsProps> = {
        orientation: "horizontal"
    };

    constructor(props: Ozytis.Tabs.TabsProps) {
        super(props);
        this.state = new Ozytis.Tabs.TabsState();
    }

    componentDidMount() {
        var currentTab = this.props.currentIndex ? this.props.currentIndex : 0;
        this.setState({ currentTab: currentTab });
    }

    changeTab(newIndex: number) {
        this.setState({ currentTab: newIndex }).then(() => {
            if (this.props.onTabChange) {
                this.props.onTabChange(newIndex);
            }
        });
    }

    componentWillReceiveProps(props) {
        var currentTab = props.currentIndex ? props.currentIndex : 0;
        this.setState({ currentTab: currentTab });
    }

    render() {
        return (
            <div className={`tabbable ${this.props.orientation}-tabs ${this.props.className ? this.props.className : ""}`}>
                <ul className="nav nav-tabs nav-fill tab-padding tab-space-3 tab-blue">
                    {
                        React.Children.map(this.props.children, (c: React.ReactElement<Ozytis.Tabs.TabPaneProps>, index) => {
                            return (
                                <li role="presentation" className="nav-item" onClick={(e) => this.changeTab(index)}>
                                    <a className={`nav-link  ${this.state.currentTab === index ? "active" : ""}`} role="tab">{c.props.title}</a>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="tab-content">
                    {
                        React.Children.map(this.props.children, (child: React.ReactElement<Ozytis.Tabs.TabPaneProps>, index: number) => {

                            var show = this.state.currentTab === index;

                            if (show) {
                                return (child);
                            } else {
                                return;
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}


export class TabPane extends BaseComponent<Ozytis.Tabs.TabPaneProps, Ozytis.Tabs.TabPaneState>{
    constructor(props: Ozytis.Tabs.TabPaneProps) {
        super(props);
        this.state = new Ozytis.Tabs.TabPaneState();
    }

    render() {
        return (
            <div className={`tab-pane active`} role="tabpanel">
                {this.props.children}
            </div>
        )
    }
}