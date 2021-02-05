const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const members = require('./members');

const logger = require('./middleware/logger')

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (request, response) => response.render('index', {
  title: 'Member App',
  members
}));

// Init middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/members', require('./routes/api/members'))

// Set static folder
// app.use(express.static(path.join(__dirname, '../views')))

// app.get('/', (request, response) => {
//   response.sendFile(path.join(__dirname, '../views/index.html'))
// })


const PORT = 5000;

app.listen(PORT, () => console.log(`listening!`));