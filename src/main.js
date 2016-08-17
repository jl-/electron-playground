import Vue from 'vue';
import router from './core/router';
import store from './core/store';
import App from './App';
import APP_ACTION_TYPES from 'modules/app-combo/action-types';
import 'purecss/build/pure-min.css';
import 'purecss/build/grids-responsive-min.css';
import 'styles/base';
import 'styles/modules';
import 'styles/partials';
import 'styles/visuals';
import 'statics/iconfont/iconfont.css';

// store.replaceState(window.__INITIAL_STATE__);
const app = new Vue({
    router, store,
    render: h => h(App),
    activate() {
    }
});

export default function boot() {
    store.dispatch(APP_ACTION_TYPES.FETCH_APP_COMBO_DATA).then(res => {
        document.querySelector('#loading-mask').classList.add('fade');
        app.$mount('#app-root');
    }, error => {
    });
}

export { app, store, router }
