import * as http from 'http'

declare namespace EngineIOClient {

    class _Events<T extends {[k:string]:any[]}> {
        addListener : <K extends keyof T>(type : K,cb : (e? : T[K][0],f? : T[K][1]) => void) => void
        on : <K extends keyof T>(type : K,cb : (e? : T[K][0],f? : T[K][1]) => void) => void
        off : <K extends keyof T>(type : K,cb : (e? : T[K][0],f? : T[K][1]) => void) => void
        once : <K extends keyof T>(type : K,cb : (e? : T[K][0],f? : T[K][1]) => void) => void
        prependListener : <K extends keyof T>(type : K,cb : (e? : T[K][0],f? : T[K][1]) => void) => void
        prependOnceListener : <K extends keyof T>(type : K,cb : (e? : T[K][0],f? : T[K][1]) => void) => void
        removeListener : <K extends keyof T>(type : K,cb : (e? : T[K][0],f? : T[K][1]) => void) => void

        removeAllListeners(event?: keyof T): this;
        setMaxListeners(n: number): this;
        getMaxListeners(): number;
        listeners(event: keyof T): Function[];
        emit <K extends keyof T>(event: K, ...args: any[]): boolean;
        eventNames(): (keyof T)[];
        listenerCount(type: keyof T): number;
    }


    interface EngineIOClientOption {
        /*http.Agent to use, defaults to false (NodeJS only)*/
        agent? : http.Agent

        /*defaults to true, whether the client should try to upgrade the transport from long-polling to something better.*/
        upgrade? : boolean

        /*forces JSONP for polling transport.*/
        forceJSONP? : boolean

        /*determines whether to use JSONP when necessary for polling. If disabled (by settings to false) an error will be emitted (saying "No transports available") if no other transports are available. If another transport is available for opening a connection (e.g. WebSocket) that transport will be used instead.*/
        jsonp? : boolean

        /*forces base 64 encoding for polling transport even when XHR2 responseType is available and WebSocket even if the used standard supports binary.*/
        forceBase64? : boolean

        /*enables XDomainRequest for IE8 to avoid loading bar flashing with click sound. default to false because XDomainRequest has a flaw of not sending cookie.*/
        enablesXDR? : boolean

        /*whether to add the timestamp with each transport request. Note: polling requests are always stamped unless this option is explicitly set to false (false)*/
        timestampRequests? : boolean

        /*timestamp parameter (t)*/
        timestampParam? : string

        /*port the policy server listens on (843)*/
        policyPort? : Number

        /*path to connect to, default is /engine.io*/
        path? : string

        /*a list of transports to try (in order). Defaults to ['polling', 'websocket']. Engine always attempts to connect directly with the first one, provided the feature detection test for it passes.*/
        transports? : ('polling'| 'websocket')[]

        /*hash of options, indexed by transport name, overriding the common options for the given transport*/
        transportOptions? : Object

        /*defaults to false. If true and if the previous websocket connection to the server succeeded, the connection attempt will bypass the normal upgrade process and will initially try websocket. A connection attempt following a transport error will use the normal upgrade process. It is recommended you turn this on only when using SSL/TLS connections, or if you know that your network does not block websockets.*/
        rememberUpgrade? : boolean

        /*Certificate, Private key and CA certificates to use for SSL. Can be used in Node.js client environment to manually specify certificate information.*/
        pfx? : string

        /*Private key to use for SSL. Can be used in Node.js client environment to manually specify certificate information.*/
        key? : string

        /*A string of passphrase for the private key or pfx. Can be used in Node.js client environment to manually specify certificate information.*/
        passphrase? : string

        /*Public x509 certificate to use. Can be used in Node.js client environment to manually specify certificate information.*/
        cert? : string

        /*An authority certificate or array of authority certificates to check the remote host against.. Can be used in Node.js client environment to manually specify certificate information.*/
        ca? : string|string[]

        /*A string describing the ciphers to use or exclude. Consult the cipher format list for details on the format. Can be used in Node.js client environment to manually specify certificate information.*/
        ciphers? : string

        /*If true, the server certificate is verified against the list of supplied CAs. An 'error' event is emitted if verification fails. Verification happens at the connection level, before the HTTP request is sent. Can be used in Node.js client environment to manually specify certificate information.*/
        rejectUnauthorized? : boolean

        /*parameters of the WebSocket permessage-deflate extension (see ws module api docs). Set to false to disable. (true)*/
        perMessageDeflate? : boolean | {threshold : number}

        /*data is compressed only if the byte size is above this value. This option is ignored on the browser. (1024)*/
        threshold? : Number

        /*Headers that will be passed for each request to the server (via xhr-polling and via websockets). These values then can be used during handshake or for special proxies. Can only be used in Node.js client environment.*/
        extraHeaders? : Object

        /*whether transport upgrades should be restricted to transports supporting binary data (false)*/
        onlyBinaryUpgrades? : boolean

        /*Uses NodeJS implementation for websockets - even if there is a native Browser-Websocket available, which is preferred by default over the NodeJS implementation. (This is useful when using hybrid platforms like nw.js or electron) (false, NodeJS only)*/
        forceNode? : boolean

        /*the local IP address to connect to*/
        localAddress? : string

    }

    /**
     * The client class. Mixes in Emitter. Exposed as eio in the browser standalone build.
     */
    class Socket extends _Events<{
        open : [string | ArrayBuffer]
        close : [void]
        error : [void]
        flush : [void]
        drain : [void]
        upgradeError : [void]
        upgrade : [void]
        ping : [void]
        pong : [void]
    }> {
        
        constructor(uri: string, option? : EngineIOClientOption);

        /**protocol revision number*/
        protocol :Number
        
        /**can be set to 'arraybuffer' or 'blob' in browsers, and buffer or arraybuffer in Node. Blob is only used in browser if it's supported*/
        binaryType : 'arraybuffer' | 'blob'

        /**
         * Sends a message, performing message = toString(arguments[0]) unless sending binary data, which is sent as is.
         * @param data  Blob
         * @param options optional, options object
         * @param callback optional, callback upon drain
         */
        send(data: String | ArrayBuffer | ArrayBufferView | Blob, options?: {compress : boolean}, callback?: Function): void;

        /**
         * Disconnects the client
         */
        close():void;

    }


    class Transport extends _Events<{
        poll : [void]
        pollComplete : [void]
        drain : [void]
    }> { }

}


declare function EngineIOClient(path? : string,option? : EngineIOClient.EngineIOClientOption): EngineIOClient.Socket;


export = EngineIOClient
