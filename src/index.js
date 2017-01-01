import { Observable } from 'rxjs';
import { createStore } from 'redux';

export function createMirroredReduxStore(container, preloadedState, enhancer) {
    // populate state with the initial state
    let currentState = container.getInitialState();

    // create the redux store
    const store = createStore(() => currentState, preloadedState, enhancer);

    // create an observable for the actual action
    const actionObservables = container.transformers
        .map(transformer => Object.keys(transformer._actions)
                .map(action => transformer._actions[action].map(() => action)))
        .reduce((acc, actions) => [...acc, ...actions]);

    const stateObservable = container.getObservable().do(console.log).skip(3);
    const actionObservable = Observable.merge(...actionObservables);

    Observable.zip(stateObservable, actionObservable)
        .subscribe(([state, action]) => {
            currentState = state;
            store.dispatch({ type: action });
        });

    store.getState = function getState() {
        return currentState;
    };

    return store;
}
