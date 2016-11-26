FROM node
COPY . ~
RUN npm install
CMD node ./gitremote/swarm_demo.js
