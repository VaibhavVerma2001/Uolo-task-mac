const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const db = require("./models/db");
const responseMiddleware = require("./middleware/response");
const { indexExists, createIndex } = require("./utils/elasticSearch");

const app = express();

// middlewares

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(responseMiddleware);

// ROUTES -- 

app.get('/', (req, res) => {
    res.status(201).json({ msg: "Hello from express..." });
});


app.use("/api/user", userRoute);



const port = process.env.PORT || 5000;
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);


    // Create elastic search index if it doesnt exists
    const indexName = 'my_new_index';

    try {
        const response = await indexExists(indexName);
        // console.log(response);
        if (!response.body) {
            await createIndex(indexName);
            console.log(`Index "${indexName}" created.`);
        } else {
            console.log(`Index "${indexName}" already exists.`);
        }
    } catch (error) {
        console.error(`Error checking/creating index: ${error.message}`);
    }
});