import request from 'core/request';
import { APP } from 'configs/api';
import ACTION_TYPES from '../action-types';
import MONITOR_MANAGEMENT_ACTION_TYPES from 'modules/monitor-management/action-types';
export function fetchAppComboData(store, value) {
    const url = APP.COMBO.expand({ accountId: 2 });
    return request.get(url).then(() => {}, (error) => {
        console.log(error);
        store.commit(MONITOR_MANAGEMENT_ACTION_TYPES.FETCH_MONITOR_DATA_OK);
    });
}

export default {
    [ACTION_TYPES.FETCH_APP_COMBO_DATA]: fetchAppComboData
}
