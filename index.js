const protobuf = require('protobufjs');

const person1 = {
  name: 'John',
  age: 30,
};

// Define the message schema
const personSchema = `
  syntax = "proto3";
  message Person {
    string name = 1;
    int32 age = 2;
  }
`;

// Create a Root instance to hold the schema
const root = protobuf.Root.fromJSON({
  nested: {
    Person: protobuf.parse(personSchema).root.lookupType('Person'),
  },
});

// Create a new message object and set its fields
const person = root.lookupType('Person').create(person1);

// Encode the message into a binary buffer
const buffer = root.lookupType('Person').encode(person).finish();

console.log('Encoded buffer size:', buffer.length); // 8
console.log('Direct buffer size:', Buffer.from(JSON.stringify(person1)).length); // 24

// Send the binary buffer over the network
// ...

// Decode the binary buffer back into a message object
const decodedPerson = root.lookupType('Person').decode(buffer);

console.log(decodedPerson.name); // 'John'
console.log(decodedPerson.age); // 30
