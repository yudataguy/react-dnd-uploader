const express = require('express')
const multer = require('multer')
const cors = require('cors')
const app = express()
const port = 5000
const fs = require('fs')

app.use(cors())

const FILE_PATH = 'upload'

const upload = multer({
  dest: `${FILE_PATH}/`
})

app.post('/upload', upload.array('files'), async (req, res) => {
  try {
    const uploadFiles = req.files
    const uploadFields = req.body

    if (!uploadFiles) {
      res.status(400).send({
        status: false,
        data: 'no files'
      })
    } else {
      
    }


  } catch (err) {
    res.status(500).send(err)
  }

})

app.listen(port, () => console.log(`Listening on port ${port}`))