/**
 * <Tooltip>
 *     <span slot='trigger'></span>
 *     <span slot='content'></span>
 * </Tooltip>
 *
 *
 *
 *
 */
export default {
    name: 'Tooltip',
    props: {
        tag: {
            type: String,
            default: 'span'
        }
    },
    render(h) {
        const { trigger, content } = this.$slots;
        return h(this.tag, [this.wrapTrigger(trigger), this.wrapContent(content)]);
    },
    methods: {
        wrapTrigger(slot) {
            return slot;
        },
        wrapContent(slot) {
            return slot;
        }
    }
}
