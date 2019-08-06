/**
 * @fileoverview gRPC-Web generated client stub for rpc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.rpc = require('./rpc_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.MeshClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.MeshPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpc.PeerTopicInfo,
 *   !proto.rpc.Response>}
 */
const methodInfo_Mesh_RegisterToPublish = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpc.Response,
  /** @param {!proto.rpc.PeerTopicInfo} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.Response.deserializeBinary
);


/**
 * @param {!proto.rpc.PeerTopicInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpc.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.MeshClient.prototype.registerToPublish =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Mesh/RegisterToPublish',
      request,
      metadata || {},
      methodInfo_Mesh_RegisterToPublish,
      callback);
};


/**
 * @param {!proto.rpc.PeerTopicInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.Response>}
 *     A native promise that resolves to the response
 */
proto.rpc.MeshPromiseClient.prototype.registerToPublish =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Mesh/RegisterToPublish',
      request,
      metadata || {},
      methodInfo_Mesh_RegisterToPublish);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpc.PublishData,
 *   !proto.rpc.Response>}
 */
const methodInfo_Mesh_Publish = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpc.Response,
  /** @param {!proto.rpc.PublishData} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.Response.deserializeBinary
);


/**
 * @param {!proto.rpc.PublishData} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpc.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.MeshClient.prototype.publish =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Mesh/Publish',
      request,
      metadata || {},
      methodInfo_Mesh_Publish,
      callback);
};


/**
 * @param {!proto.rpc.PublishData} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.Response>}
 *     A native promise that resolves to the response
 */
proto.rpc.MeshPromiseClient.prototype.publish =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Mesh/Publish',
      request,
      metadata || {},
      methodInfo_Mesh_Publish);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpc.PeerTopicInfo,
 *   !proto.rpc.Data>}
 */
const methodInfo_Mesh_Subscribe = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpc.Data,
  /** @param {!proto.rpc.PeerTopicInfo} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.Data.deserializeBinary
);


/**
 * @param {!proto.rpc.PeerTopicInfo} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.Data>}
 *     The XHR Node Readable Stream
 */
proto.rpc.MeshClient.prototype.subscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/rpc.Mesh/Subscribe',
      request,
      metadata || {},
      methodInfo_Mesh_Subscribe);
};


/**
 * @param {!proto.rpc.PeerTopicInfo} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.Data>}
 *     The XHR Node Readable Stream
 */
proto.rpc.MeshPromiseClient.prototype.subscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/rpc.Mesh/Subscribe',
      request,
      metadata || {},
      methodInfo_Mesh_Subscribe);
};


module.exports = proto.rpc;

