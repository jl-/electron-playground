const item = { id: 1, time: '21', value: 12, recipient: 'me' };
const itemsList = [1,2,3,4,5,6,7,8,9, 11, 12, 13, 14, 15, 16].map(id => {
    const time = `${item.time}-${id}`;
    return { ...item, id, time };
});

export default itemsList;
