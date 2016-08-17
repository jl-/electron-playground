import ACTION_TYPES from '../action-types';
function fetchMonitorDataOk(state) {
    state.monitorManagement.termToAdd.name += 'co';
}

export default {
    [ACTION_TYPES.FETCH_MONITOR_DATA_OK]: fetchMonitorDataOk
};
