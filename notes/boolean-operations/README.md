# Complex Boolean Operations

## String Boolean Operations

| Expression         | Output |
| ------------------ | ------ |
| "akash" && true    | true   |
| "akash" && false   | false  |
| "akash" \|\| true  | akash  |
| "akash" \|\| false | akash  |

## Boolean String Operations

| Expression         | Output |
| ------------------ | ------ |
| true && "akash"    | akash  |
| false && "akash"   | false  |
| true \|\| "akash"  | true   |
| false \|\| "akash" | akash  |

## String String Operations

| Expression               | Output    |
| ------------------------ | --------- |
| "frostfire" && "akash"   | akash     |
| "frostfire" \|\| "akash" | frostfire |

## String String (Single Operator) Operations

| Expression             | Output |
| ---------------------- | ------ |
| "frostfire" & "akash"  | 0      |
| "frostfire" \| "akash" | 0      |

## String Boolean (Single Operator) Operations

| Expression           | Output |
| -------------------- | ------ |
| "frostfire" & true   | 0      |
| "frostfire" \| true  | 1      |
| "frostfire" & false  | 0      |
| "frostfire" \| false | 0      |

## Boolean String (Single Operator) Operations

| Expression           | Output |
| -------------------- | ------ |
| true & "frostfire"   | 0      |
| true \| "frostfire"  | 1      |
| false & "frostfire"  | 0      |
| false \| "frostfire" | 0      |

## Boolean Boolean (Single Operator) Operations

| Expression     | Output |
| -------------- | ------ |
| true \| true   | 1      |
| true \| false  | 1      |
| false \| true  | 1      |
| false \| false | 0      |
| true & true    | 1      |
| true & false   | 0      |
| false & true   | 0      |
| false & false  | 0      |

## Boolean String String Operations

| Expression                         | Output    |
| ---------------------------------- | --------- |
| true \|\| "akash" \|\| "frostfire" | true      |
| true && "akash" \|\| "frostfire"   | akash     |
| true \|\| "akash" && "frostfire"   | true      |
| true && "akash" && "frostfire"     | frostfire |

## String Boolean String Operations

| Expression                         | Output    |
| ---------------------------------- | --------- |
| "akash" \|\| true \|\| "frostfire" | akash     |
| "akash" && true \|\| "frostfire"   | true      |
| "akash" \|\| true && "frostfire"   | akash     |
| "akash" && true && "frostfire"     | frostfire |

## String String Boolean Operations

| Expression                         | Output    |
| ---------------------------------- | --------- |
| "akash" \|\| "frostfire" \|\| true | akash     |
| "akash" && "frostfire" \|\| true   | frostfire |
| "akash" \|\| "frostfire" && true   | akash     |
| "akash" && "frostfire" && true     | true      |

## Boolean Boolean String Operations

| Expression                    | Output |
| ----------------------------- | ------ |
| false \|\| false \|\| "akash" | akash  |
| false && false \|\| "akash"   | akash  |
| false \|\| false && "akash"   | false  |
| false && false && "akash"     | false  |

## Boolean String Boolean Operations

| Expression                    | Output |
| ----------------------------- | ------ |
| false \|\| "akash" \|\| false | akash  |
| false && "akash" \|\| false   | false  |
| false \|\| "akash" && false   | false  |
| false && "akash" && false     | false  |

## String Boolean Boolean Operations

| Expression                    | Output |
| ----------------------------- | ------ |
| "akash" \|\| false \|\| false | akash  |
| "akash" && false \|\| false   | false  |
| "akash" \|\| false && false   | akash  |
| "akash" && false && false     | false  |

## Boolean Boolean Boolean Operations

| Expression                 | Output |
| -------------------------- | ------ |
| false \|\| false \|\| true | true   |
| false && false \|\| true   | true   |
| false \|\| false && true   | false  |
| false && false && true     | false  |

## String String String Operations

| Expression                                | Output    |
| ----------------------------------------- | --------- |
| "alpharock" \|\| "akash" \|\| "frostfire" | alpharock |
| "alpharock" && "akash" \|\| "frostfire"   | akash     |
| "alpharock" \|\| "akash" && "frostfire"   | alpharock |
| "alpharock" && "akash" && "frostfire"     | frostfire |
