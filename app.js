const express = require('express');

const app = express();

app.use(express.json()) // to access body of request

app.get('/', (req, res, next) => {
    res.send("Hello World");

});

app.get('/api/courses', (req, res, next) => {
    res.send([1,2,3]);
})

app.get('/api/courses/:id', (req, res, next) => {
    res.send(req.params.id);
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));