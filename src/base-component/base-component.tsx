import * as React from "react";

export class BaseComponent<P, S> extends React.Component<P, S> {
    setState<K extends keyof S>(newState: ((prevState: Readonly<S>, props: P) => (Pick<S, K> | S)) | (Pick<S, K> | S)) {
        return new Promise<void>(resolve => {
            super.setState(newState, () => { resolve(); });
        });
    }


    checkStatePropertyFalse(propertyName: string) {

        return new Promise((resolve, reject) => {
            if (!!this.state[propertyName]) {
                reject();
            }
            else {
                resolve();
            }

        });

    }
}

export class BaseComponentWithModel<P, S extends { model: any }> extends BaseComponent<P, S>
{
    updateModel(property: string, value: any) {
        var model = this.state.model;

        if (!model) {
            throw "pas de model défini pour l'état de ce composant";
        }

        model[property] = value;

        return this.setState({ model: model });
    }

}