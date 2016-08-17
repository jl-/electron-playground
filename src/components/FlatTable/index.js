/**
 * <flat-table
 *   vt-columns={[
*       { title: '监控项名称', field: 'name' },
*       { title: '监控字段', field: 'field' },
*       { title: () => '操作', render: customRenderFunc }
*    ]}
*    data={[
*       { id: 1, name: '温度', field: 'temperature' }, { id: 2, name: '温度', field: 'humidity' }
*    ]}
 * >
 * </flat-table>
 *
 */
import styles from './style.scss';
export default {
    name: 'FlatTable',
    props: {
        columns: {
            type: Array,
            default: []
        },
        data: {
            type: Array,
            default: []
        }
    },
    render(h) {
        console.log(this);
        return (
            <table class={styles.table}>
                {this.renderThead()}
                {this.renderTbody()}
            </table>
        );
    },
    methods: {
        renderThead() {
            const { $createElement: h, columns: columnsConf } = this;
            const cols = columnsConf.map(({ title }) => {
                const content = typeof title === 'function' ? title(columnsConf) : title;
                return <td>{content}</td>;
            });
            return <thead><tr>{cols}</tr></thead>
        },
        renderTbody() {
            const { $createElement: h, columns: columnsConf, data } = this;
            const trs = data.map(row => {
                const tds = columnsConf.map(col => this.renderDataTd(col, row));
                return <tr>{tds}</tr>;
            });
            return <tbody>{trs}</tbody>;
        },
        renderDataTd(col, row) {
            const h = this.$createElement;
            const { field, render } = col;
            const content = typeof render === 'function' ? render(row[field], row) : row[field];
            return <td>{content}</td>;
        }
    }
}
