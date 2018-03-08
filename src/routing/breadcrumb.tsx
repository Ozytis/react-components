import "./breadcrumbs.less";
import * as React from "react";

import { Link } from "react-router-dom";
import { BaseRouteConfig } from "./base-route-config";
import { BaseComponent } from "..";

export module Ozytis.BreadCrumbs{
    export interface BreadCrumbProps {
        currentRoute: BaseRouteConfig;
        allRoutes: BaseRouteConfig[];
        homeTitle?:string;
    }
}


export class BreadCrumb extends BaseComponent<Ozytis.BreadCrumbs.BreadCrumbProps, {}>{

    render() {

        var path = "";

        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb rounded-0">
                    <li className="breadcrumb-item">
                        <i className="far fa-home"></i>
                        <Link to="/">{this.props.homeTitle||"Accueil"}</Link>
                    </li>
                    {
                        this.props.currentRoute && this.props.currentRoute.path != "/" && this.props.currentRoute.path.split("/").map((routepart, idx) => {

                            if (routepart != "") {
                                path += "/" + routepart;
                                var route = this.props.allRoutes.find(r => r.path == path);
                                return (
                                    <li className="breadcrumb-item" key={`route-${route.path}`}>
                                        <Link to={route.path}>{route.title}</Link>
                                    </li>
                                )
                            }
                        })
                    }
                </ol>
            </nav>
        )
    }
}