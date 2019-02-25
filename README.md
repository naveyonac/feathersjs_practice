# Using Feathersjs for the first time

### Required background
Fundamental understand of Node.js/Express and javascript

## Why learn Featherjs?
For me, I felt like taking the time to learn feathersjs would help me enjoy server side programming just a little bit more. Most of the issues I have had with it origionally have come from the repetiveness of writing node/express code. Simple CLI commands take most of the repetiveness out of it while also giving you awesome built in features not available with node.js alone.

## What approach did I use to learn Feathersjs
I used mostly the documentation provided on the feathers website(and the provided guided tutorial) as well as video tutorials found on YouTube.

## Findings 
Similar to what we talked about this morning, Feathers is just a way of expaditing the backend production process. It includes built in features like services and hooks which allow you to build out methods to be used and referenced later on. 

With hooks, you are able to list out different things you want to happen before, after and in cas of an error of a service happening. Example being maybe you want to before you send a post request, verify that the user is logged in. This can be set up as a hook to run before the service to verify.

Services are basically routes, controllers, and models all in one. They can be easilly set up (feathers generate service). Feathers will set up the route and basic controller functions and models for you, meaning all you have to do, is explain what is supposed to happen when that endpoint is reached. This takes a lot of the planning out of it so the developer can focus on.. well.. developing.

The Built in authentication with JWT is an awesome feature as well. It makes the log in process nearly painless vs trying to get passport to work.

Theres also a lot of different db options available, not sure what each of them is for(neDB), but none the less, allows for more flexability!