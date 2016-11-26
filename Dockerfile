FROM node
COPY . /srv/app
WORKDIR /srv/app
RUN npm install
CMD pwd && ls && node ./gitremote/swarm_demo.js
