package meshgtfsr

import (
	"context"
	"testing"
)

func TestMesh(t *testing.T) {
	m, err := NewMeshGTFSR()
	if err != nil {
		t.Fatal(err)
	}

	m.Subscribe(context.Background(), []string{"/in/delhi"})
}
