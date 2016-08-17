import styles from './style.css';
import Tooltip from 'components/Tooltip/singleton';
const linksConf = [
    { to: '/monitor-management', title: '监控项管理' },
    { to: '/alarm-management', title: '报警管理' },
    { to: '/alarm-history', title: '报警历史' },
    { to: '/settings', title: '设置' }
];

export default {
    name: 'App',
    render(h) {
        return (
            <div id='app-root' class={styles.root}>
                {this.renderAside()}
                <router-view class={styles.main}></router-view>
                <Tooltip />
            </div>
        );
    },
    methods: {
        renderAside() {
            const h = this.$createElement
            const links = linksConf.map(link => (
                <li class='pure-menu-item'>
                    <router-link
                        to={link.to}
                        class={styles.link}
                        activeClass={styles.linkActive}
                    >
                        {link.title}
                    </router-link>
                </li>
            ));
            return (
                <div class={styles.aside}>
                    <ul class='pure-menu-list'>{links}</ul>
                </div>
            );
        }
    }
}
