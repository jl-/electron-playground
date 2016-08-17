import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// make sure `Vue.use(Router)` runs before importing
// any other components, because they might rely on Router
// like `v-link`
const MonitorManagement = require('../App/MonitorManagement').default;
const AlarmManagement = require('../App/AlarmManagement').default;
const AlarmHistory = require('../App/AlarmHistory').default;
const Settings = require('../App/Settings').default;

const router = new Router({
    mode: 'hash',
    routes: [
        // { path: '/world', component: resolve =>  require(['../World'], resolve) }
        { path: '/', component: MonitorManagement },
        { path: '/monitor-management', component: MonitorManagement },
        { path: '/alarm-management', component: AlarmManagement },
        { path: '/alarm-history', component: AlarmHistory },
        { path: '/settings', component: Settings }
    ]
});

export default router;

