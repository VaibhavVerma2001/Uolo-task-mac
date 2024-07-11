const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'http://192.168.163.152:9200/' // Ensure this is the correct URL
});


// Check if index already exists
async function createIndex(indexName) {
    return client.indices.create({
        index: indexName,
        mappings: {},
        settings: {}
    });
};


// Create an index
async function indexExists(indexName) {
    return await client.indices.exists({
        index: indexName,
    });
};


const user = async() =>{
    const response = await indexExists("new-user-abc");
    console.log(response.body);

    // if(!response.body){
    //     await createIndex("new-user-abc");
    // }
}

user();

module.exports = {
    client,
    indexExists,
    createIndex
};
