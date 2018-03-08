import { RouteComponentProps } from "react-router";

export class BaseRouteConfig {
    constructor(public path: string, public title: string, public component: React.ComponentType<RouteComponentProps<any> | {}>, public needAuthentication = true) {

    }
}
