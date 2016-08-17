import styles from './style.css';
import { mapActions } from 'vuex';
import uid from 'utils/uid';
import FlatTable from 'components/FlatTable';
const PREFIX = uid('mm');

export default {
    name: 'MonitorManagement',
    data() {
        return {
            vla: '123',
            termsList: this.$store.state.monitorManagement.termsList
        };
    },
    created() {
        this.renderOperations = ::this.renderOperations;
    },
    render(h) {
        return (
            <div>
                {this.renderEditor()}
                {this.renderTable()}
            </div>
        );
    },
    methods: {
        renderEditor() {
            const h = this.$createElement;
            const nameId = uid(PREFIX);
            const fieldId = uid(PREFIX);
            return (
                <form class='pure-form'>
                    <fieldset>
                        <legend>添加监控项</legend>
                        <div class='frow f-ai-fe'>
                            <div class={styles.group}>
                                <label for={nameId}>监控项名称：</label>
                                <input id={nameId} type='text' value={this.vla} on-input={(e) => this.vla = e.target.value} class='f-1' placeholder='输入名称' required />
                            </div>
                            <div class={styles.group}>
                                <label for={fieldId}>监控字段：</label>
                                <input id={fieldId} type='text' class='f-1' placeholder='消息队列输出的数据列名' required />
                            </div>
                            <button class='pure-button pure-button-primary'>添加</button>
                        </div>
                    </fieldset>
                </form>
            );
        },
        renderTable() {
            const h = this.$createElement;
            return (
                <FlatTable
                    class={styles.table}
                    columns={[
                        { title: '监控项名称', field: 'name' },
                        { title: '监控字段', field: 'field' },
                        { title: '操作', render: this.renderOperations }
                    ]}
                    data={this.termsList}
                >
                </FlatTable>
            );
        },
        renderOperations() {
            const h = this.$createElement;
            return (
                <ul>
                    <li>配置报警指标</li>
                </ul>
            );
        }
    }
}
