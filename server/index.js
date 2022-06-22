//Load variabel .env ketika development (hapus code saat masuk production)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const app = express()

const PORT = process.env.PORT || 8000

// gunakan middleware json untuk membaca request body bertipe json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})
