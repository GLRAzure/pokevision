# POKEVISION

Pokevision is a demo and lab project of the Azure Custom Vision Service. It creates an easy web UI for a
lab of users to use the Custom Vision service without writing client code.

## Components

### webclient

Webclient is a Vue.js based client for prediction against the Azure Custom Vision APIs.

### server

The pokevision-server provides API keys and connect info to the clients. It allows the client to enumerate projects and access
connection info without injecting the Training Key into the client.

## Lab Resources

What is Custom Vision Service?: https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/home

Demo web client: https://techo.azurewebsites.net

Login username: techo2019@peteydemo.onmicrosoft.com

Tips:

- Make sure you have at least five images for each pokemon
- If you get an error, make sure you have trained your model and marked an iteration as default.
- Too many images may cause over-training

Future development ideas:

- Create a centralized automated scoring service that rates each project against a set of test images.
- Expand the web client to support training; scale imges to a reasonable size for uploading on slow networks