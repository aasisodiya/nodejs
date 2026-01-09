// # Complex Boolean Operations

//## Boolean String String
console.log(true || "akash" || "frostfire"); //true
console.log(true && "akash" || "frostfire"); //akash
console.log(true || "akash" && "frostfire"); //true
console.log(true && "akash" && "frostfire"); //frostfire
//## String Boolean String
console.log("akash" || true || "frostfire"); //akash
console.log("akash" && true || "frostfire"); //true
console.log("akash" || true && "frostfire"); //akash
console.log("akash" && true && "frostfire"); //frostfire
//## String String Boolean
console.log("akash" || "frostfire" || true); //akash
console.log("akash" && "frostfire" || true); //frostfire
console.log("akash" || "frostfire" && true); //akash
console.log("akash" && "frostfire" && true); //true
//## Boolean Boolean String
console.log(false || false || "akash"); //akash
console.log(false && false || "akash"); //akash
console.log(false || false && "akash"); //false
console.log(false && false && "akash"); //false
//## Boolean String Boolean
console.log(false || "akash" || false); //akash
console.log(false && "akash" || false); //false
console.log(false || "akash" && false); //false
console.log(false && "akash" && false); //false
//## String Boolean Boolean
console.log("akash" || false || false); //akash
console.log("akash" && false || false); //false
console.log("akash" || false && false); //akash
console.log("akash" && false && false); //false
//## Boolean Boolean Boolean
console.log(false || false || true); //true
console.log(false && false || true); //true
console.log(false || false && true); //false
console.log(false && false && true); //false
//## String String String
console.log("alpharock" || "akash" || "frostfire"); //alpharock
console.log("alpharock" && "akash" || "frostfire"); //akash
console.log("alpharock" || "akash" && "frostfire"); //alpharock
console.log("alpharock" && "akash" && "frostfire"); //frostfire
//## String Boolean
console.log("akash" && true); //true
console.log("akash" && false); //false
console.log("akash" || true); //akash
console.log("akash" || false); //akash
//## Boolean String
console.log(true && "akash"); //akash
console.log(false && "akash"); //false
console.log(true || "akash"); //true
console.log(false || "akash"); //akash
//## String String
console.log("frostfire" && "akash"); //akash
console.log("frostfire" || "akash"); //frostfire
//## String String (Single Operator)
console.log("frostfire" & "akash"); //0
console.log("frostfire" | "akash"); //0
//## String Boolean (Single Operator)
console.log("frostfire" & true); //0
console.log("frostfire" | true); //1
console.log("frostfire" & false); //0
console.log("frostfire" | false); //0
//## Boolean String (Single Operator)
console.log(true & "frostfire"); //0
console.log(true | "frostfire"); //1
console.log(false & "frostfire"); //0
console.log(false | "frostfire"); //0
//## Boolean Boolean (Single Operator)
console.log(true | true); //1
console.log(true | false); //1
console.log(false | true); //1
console.log(false | false); //0
console.log(true & true); //1
console.log(true & false); //0
console.log(false & true); //0
console.log(false & false); //0