const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'http://192.168.163.152:9200/' // Ensure this is the correct URL
});

async function createIndex(indexName) {
    return client.indices.create({
        index: indexName,
        body: {
            "settings": {
                "number_of_shards": 3,
                "number_of_replicas": 2,
                "index": {
                    "refresh_interval": "30s",
                    "analysis": {
                        "normalizer": {
                            "lowercase_normalizer": {
                                "type": "custom",
                                "char_filter": [],
                                "filter": ["lowercase"]
                            }
                        },
                        "analyzer": {
                            "default": {
                                "type": "custom",
                                "tokenizer": "standard",
                                "filter": ["lowercase"]
                            },
                            "anagram_analyzer": {
                                "type": "custom",
                                "tokenizer": "standard",
                                "filter": ["lowercase", "reverse"]
                            },
                            "email_analyzer": {
                                "type": "custom",
                                "tokenizer": "uax_url_email",
                                "filter": ["lowercase"]
                            }
                        }
                    }
                }
            },
            "mappings": {
                "properties": {
                    "name": {
                        "type": "text",
                        "analyzer": "default",
                        "fields": {
                            "anagram": {
                                "type": "text",
                                "analyzer": "anagram_analyzer"
                            },
                            "keyword": {
                                "type": "keyword",
                                "normalizer": "lowercase_normalizer"
                            }
                        }
                    },
                    "email": {
                        "type": "text",
                        "analyzer": "email_analyzer",
                        "fields": {
                            "keyword": {
                                "type": "keyword",
                                "normalizer": "lowercase_normalizer"
                            }
                        }
                    },
                    "imageName": {
                        "type": "keyword",
                        "ignore_above": 256
                    },
                    "isDeleted": {
                        "type": "boolean"
                    }
                }
            }
        }
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
    name: 'Sarthak gupta',
    email: 'abc@gmail.com',
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

// addDocument("my_new_index", document,10);

// Update a document in the index
async function updateDocument(indexName, id) {
    try {
        const response = await client.update({
            index: indexName,
            id: id,
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
async function searchDocuments(indexName, searchTerm) {
    try {
        const response = await client.search({
            index: indexName,
            body: {
                query: {
                    bool: {
                        should: [
                            {
                                wildcard: {
                                    'name': {
                                        value: `*${searchTerm.toLowerCase()}*`
                                    }
                                }
                            },
                            {
                                wildcard: {
                                    'email': {
                                        value: `*${searchTerm.toLowerCase()}*`
                                    }
                                }
                            }
                        ]
                    }
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
searchDocuments("my_new_index", "yash").then((response) => {
    if (response.ok) {
        console.log(response.data.foundusers, response.data.total);
    }
    else {
        console.log(response.error)
    }
});

module.exports = {
    client,
    indexExists,
    addDocument,
    createIndex,
    updateDocument,
    searchDocuments
};
