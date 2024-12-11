
num  = [10,20,40,56,2343] ;

res= num.find((num)=> num%2 == 0) ; // in a callback function whatever written in the first row , without "{}" is returned directly

console.log("output of find: "+ res) ;

filRes = num.filter((num)=>num%2 == 0) ;

console.log(typeof(filRes)) ;
console.log(typeof(num));
obj = {
    a :  "Hey mf",
    b : "fuck off",
};
console.log(obj + "\n" + typeof(obj))
console.log("Output of filter : "+ filRes) ;