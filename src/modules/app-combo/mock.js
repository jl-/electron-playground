const monitorTerm = { id: 1, name: '温度', field: 'temperature' };
const monitorTerms = [1,2,3,4,5,6,7,8,9, 11, 12, 13, 14, 15, 16].map(id => {
    const name = `${monitorTerm.name}-${id}`;
    const field = `${monitorTerm.field}-${id}`;
    return { ...monitorTerm, id, name, field };
});

export default monitorTerms;
