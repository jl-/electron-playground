export default function filterChildren(el, confirm) {
    const children = el.children || el.childNodes;
    return Array.prototype.filter.call(children, confirm);
}
