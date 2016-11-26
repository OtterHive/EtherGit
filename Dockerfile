FROM node
WORKDIR /srv/app
COPY package.json /srv/app/package.json
RUN npm install
COPY . /srv/app
CMD node ./gitremote/swarm_demo.js
