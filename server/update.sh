cd $GOPATH/src/github.com/ethereum/go-ethereum
git checkout swarm
git pull
go build ./cmd/geth ./cmd/bzzd ./cmd/bzzup ./cmd/bzzhash
