const express = require('express')
const app = express();
const router =  require('./routes/taskRoutes.js');

app.use(express.json());
app.use('/tasks',router );
const PORT = 5000
app.listen(PORT,() => {
    console.log("Server is listening to port " + PORT)
})