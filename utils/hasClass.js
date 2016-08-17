export default function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className);
    const classList = el.className.split(/\s+/);
    return classList.indexOf(className) !== -1;
}
