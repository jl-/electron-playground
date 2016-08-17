import Vue from 'vue'
import FlatTable from './index'
import { expect } from 'chai';
import styles from './style.scss';

describe('FlatTable', () => {
    let vm;
    beforeEach(() => {
        vm = new Vue({
            render(h) {
                return (
                    <FlatTable
                        class='inject-class'
                        columns={[
                            { title: '报警时间', field: 'time' },
                            { title: '报警值', field: 'value' },
                            { title: '接收人', filed: 'recipient' },
                            { title: '是否成功', filed: 'status', render: ok => ok ? '是' : '否' }
                        ]}
                        data={[]}
                    >
                    </FlatTable>
                );
            }
        }).$mount();
    });
    it(`props bind ok`, () => {
        expect(vm.$el.querySelectorAll('td').length).to.equal(4);
    });
});


