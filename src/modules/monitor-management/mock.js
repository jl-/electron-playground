const term = { id: 1, name: '温度', field: 'temperature' };
const termsList = [1,2,3,4,5,6,7,8,9, 11, 12, 13, 14, 15, 16].map(id => {
    const name = `${term.name}-${id}`;
    const field = `${term.field}-${id}`;
    return { ...term, id, name, field };
});

export default termsList;
