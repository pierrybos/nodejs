// a JSON array
["one", "two", "three"]

// a JSON object
{ "one": 1, "two": 2, "three": 3 }

var data = {
  name: "Jackson Mafra"
  , age: 34
  , title: "Instrutor de JavaScript"
}

var jsonStr = JSON.stringify(data);

console.log(jsonStr);

// prints '{"name":"Jackson Mafra","age":34,"title":"Instrutor de JavaScript"}'

var jsonStr = '{"name":"Jackson Mafra","age":34,"title":"Instrutor de JavaScript"}';

var data = JSON.parse(jsonStr);

console.log(data.title);

// prints 'Instrutor de JavaScript'