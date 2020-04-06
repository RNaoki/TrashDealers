const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();

app.use(express.static(path.join(__dirname, 'views')));

app.post('/ajaxsave', function(req, res) {
    console.log('done')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
