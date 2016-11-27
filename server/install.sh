# From https://swarm-guide.readthedocs.io/en/latest/installation.html

# install prerequisites
apt install golang git

# prepare environment
mkdir ~/go
export GOPATH="$HOME/go"
echo 'export GOPATH="$HOME/go"' >> ~/.profile

# download source
mkdir -p $GOPATH/src/github.com/ethereum
cd $GOPATH/src/github.com/ethereum
git clone https://github.com/ethereum/go-ethereum
cd go-ethereum
git checkout master
go get github.com/ethereum/go-ethereum

# compile executables
go build ./cmd/bzzd
go build ./cmd/geth
go build ./cmd/bzzup
go build ./cmd/bzzhash

# symlink executables
ln -s /usr/bin/bzzd ./bzzd
ln -s /usr/bin/geth ./geth
ln -s /usr/bin/bzzup ./bzzup
ln -s /usr/bin/bzzhash ./bzzhash
