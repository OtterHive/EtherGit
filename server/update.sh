cd $GOPATH/src/github.com/ethereum/go-ethereum
git checkout swarm
git pull
go build $(pwd)/cmd/geth $(pwd)/cmd/bzzd $(pwd)/cmd/bzzup $(pwd)/cmd/bzzhash
