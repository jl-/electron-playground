/**
 * Takes in an Array or a string,
 * generates an obj whose values is the same as its corresponding keys
 *
 * @param  {Array|string} keys flat Array or a string with ',' or '|' seperated keys
 * @param  {func}         transform function for key to value transform
 * @return {Object}       as {key: key}
 */
function ktv(keys, transform = (key) => key){
    var obj = {};
    keys = typeof keys === 'string' ? keys.split(/[,|]/) : keys;
    if (keys instanceof Array) {
        keys.forEach(function(key) {
            obj[key] = transform(key);
        });
    }
    return obj;
}

export default ktv;
