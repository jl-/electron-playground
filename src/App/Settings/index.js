import styles from './style.css';
import { mapActions } from 'vuex';
import cx from 'classnames';
export default {
    name: 'Settings',
    data() {
        return {
            currentTabIndex: 0
        };
    },
    render(h) {
        return (
            <div>
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        );
    },
    methods: {
        renderHeader() {
            const { $createElement: h, currentTabIndex } = this;
            return (
                <div class={styles.header}>
                    <ul class={styles.tabHeaders}>
                        <li
                            class={cx(styles.tabHeader, {
                                [styles.tabHeaderActive]: currentTabIndex === 0 }
                            )}
                            on-click={() => this.switchTab(0)}
                        >
                            接收人设置
                        </li>
                        <li
                            class={cx(styles.tabHeader, {
                                [styles.tabHeaderActive]: currentTabIndex === 1 }
                            )}
                            on-click={() => this.switchTab(1)}
                        >
                            报警规则设置
                        </li>
                    </ul>
                </div>
            );
        },
        renderBody() {
            const h = this.$createElement;
            return (
                <div class={styles.body}>
                    <ul class={styles.tabContents}>
                        <li class={styles.tabContent}></li>
                        <li class={styles.tabContent}></li>
                    </ul>
                </div>
            );
        },
        switchTab(index) {
            if (index === this.currentTabIndex) return;
            this.currentTabIndex = index;
        }
    }
}

