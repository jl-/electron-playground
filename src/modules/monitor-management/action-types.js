import uid from 'utils/uid';
import ktv from 'utils/ktv';

const ACTION_TYPES = [
    'FETCH_MONITOR_DATA',
    'FETCH_MONITOR_DATA_OK'
];
export default ktv(ACTION_TYPES, uid);
