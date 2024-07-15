const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();
const config = require('config');


const client = new Client({
    node: config.get('node')
});

const settings = {
    analysis: {
        filter: {
            autocomplete_filter: {
                type: 'edge_ngram',
                min_gram: 1,
                max_gram: 20,
            },
        },
        tokenizer: {
            autocomplete_tokenizer: {
                type: 'edge_ngram',
                min_gram: 1,
                max_gram: 20,
                token_chars: ['letter', 'digit', 'punctuation', 'symbol'],
            },
        },
        analyzer: {
            autocomplete: {
                type: 'custom',
                tokenizer: 'autocomplete_tokenizer',
                filter: ['lowercase', 'autocomplete_filter'],
            },
            keyword_lowercase: {
                type: 'custom',
                tokenizer: 'keyword',
                filter: ['lowercase'],
            },
        },
    },
    number_of_shards: 1,
    number_of_replicas: 1,
};

const mappings = {
    properties: {
        id: { type: 'keyword' },
        name: {
            type: 'text',
            analyzer: 'autocomplete',
            search_analyzer: 'keyword_lowercase',
        },
        email: {
            type: 'text',
            analyzer: 'autocomplete',
            search_analyzer: 'keyword_lowercase',
        },
        imageName: { type: 'keyword' },
        isDeleted: { type: 'boolean' }
    },
};

async function createIndex(indexName) {
    return client.indices.create({
        index: indexName,
        body: {
            "settings": settings,
            "mappings": mappings
        },
    });
}

async function indexExists(indexName) {
    try {
        const response = await client.indices.exists({
            index: indexName,
        });
        return { ok: true };
    } catch (error) {
        console.log("Error in checking index exists ", error);
        return { ok: false, error: "Error in checking index exists" };
    }

}

const document = {
    name: 'Suyash sekhar',
    email: 'sekar@gmail.com',
    imageName: 'image.jpg',
    isDeleted: false,
};

// Add a document to the index
async function addDocument(indexName, document, id) {
    try {
        const response = await client.index({
            index: indexName,
            id: id,
            body: document
        });
        // console.log(response);
        console.log("Inserted in elastic");
        return { ok: true };
    } catch (error) {
        console.log("Error in adding document in elastic ", error);
        return { ok: false, error: "Error in adding document in elastic" };
    }
}

// addDocument("my_new_index", document,3);

// Update a document in the index
async function updateDocument(indexName, id) {
    try {
        const response = await client.update({
            index: indexName,
            id: id.toString(),
            body: {
                doc: { isDeleted: true }
            }
        });
        return { ok: true };
    } catch (error) {
        console.log("Error in updating document in elastic ", error);
        return { ok: false, error: "Error in updating document in elastic" };
    }
}

// Search documents by name or email using wildcard matching
async function searchDocuments(indexName, q) {
    try {
        const response = await client.search({
            index: indexName,
            body: {
                query: {
                    bool: {
                        must: q ? [] : { match_all: {} },
                        should: q ? [{ match: { name: q } }, { match: { email: q } }, { wildcard: { name: `*${q}*` } }, { wildcard: { email: `*${q}*` } }] : undefined,
                        minimum_should_match: q ? 1 : undefined,
                        filter: [
                            { term: { isDeleted: false } }
                        ],
                    },
                }
            }
        });

        if (response.statusCode === 200) {
            return { ok: true, data: { foundusers: response.body.hits.hits, total: response.body.hits.total.value } };
        }

        return { ok: false, error: "Error in searching documents in elastic" };
    } catch (error) {
        console.log("Error in searching documents in elastic ", error);
        return { ok: false, error: "Error in searching documents in elastic" };
    }
}

// Example usage of searchDocuments
// searchDocuments("my_new_index", "eli").then((response) => {
//     if (response.ok) {
//         console.log(response.data.foundusers, response.data.total);
//     }
//     else {
//         console.log(response.error)
//     }
// });

module.exports = {
    client,
    indexExists,
    addDocument,
    createIndex,
    updateDocument,
    searchDocuments
};
