const term = { id: 1, name: '温度', rules: ['大于'], alarmRecipients: [] };
const termsList = [1,2,3,4,5,6,7,8,9, 11, 12, 13, 14, 15, 16].map(id => {
    const name = `${term.name}-${id}`;
    return { ...term, id, name };
});

export default termsList;
