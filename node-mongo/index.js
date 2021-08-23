const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://mongodb:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true}
)
.then(() => console.log('connected'))
.catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Cat = mongoose.model('Cat', { name: String });

app.get('/', async (req, res) => {
    const cats = await Cat.find();

    res.send(cats);
});

app.post('/create-cat', async (req, res) => {
    const cat = new Cat({ name: req.body.name });
    await cat.save();

    res.status(200).send(cat);
});

const port = 4000;
app.listen(4000);