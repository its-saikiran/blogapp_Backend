const express = require('express')
const app = express();

const { port } = require('./auth/config');

app.use(express.json());

app.use('/', require('./routes/user.route'))
app.use('/', require('./routes/blog.route'))

app.use('/', (req, res) => {
    res.send({
        msg: "Not found.",
        err: 404
    })
})


app.listen(port, () => console.log(`http://localhost:${port}`))