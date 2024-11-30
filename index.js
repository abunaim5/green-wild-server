const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xtia1kx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const animalCollection = client.db('greenWildDB').collection('animals');
        const categoryCollection = client.db('greenWildDB').collection('categories');

        // find all animals related api
        app.get('/animals', async (req, res) => {
            try {
                const { filter: category } = req.query;
                let $match = {};
                if (category && category !== 'All') {
                    $match.category = {
                        $regex: `^${category}$`,
                        $options: 'i',
                    };
                }
                const pipeline = [
                    {
                        $match
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            image: 1,
                            category: 1,
                        }
                    }
                ];

                const animals = await animalCollection.aggregate(pipeline).toArray();
                console.log(animals);
                res.status(200).json({ success: true, animals });
            } catch (error) {
                res.status(500).json({ success: false, message: 'failed to fetch animals' });
            }
        });

        // find all categories related api
        app.get('/categories', async (req, res) => {
            try {
                const categories = await categoryCollection.find().toArray();
                res.status(200).json({ success: true, categories });
            } catch (error) {
                res.status(500).json({ success: false, message: 'failed to fetch categories' });
            }
        });

        // add category related api
        app.post('/category', async (req, res) => {
            try {
                const categoryData = req.body;
                const result = await categoryCollection.insertOne(categoryData);
                res.status(200).json({ success: true, result });
            } catch (error) {
                res.status(500).json({ success: false, message: 'failed to add category' });
            }
        });

        // add animal related api
        app.post('/animal', async (req, res) => {
            try {
                const animalData = req.body;
                const result = await animalCollection.insertOne(animalData);
                res.status(200).json({ success: true, result });
            } catch (error) {
                res.status(500).json({ success: false, message: 'failed to add animal' });
            }
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// basic server apis
app.get('/', (req, res) => {
    res.send('GreenWild server is running');
});

app.listen(port, () => {
    console.log(`GreenWild server is running on PORT ${port}`);
});