package meshgtfsr

import (
	"context"

	"github.com/gogo/protobuf/proto"
	rmesh "github.com/pravahio/cross-lang-mesh-rpc/go/rmesh"
	gtfsr "github.com/pravahio/mesh-gtfs-realtime/go/transit_realtime"
)

const (
	channel = "/PublicBus"
)

type Feed struct {
	Msg   *gtfsr.FeedMessage
	Topic string
	Raw   []byte
}

type MeshGTFSR struct {
	mrpc   *rmesh.MeshRPC
	subCh  *rmesh.SubClient
	nextCh chan *Feed
}

func NewMeshGTFSR() (*MeshGTFSR, error) {
	c, err := rmesh.NewMeshRPC()
	if err != nil {
		return nil, err
	}
	return &MeshGTFSR{
		mrpc:   c,
		nextCh: make(chan *Feed, 20),
	}, nil
}

func (m *MeshGTFSR) Subscribe(ctx context.Context, geospace []string) error {
	sub, err := m.mrpc.Subscribe(ctx, channel, geospace)
	if err != nil {
		return err
	}

	m.subCh = sub

	go m.processMsgs()

	return nil
}

func (m *MeshGTFSR) processMsgs() {
	for {
		d, err := m.subCh.Recv()
		if err != nil {
			// log err
		}

		t := d.GetTopic()[0]
		raw := d.GetRaw()

		msg := &gtfsr.FeedMessage{}

		proto.Unmarshal(raw, msg)

		m.nextCh <- &Feed{
			Msg:   msg,
			Topic: t,
			Raw:   raw,
		}
	}
}

func (m *MeshGTFSR) Next() *Feed {
	return <-m.nextCh
}
