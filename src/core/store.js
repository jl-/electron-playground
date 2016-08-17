import Vue from 'vue';
import Vuex from 'vuex';
import appComboActions from 'modules/app-combo/actions';
import monitorManagement from 'modules/monitor-management/state';
import monitorManagementActions from 'modules/monitor-management/actions';
import monitorManagementMutations from 'modules/monitor-management/mutations';
import alarmManagement from 'modules/alarm-management/state';
import alarmHistory from 'modules/alarm-history/state';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        monitorManagement,
        alarmManagement,
        alarmHistory
    },
    getters: {
        session() {
            return {};
        }
    },
    actions: {
        ...appComboActions,
        ...monitorManagementActions
    },
    mutations: {
        ...monitorManagementMutations
    }
});

export default store;

/*
 {
    monitorManagement: {
        termToAdd: {
            name: String,
            field: Strubg
        },
        termsList: [{
        }]
    },
    alarmManagement: {
        termToAdd: {
            name: String,
            rules: [],
            alarmRecipients: [] // 告警目标联系人/组
        },
        termsList: []
    }
    alarmHistory: {
        filter: String,
        dataList: [{
        }]
    },
    settings: {
        alarmRecipients: {
            toAdd: {
                name: String
            },
            list: []
        },
        alarmRules: {
            secondsToCombo: Number
        }
    }
 }

*/
