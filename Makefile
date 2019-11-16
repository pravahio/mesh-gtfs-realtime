all: py js

py: *.proto
	mkdir -p build/py
	pip install grpcio-tools
	python -m grpc_tools.protoc -I=. --python_out=build/py --grpc_python_out=build/py rpc.proto
	protoc -I=. --python_out=build/py gtfs-realtime.proto

js: *.proto
	mkdir -p build/js
	protoc -I=. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:build/js rpc.proto
	protoc -I=. --js_out=import_style=commonjs:build/js gtfs-realtime.proto

golang: *.proto
	mkdir -p build/go
	protoc -I=. --go_out=plugins=grpc:build/go rpc.proto
	protoc -I=. --go_out=build/go gtfs-realtime.proto

clean: 
	rm -rf build

dev:
	export PYTHONPATH=/Users/abhishek/Documents/SoketLabs/projects/protocols/mesh-gtfs-realtime/py:/Users/abhishek/Documents/SoketLabs/projects/cross-lang-mesh-rpc/py

.PHONY: py js clean