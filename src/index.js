const express = require('express')
const pool = require('./lib/mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.use(express.json())

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','PATCH']
}));

// LOGIN
app.post('/login', async (req, res) => {
  let { email, password } = req.body

  pool.query(`SELECT * FROM USER WHERE email_user="${email}" `, (err, result, _) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        error: "Server error"
      })
    }

    else if (result.length == 0) {
      res.status(404).json({
        id_user: "Dosen't exists",
        error: true,
        code: 1
      });

    } else {
      bcrypt.compare(password, result[0].password_user, (err, isValid) => {
        if (err) {
          res.status(500).json({
            error: "Server error"
          })
        }

        else if (isValid) {
          res.status(200).json({
            id_user: result[0].id_user,
            email_user: result[0].email_user,
            name_user: result[0].name_user,
            code: 0
          })
        }

        else {
          res.status(401).json({
            id_user: "Wrong password",
            error: true,
            code: 2
          })
        }
      })
    }
  })
  
})
 
// REGISTER
app.post('/register', async (req, res) => {
  const {name, email, password} = req.body

  let hash = await bcrypt.hash(password, 10)

  pool.query(`INSERT INTO USER(name_user, email_user, password_user) VALUES ("${name}", "${email}", "${hash}");`, (err, result, _) => {

    if (err) {
      if (err.code == 'ER_DUP_ENTRY') {
        
        res.status(400).json({
          user: "Duplicated",
          error: true
        })
  
      } else {
        
        console.log(err)
        res.status(500).json({
          user: "Server error",
          error: "Server error"
        })
      }
      
    } else if(result.affectedRows == 1) {
      res.status(200).json({
        user:"Created",
        error: false
      })
    } 
    
  })
  
  
})

// OBTENER TODAS LAS TAREAS DEL USUARIO
app.get('/tasks', async (req, res) => {
  const { id_user } = req.query

  pool.query(`SELECT * FROM TASK WHERE id_task_user = ${id_user}`, async (err, result, _) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        error: "Server error"
      })
    }
    
    res.status(200).json({
      data: result
    })

  })

}) 


// OBTENER UNA TAREA DEL USUARIO
app.get('/tasks/:id', async (req, res) => {
  const id_task = req.params.id;
  const { id_user } = req.query

  pool.query(`SELECT * FROM TASK WHERE id_task_user = ${id_user} AND id_task = ${id_task}`, async (err, result, _) => {
    if (err) {
      res.status(500).json({
        error: "Server error"
      })
    }
    
    res.status(200).json({
      data: result
    })

  })
  
})


// CREAR TAREA
app.post('/task', async (req, res) => {
  const { title_task, desc_task, color_task, date_task, id_user } = req.body
  
  pool.query(`INSERT INTO TASK(title_task, desc_task, color_task, done_task, date_task, id_task_user) VALUES ("${title_task}", "${desc_task}", "${color_task}", false, "${date_task}", ${id_user});`, async (err, result, _) => {
    if (err)
      throw err;

    res.status(200).json({
      data: result
    })

  })
  
})


// COMPLETAR TAREA
app.patch('/task/:id', async (req, res) => {
  const id_task = req.params.id;
  const { id_user } = req.query
  
  pool.query(`UPDATE TASK SET done_task = true WHERE id_task = ${id_task} AND id_task_user = ${id_user}`, async (err, result, _) => {
    if (err)
      throw err;

    if(result.changedRows == 1){
      res.status(200).json({
        data: result
      })
    } else if (result.changedRows == 0){
      res.status(401).json({
        data: null,
        updated: false
      })
    }

  })
})


// BORRAR TAREA
app.delete('/task/:id', async (req, res) => {
  const id_task = req.params.id;
  const { id_user } = req.query
  
  pool.query(`DELETE FROM TASK WHERE id_task = ${id_task} AND id_task_user = ${id_user}`, async (err, result, _) => {
    if (err)
      throw err;

    if(result.affectedRows == 1){
      res.status(200).json({
        data: result
      })
    } else if (result.changedRows == 0){
      res.status(401).json({
        data: null,
        deleted: false
      })
    }

  })
}) 

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://${host}:${port}`)
})