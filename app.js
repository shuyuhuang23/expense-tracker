const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')

const Record = require('./models/record')
const Category = require('./models/category')
const User = require('./models/user')

require('./config/mongoose')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

// express template engine
app.engine('handlebars', engine({ defaultLayout: 'main' }))
// app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// set static files
app.use(express.static('public'))


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})

// app.get('/', (req, res) => {
//     res.render('index')
// })