# Node.js Rate Limiter

An example of rate limiting a Node.js API (using Redis)

## Installation

1. `docker pull redis:alpine`
1. `docker run -p 6379:6379 --name redis-name-limiter redis:alpine`
1. `npm install`
1. `npm start`
1. Send requests to the API at http://localhost:3000/hello using any HTPP client.
