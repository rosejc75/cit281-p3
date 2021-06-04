const value = [1, 5, 10, 25, 50, 100]
function validDenominantion(coin){
 return false !== value.indexOf(coin) >= 0
};

const valueFromCoinObject = (obj) => {
    let {denom = 0, count = 0} = obj;
    return denom * count;

};

//function that reduces array into single value
function valueFromArray(arr){
    const reduction = (accumulator, currentValue) => {return accumulator + valueFromCoinObject(currentValue)};
    return arr.reduce(reduction,0);
};
 
function coinCount(...coinage){
    return valueFromArray([...coinage]);
};

//export conCoint to p3-module.js
module.exports = {
    coinCount
};

//Console log statements for testing functions
console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));