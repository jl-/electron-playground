export default function findDOMAncestor(child, confirm) {
    let node = child && (child.parentElement || child.parentNode);
    while (node) {
        if (confirm(node)) return node;
        node = node.parentElement || node.parentNode;
    }
    return null;
}
