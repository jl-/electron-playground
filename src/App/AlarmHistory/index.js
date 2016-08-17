import styles from './style.css';
import { mapActions } from 'vuex';
import FlatTable from 'components/FlatTable';
export default {
    name: 'AlarmHistory',
    data() {
        const { monitorManagement, alarmManagement, alarmHistory } = this.$store.state;
        return {
            alarmTermsList: alarmManagement.termsList,
            historyDataList: alarmHistory.dataList
        };
    },
    render(h) {
        return (
            <div>
                {this.renderFilter()}
                {this.renderTable()}
            </div>
        );
    },
    methods: {
        renderFilter() {
            const { $createElement: h, alarmTermsList } = this;
            const filters = alarmTermsList.map(term => {
                return <option>{term.name}</option>;
            });
            return <div class='pure-form m-b--md'><select>{filters}</select></div>;
        },
        renderTable() {
            const { $createElement: h, historyDataList } = this;
            return (
                <FlatTable
                    class={styles.table}
                    columns={[
                        { title: '报警时间', field: 'time' },
                        { title: '报警值', field: 'value' },
                        { title: '接收人', filed: 'recipient' },
                        { title: '是否成功', filed: 'status', render: ok => ok ? '是' : '否' }
                    ]}
                    data={historyDataList}
                >
                </FlatTable>
            );
        }
    }
}
