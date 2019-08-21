const { FeedMessage, FeedEntity, FeedHeader } = require('./lib/gtfs-realtime_pb')
const {PeerTopicInfo, PublishData, Data, Response} = require('./lib/rpc_pb');
const { MeshClient } = require('./lib/rpc_grpc_web_pb.js')

const { Default } = require('./defaults')
const { Events } = require('./events')

class MeshGTFSR {
    constructor() {
        this.client = new MeshClient('http://' + Default.rpcURL, null, null);
        this.subEvents = new Events('sub')
        this.pubEvents = new Events('pus')
        console.log('sub: ', this.subEvents, new Events('uyuu'))
    }

    subscribe() {
        let peerTopic = new PeerTopicInfo()
        peerTopic.setTopic(Default.topic)

        let stream = this.client.subscribe(peerTopic, {})

        let ctx = this

        stream.on('data', (response) => {
            if(ctx.subEvents.get('data') == undefined) {
                return
            }

            var data = FeedMessage.deserializeBinary(new Uint8Array(response.getRaw()))
            
            ctx.subEvents.get('data')(data)
        });
        stream.on('error', (response) => {
            if(ctx.subEvents.get('error') == undefined) {
                return
            }

            ctx.subEvents.get('error')(response)
        });
        stream.on('end', (response) => {
            if(ctx.subEvents.get('end') == undefined) {
                return
            }

            ctx.subEvents.get('end')(response)
        });
        stream.on('status', function(response) {
            if(ctx.subEvents.get('status') == undefined) {
                return
            }

            ctx.subEvents.get('status')(response)
        });

        return this.subEvents
    }

    publish(d) {
        if(!(d instanceof FeedMessage)) {
            return 
        }

        let peerTopic = new PeerTopicInfo()
        peerTopic.setTopic(Default.topic)

        let data = new Data()
        data.setRaw(d.serializeBinary())

        let pubData = new PublishData()
        pubData.setInfo(peerTopic)
        pubData.setData(data)

        let res = this.client.publish(pubData)

        let ctx = this
        
        res.on('status', (res) => {
            if(ctx.pubEvents.get('status') == undefined) {
                return
            }

            ctx.pubEvents.get('status')(res)
        })
        res.on('data', (res) => {
            if(ctx.pubEvents.get('data') == undefined) {
                return
            }

            ctx.pubEvents.get('data')(res)
        })
        res.on('error', (res) => {
            if(ctx.pubEvents.get('error') == undefined) {
                return
            }

            ctx.pubEvents.get('error')(res)
        })

        return this.pubEvents
    }
}

export { MeshGTFSR }

/* let fm = new FeedMessage()
let fh = new FeedHeader()
fh.setGtfsRealtimeVersion("2.0")
fh.setTimestamp(1535647364)

let fe = new FeedEntity()
fe.setId("ewrwrer")

fm.setHeader(fh)
fm.addEntity(fe)

console.log(fm)

mesh.publish(fm) */


