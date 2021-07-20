const auth = require(`${process.env.root}/config/authorization`);
const settings = require(`${process.env.root}/config/settings`);
const NodeCache = require( "node-cache" );
const cache = new NodeCache();

const instance = require( 'axios' ).create({

    /*  This is all information that is used to make get/post resquests
        from/to the WISP API. The documentation can be found here :
            https://docs.panel.gg/#introduction
        This configures axios one time to use the information to make requests.
    */
    baseURL: `${ settings.PanelURL }api/application`,
    timeout: 5000,
    headers: {

        'Content-Type': 'application/json',
        'Accept': 'application/vnd.wisp.v1+json',
        'Authorization': `Bearer ${ auth.WISPACPAPIKey }`,
        'User-Agent': 'WISP-JS Discord Bot | Admin'

    }
});

// Wrap axios.get while caching data
exports.get = async function(url) {

    const data = await cache.get( "wispjs_" + url ); // get cached data

    if( data == undefined ) { // then check if it exists

        const response = await instance.get( url );
        cache.set( "wispjs_" + url, response.data, settings.cacheTimer );
        if(settings.debug) {
            console.log( "Cache : `wispjs_" + url + "` was set." );
        }
        return response.data;

    } else {
        if(settings.debug) {
            console.log( "Cache : `wispjs_" + url + "` was found." );
        }
        return data;

    }
}

exports.getRecursive = async function(url) {
    const data = await this.get(url);
    let servers = data.data;
    if(data.meta.pagination.total_pages > 1) {
        for(i = 2; i <= data.meta.pagination.total_pages; i++) {
            let temp = await request.get(`${url}?page=${i}`)
            let tempArray = temp.data;
            servers = servers.concat(tempArray);
        }
    }
    return servers;
}

exports.post = async function(url, data) {
    const response = await instance.post(url, data);
    return response;
    
}

exports.patch = async function(url, data) {
    const response = await instance.patch(url, data);
    return response;
    
}

exports.delete = async function(url) {
    const response = await instance.delete(url);
    return response;
    
}