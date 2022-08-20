import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'

const app = express()

app.use(cors())
app.use(fileUpload())

app.get('/upload', (req, res) => {
    console.log('working')

    // console.log(req.files)
    
    // if (!req.files) {
    //     return res.status(400).send('No files were uploaded')
    // } else {
    //     console.log(req.files)
    // }
})

app.listen(8000, () => {
    console.log('listenning on port 8000')
})