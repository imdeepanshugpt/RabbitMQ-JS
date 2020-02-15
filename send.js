#!/usr/bin/env node

const queueName = 'Deepanshu';
let notificationChannel;

const open = require('amqplib').connect('amqp://localhost');

var connection = open.then(function(connection) {
  return connection.createChannel();
}).then(function(channel) {
  notificationChannel = channel;
  return channel.assertQueue(queueName).then(function(ok) {
    return channel.sendToQueue(queueName, Buffer.from('Hello Deepanshu'));
  });
}).catch(console.warn);
