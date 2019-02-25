// const path = require('path');
// const favicon = require('serve-favicon');
// const compress = require('compression');
// const helmet = require('helmet');
// const cors = require('cors');
// const logger = require('./logger');

// const feathers = require('@feathersjs/feathers');
// const configuration = require('@feathersjs/configuration');
// const express = require('@feathersjs/express');
// const socketio = require('@feathersjs/socketio');


// const middleware = require('./middleware');
// const services = require('./services');
// const appHooks = require('./app.hooks');
// const channels = require('./channels');

// const app = express(feathers());

// // Load app configuration
// app.configure(configuration());
// // Enable security, CORS, compression, favicon and body parsing
// app.use(helmet());
// app.use(cors());
// app.use(compress());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// // Host the public folder
// app.use('/', express.static(app.get('public')));

// // Set up Plugins and providers
// app.configure(express.rest());
// app.configure(socketio());

// // Configure other middleware (see `middleware/index.js`)
// app.configure(middleware);
// // Set up our services (see `services/index.js`)
// app.configure(services);
// // Set up event channels (see channels.js)
// app.configure(channels);

// // Configure a middleware for 404s and the error handler
// app.use(express.notFound());
// app.use(express.errorHandler({ logger }));

// app.hooks(appHooks);

// module.exports = app;

const feathers = require('@feathersjs/feathers');

class Messages {
  constructor() {
    this.messages = [];
    this.currentId = 0;
  }

  async find(params) {
    // Return the list of all messages
    return this.messages;
  }

  async get(id, params) {
    // Find the message by id
    const message = this.messages.find(message => message.id === parseInt(id, 10));

    // Throw an error if it wasn't found
    if(!message) {
      throw new Error(`Message with id ${id} not found`);
    }

    // Otherwise return the message
    return message;
  }

  async create(data, params) {
    // Create a new object with the original data and an id
    // taken from the incrementing `currentId` counter
    const message = Object.assign({
      id: ++this.currentId
    }, data);

    this.messages.push(message);

    return message;
  }

  async patch(id, data, params) {
    // Get the existing message. Will throw an error if not found
    const message = await this.get(id);

    // Merge the existing message with the new data
    // and return the result
    return Object.assign(message, data);
  }

  async remove(id, params) {
    // Get the message by id (will throw an error if not found)
    const message = await this.get(id);
    // Find the index of the message in our message array
    const index = this.messages.indexOf(message);

    // Remove the found message from our array
    this.messages.splice(index, 1);

    // Return the removed message
    return message;
  }
}

const app = feathers();

// Initialize the messages service by creating
// a new instance of our class
app.use('messages', new Messages());

async function processMessages() {
    app.service('messages').on('created', message => {
      console.log('Created a new message', message);
    });
  
    app.service('messages').on('removed', message => {
      console.log('Deleted message', message);
    });
  
    await app.service('messages').create({
      text: 'First message'
    });
  
    const lastMessage = await app.service('messages').create({
      text: 'Second message'
    });
  
    // Remove the message we just created
    await app.service('messages').remove(lastMessage.id);
  
    const messageList = await app.service('messages').find();
  
    console.log('Available messages', messageList);
  }
  
  processMessages();
  
