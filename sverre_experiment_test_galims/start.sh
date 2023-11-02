#!bin/bash

# Install empirica
curl https://install.empirica.dev | sh

# Install dependencies
(cd server && empirica npm install)
(cd client && empirica npm install)

# Start the server
empirica --production
