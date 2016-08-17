import styles from './style.css';
import { mapActions } from 'vuex';
import uid from 'utils/uid';
import findDomAncestor from 'utils/findDomAncestor';
import filterChildren from 'utils/filterChildren';
import FlatTable from 'components/FlatTable';

const PREFIX = 'AM';
const RULE_CONF_TERM_FIELD = 'name';
const RULE_CONF_KEY_FIELD = 'key';
const RULE_CONF_VALUE_FIELD = 'value';
const FORM_REF = Symbol('form');

function indexOfChild(child) {
    const parent = child.parentElement;
    return Array.prototype.indexOf.call(parent.children, child);
}

export default {
    name: 'AlarmManagement',
    data() {
        const { monitorManagement, alarmManagement } = this.$store.state;
        return {
            monitorTermsList: monitorManagement.termsList,
            alarmTermsList: alarmManagement.termsList,
            termToAdd: { name: '', rules: [[{ key: 'gt', value: 70 }, { key: 'gt', value: 70 }]]},
        };
    },
    activate() {
        this.renderOperations = ::this.renderOperations;
        this.renderAlarmRules = ::this.renderAlarmRules;
        this.handleFormChange = this.handleFormChange.bind(this);
        this.addRuleToEdit = ::this.addRuleToEdit;
        this.handleFormChange({});
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
        handleFormChange(e) {
            const { target } = e;
            const field = target.getAttribute('data-term-field');
            if (!field) return;
            const value = target.value;
            if (field === RULE_CONF_TERM_FIELD) {
                this.termToAdd.name = value;
            }
        },
        getTermDataToAdd() {
            const items = this.$refs[FORM_REF].querySelectorAll('[data-term-field]');
            const data = { rules: []};
            Array.prototype.forEach.call(items, item => {
                const field= item.getAttribute('data-term-field');
                const value = item.value;
                if (field === RULE_CONF_TERM_FIELD) {
                    data.name = value;
                } else {
                    const confItemIndex = indexOfChild(item.parentElement);
                    const ruleIndex = indexOfChild(item.parentElement.parentElement);
                    const rule = data.rules[ruleIndex] || (data.rules[ruleIndex] = []);
                    const confItem = rule[confItemIndex] || (rule[confItemIndex] = {});
                    confItem[field] = value;
                }
            });
            console.log(data);
            return data;
        },

        submitAlarmTerm(e) {
            e.preventDefault();
            const term = this.getTermDataToAdd();
        },
        renderEditor() {
            const h = this.$createElement;
            return (
                <form class='pure-form' ref={FORM_REF} on-input={this.handleFormChange} on-submit={this.submitAlarmTerm}>
                    <fieldset style="min-width: auto">
                        <legend>添加监控报警</legend>
                        {this.renderMonitorTermsSelector()}
                        {this.renderRulesToAddList()}
                        <button class='pure-button pure-button-primary'>保存</button>
                    </fieldset>
                </form>
            );
        },
        renderMonitorTermsSelector() {
            const { $createElement: h, monitorTermsList, termToAdd } = this;
            const termsList = monitorTermsList.map(term => {
                return <option>{term.name}</option>;
            });
            return (
                <div>
                    <span>监控项名称：</span>
                    <select value={termToAdd.name} data-term-field={RULE_CONF_TERM_FIELD}>{termsList}</select>
                    <span
                        on-click={this.addRuleToEdit}
                        class={styles.addRuleBtn}
                        data-tooltip='<b class="m-r--sm">添加规则.</b>多个规则间是OR关系'
                        data-tooltip-align="rc"
                    >
                    </span>
                </div>
            );
        },
        renderRulesToAddList() {
            const { $createElement: h, termToAdd: { rules }} = this;
            if (rules.length === 0) return;
            const rulesList = rules.map((rule, ruleIndex) => {
                const items = rule.map((conf, confIndex) => {
                    return (
                        <div class={styles.ruleToAddConfItem}>
                            <select class={styles.ruleToAddConfItemKey} data-term-field={RULE_CONF_KEY_FIELD}>
                                <option>大于</option>
                                <option>小于</option>
                            </select>
                            <input class={styles.ruleToAddConfItemValue} type='text' data-term-field={RULE_CONF_VALUE_FIELD} />
                            <span
                                class={styles.ruleToAddConfItemClose}
                                on-click={(e) => this.removeRuleConfItem(ruleIndex, confIndex, e)}
                            ></span>
                        </div>
                    );
                });
                const addConfItemBtn = (
                    <span
                        on-click={() => this.addRuleConfItemToEdit(ruleIndex)}
                        class={styles.addRuleBtn}
                        data-tooltip='<b class="m-r--sm">添加规则配置项.</b>配置项间是AND关系'
                        data-tooltip-align="lc"
                    >
                    </span>
                );
                return <li class={styles.ruleToAdd}>{items}{addConfItemBtn}</li>;
            });
            return <ul class={styles.rulesToAddList}>{rulesList}</ul>;
        },
        validateRules(rules = this.termToAdd.rules) {
            return true;
        },
        addRuleToEdit() {
            const { monitorTermsList, termToAdd } = this;
            termToAdd.name = termToAdd.name || (monitorTermsList && monitorTermsList[0] && monitorTermsList[0].name);
            const isAllRulesValid = this.validateRules(termToAdd.rules);
            if (!isAllRulesValid) return;
            termToAdd.rules.push([{ key: 'gt', value: '' }]);
        },
        addRuleConfItemToEdit(ruleIndex) {
            this.termToAdd.rules[ruleIndex].push({ key: 'gt', value: 10 });
        },
        removeRuleConfItem(ruleIndex, confItemIndex, e) {
            // 由于 vue 的jsx 不支持内置指令 v-model，因此双向绑定不可用，只能绕开
            // https://github.com/vuejs/babel-plugin-transform-vue-jsx#vue-directives
            const parent = e.target.parentElement;
            const rule = findDomAncestor(parent, node => node.className === styles.ruleToAdd);
            const ruleConfItems = filterChildren(rule, node => node.className === styles.ruleToAddConfItem);
            if (ruleConfItems.length === 1) {
                rule.remove();
            } else {
                parent.remove();
            }
            // const rules = this.termToAdd.rules;
            // if (rules[ruleIndex].length > 1) {
            //     rules[ruleIndex].splice(confItemIndex, 1);
            // } else {
            //     rules.splice(ruleIndex, 1);
            // }
        },
        renderTable() {
            const { $createElement: h, alarmTermsList } = this;
            return (
                <FlatTable
                    class={styles.table}
                    columns={[
                        { title: '监控项名称', field: 'name' },
                        { title: '报警条件', field: 'rules', render: this.renderAlarmRules },
                        { title: '操作', render: this.renderOperations }
                    ]}
                    data={alarmTermsList}
                >
                </FlatTable>
            );
        },
        renderAlarmRules() {
            const h = this.$createElement;
            return (
                <ul>
                    <li>条件</li>
                </ul>
            );
        },
        renderOperations() {
            const h = this.$createElement;
            return (
                <ul>
                    <li>删除</li>
                </ul>
            );
        }
    }
}

