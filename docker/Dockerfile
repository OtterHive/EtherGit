FROM ubuntu
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:ethereum/ethereum
RUN add-apt-repository -y ppa:ethereum/ethereum-dev
RUN apt-get install -y build-essential golang libgmp32-dev git
COPY ./bash_aliases ~/.bash_aliases
RUN export GOPATH=~/go
RUN export PATH=$GOPATH/bin:$PATH
RUN git clone git@github.com:ethersphere/go-ethereum.git $GOPATH/src/github.com/ethereum/go-ethereum
RUN go get github.com/tools/godep
RUN cd $GOPATH/src/github.com/ethereum/go-ethereum
RUN git remote add  upstream git@github.com:ethereum/go-ethereum.git
RUN git remote update
RUN git checkout -b swarm --track upstream/swarm
RUN godep go build -v ./cmd/geth
RUN apt-get install -y npm node
RUN npm install -g npm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
RUN nvm install 0.12
RUN git clone https://github.com/cubedro/eth-netstats
RUN cd eth-netstats
RUN npm install
RUN npm install -g grunt-cli
RUN export WS_SECRET=BZZ322
RUN npm start
RUN apt-get install -y nginx
