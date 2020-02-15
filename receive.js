#!/usr/bin/env node

const queueName = 'Deepanshu';
const open = require('amqplib').connect('amqp://localhost');

open.then(function(connection) {
  return connection.createChannel();
}).then(function(channel) {
  return channel.assertQueue(queueName).then(function(ok) {
    return channel.consume(queueName, function(message) {
      if (message !== null) {
        console.log(message.content.toString());
        channel.ack(message);
      }
    });
  });
}).catch(console.warn);
