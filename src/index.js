const express = require('express')

const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Hola")
})

// LOGIN
app.post('/login', (req, res) => {
  
})
// REGISTER
app.post('/register', (req, res) => {
  
})
// OBTENER TODAS LAS TAREAS DEL USUARIO
app.get('/tasks', (req, res) => {
  
}) 
// OBTENER UNA TAREA DEL USUARIO
app.get('/tasks/:id', (req, res) => {
  
}) 
// CREAR TAREA
app.post('/task', (req, res) => {
  
})
// COMPLETAR TAREA
app.patch('/task', (req, res) => {
  
})
// BORRAR TAREA
app.delete('/task', (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})