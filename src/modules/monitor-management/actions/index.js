import ACTION_TYPES from '../action-types';
import { APP } from 'configs/api';
export function fetchMonitorData(store, value) {
    store.commit(ACTION_TYPES.FETCH_MONITOR_DATA_OK, value);
}

export default {
    [ACTION_TYPES.FETCH_MONITOR_DATA]: fetchMonitorData
}
