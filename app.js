const express = require('express')
const session = require('express-session')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

const Record = require('./models/record')
const Category = require('./models/category')
const User = require('./models/user')

require('./config/mongoose')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// express template engine
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set static files
app.use(express.static('public'))


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
