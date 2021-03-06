import { connect } from "react-redux";

import Extension from "@js/components/Extension";
import Rx from "rxjs";
import { changeZoomLevel } from "@mapstore/actions/map";

export default {
    name: "SampleExtension",
    component: connect(state => ({
        value: state.extension && state.extension.value
    }), {
        onIncrease: () => {
            return {
                type: 'INCREASE_COUNTER'
            };
        }, changeZoomLevel
    })(Extension),
    reducers: {
        extension: (state = { value: 1 }, action) => {
            if (action.type === 'INCREASE_COUNTER') {
                return { value: state.value + 1 };
            }
            return state;
        }
    },
    epics: {
        logCounterValue: (action$, store) => action$.ofType('INCREASE_COUNTER').switchMap(() => {
            /* eslint-disable */
            console.log('CURRENT VALUE: ' + store.getState().extension.value);
            /* eslint-enable */
            return Rx.Observable.empty();
        })
    },
    containers: {
        Toolbar: {
            name: "extension",
            position: 10,
            tooltip: "",
            help: "",
            tool: true,
            priority: 1
        }
    }
};
