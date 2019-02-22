# POKEVISION

Pokevision is a demo and lab project of the Azure Custom Vision Service. It creates an easy web UI for a
lab of users to use the Custom Vision service without writing client code.

## Components

### webclient

Webclient is a Vue.js based client for prediction against the Azure Custom Vision APIs.

### server

The pokevision-server provides API keys and connect info to the clients. It allows the client to enumerate projects and access
connection info without injecting the Training Key into the client.