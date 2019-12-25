all: py js

py: *.proto
	mkdir -p build/py
	pip install grpcio-tools
	protoc -I=. --python_out=build/py gtfs-realtime.proto

js: *.proto
	mkdir -p build/js
	protoc -I=. --js_out=import_style=commonjs:build/js gtfs-realtime.proto

golang: *.proto
	mkdir -p build/go
	protoc -I=. --go_out=build/go gtfs-realtime.proto

java: *.proto
	mkdir -p build/java
	protoc -I=. --java_out=build/java gtfs-realtime.proto

clean: 
	rm -rf build

dev:
	export PYTHONPATH=/Users/abhishek/Documents/SoketLabs/projects/protocols/mesh-gtfs-realtime/py:/Users/abhishek/Documents/SoketLabs/projects/cross-lang-mesh-rpc/py

.PHONY: py js clean