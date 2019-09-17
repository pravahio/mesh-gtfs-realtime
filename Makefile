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

clean: 
	rm -rf build

.PHONY: py js clean