import sys
import time

from mesh_gtfsr.mesh import MeshGTFSR
from mesh_gtfsr import MeshRPCException

def main(argv):

	if len(argv) > 2 and argv[2] != "":
		m = MeshGTFSR(argv[2])
	else:
		m = MeshGTFSR()

	if len(argv) == 1 or argv[1] == 'sub':
		try:
			sub(m)
		except MeshRPCException as e:
			print(e.getMessage())
	else:
		try:
			pub(m)
		except MeshRPCException as e:
			print(e.getMessage())

def sub(m):
	feed = m.subscribe()

	for f in feed:
		print(f) 

def pub(m):
	rt = {
		"header": {
			"timestamp": 1234
		},
		"entity": [
			{
				"id": "1234",
				"vehicle": {
					"position": {
						"latitude": 77.23524,
						"longitude": 22.35343
					}
				}
			}
		]
	}

	m.registerToPublish()

	for i in range(100):
		m.publish(rt)
		time.sleep(5)

if "__main__" == __name__:
	main(sys.argv)