const express = require('express');
const connectDB = require("./db");
var cors = require('cors')

const app = express();
//body parser
app.use(express.json());

connectDB();
app.use(express.json())

const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World !')
})

app.get('/vi/signup', (req, res) => {
    res.send('Hello signup!')
})
//Available Routes
app.use('/api/auth/', require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
//app.use('/api/notes',require('./routes/notes'))
/*app.get('/vi/login', (req, res) => {
    res.send('Hello login!')
})*/

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));