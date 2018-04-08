const express = require('express')
const router = express.Router()
const Todo = require('../model/todo');
const pug = require('pug');


router.get('', async (req, res) => {
    let todos = await Todo.findById( req.params.user_id );
    /*if (todos) {
    res.render("show", {
        user: todos.user,
        message: todos.message,
        complete: todos.complete 05 56 91 10 91
        })
    }
    else{
        res.status(404).json({error: "Unknown todo"})
    }*/
    if (todos != null) {

    res.format({
        html: () => {
            res.send(pug.renderFile('./views/todos/index.pug', { todo: todos }))
        },
        json: () => {res.send({ todos });
    }
    })
}
    else{
    res.status(404).json({error: "Unknown todo"})
}})
        /*
    if (req.accepts("json", "html") === "json") {
        res.status(200)
        res.json({ todos });
    }
    else {
        if (todos != null) {
            res.send(pug.renderFile('./views/todos/index.pug', { todo: todos }))
        }
    }
})


/*router.get('/:todoId/edit', (req, res) => {
    res.render('edit')
  })*/
router.get('/:todoId/edit', function (req, res) {
    Todo.findOne(
        {
            where: { id: req.params.todoId }
        }
    ).then((todo) => {
        if (todo != null) {
            res.send(pug.renderFile(process.cwd() + '/views/todos/edit.pug', { todo: todo }))
        }
    })
    //return res.status(200).send(pug. pug.send(pug.renderFile(process.cwd()+"/views/edit.ejs"))
})
router.post('/:todoId/edit', function (req, res) {
    Todo.update(
        {
            completion: req.body.completion,
            message: req.body.message,
            user: req.body.user
        },
        { where: { id: req.params.todoId } }
    ).then((status) => {
        if (status[0] == 0) {
            return res.status(200).send(pug.renderFile(process.cwd() + '/views/todos/edit.pug', { errorNotUpdated: true }))
        }
        else {
            res.json('todo updated')
        }
    })
})

router.get('/add', function (req, res) {
    Todo.create({
        user_id: req.session.id,
        completion: req.body.completion,
        message: req.body.message,
        user: req.body.user
    }, ).then((todo) => {
        if (todo != null) {
            res.send(pug.renderFile(process.cwd() + '/views/todos/add.pug', { todo: todo }))
        }
    })
    //return res.status(200).send(pug. pug.send(pug.renderFile(process.cwd()+"/views/edit.ejs"))
})
router.post('/add', function (req, res) {
    Todo.create({
        user_id: req.session.id,
        completion: req.body.completion,
        message: req.body.message,
        user: req.body.user
    }).then((status) => {
        if (status[0] == 0) {
            return res.status(200).send(pug.renderFile(process.cwd() + '/views/todos/add.pug', { errorNotUpdated: true }))
        }
        else {
            res.json('todo added')
        }
    })
})

router.post('', async (req, res, next) => {
    if (req.body.user, req.body.message && req.body.completion) {
        let todo = await Todo.create({ user: req.body.user, user_id: req.session.id, message: req.body.message, completion: req.body.completion })
        res.format({
            html: () => {res.redirect('/')},
            json: () => {res.send({ todo });}
        });       
    }
    else {
        res.json({ error: "Il manque des éléments pour compléter le todo !" });
    }
})

router.get('/:todoId', async (req, res) => {

    let todo = await Todo.findById(req.params.todoId);

    if (todo != null) {
        if (req.accepts("json", "html") === "json") {
            res.status(200)
            res.json({ todo });
        }
        else {
            res.send(pug.renderFile('./views/todos/show.pug', { todo: todo }))
        }
    }
    else {
        res.send(404)
    }
})


router.delete('/:todoId', (req, res) => {
    Todo.destroy({
        where: {
            id: req.params.todoId
        }
    }).then((todo) => {
        res.format({
            html: () => {res.redirect("/todos")},
            json: () => {res.send(200)}
        })
    })

})

router.patch('/:todoId', async (req, res) => {
    let todo = await Todo.findById(req.params.todoId);
    if(todo){
        if(req.body.message)
            todo.message = req.body.message;

        if(req.body.completion)
            todo.completion = req.body.completion;

        await todo.save();

        res.format({
            html: () => {res.redirect("/todos/"+req.params.todoId)},
            json: () => {res.send({todo})}
        })
    }
    else {
        res.send(404)
    }
})

module.exports = router