import uid from 'utils/uid';
import ktv from 'utils/ktv';

const ACTION_TYPES = [
    'FETCH_APP_COMBO_DATA',
    'FETCH_APP_COMBO_DATA_OK'
];
export default ktv(ACTION_TYPES, uid);
