import express from 'express';
import pool from '../pool.js';
import createDebug from 'debug';
const debug = createDebug('102:api');


const router = express.Router();


router.get('/allrecipes', async (req, res, next) => {
    try {
        const [rows, fields] = await pool.query('SELECT id, category, name FROM recipes');
        res.status(200).json(rows);
    } catch (err) {
        err.status = 404;
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM recipes WHERE id = ?', [req.params.id]);
        debug(rows);
        if(rows.length === 0){
            const err = new Error('Id not found.');
            err.status = 404;
            return next(err);
        }
        res.status(200).json(rows);
    } catch (err) {
        err.status = 500;
        next(err)
    }

})

router.post('/', async (req, res, next) => {
    const required = ['name', 'category', 'instructions', 'ingredients'];
    for (const field of required) {
        if (!req.body[field]) {
            const err = new Error(`Missing ${field}.`);
            err.status = 400;
            return next(err);
        }
    }
    const { name, category, ingredients, instructions } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO recipes (name, category, ingredients, instructions) VALUES (?, ?, ?, ?)', [name, category, ingredients, instructions]);
        debug(result);
        res.status(201).location(`/${result.insertId}`).json({
            id: result.insertId,
            name,
            category,
            ingredients,
            instructions
        });
    } catch (err) {
        err.status = 500;
        next(err)
    }


})

// router.put('/', async (req,res,next)=>{

//     if(!req.body.id){
//         const err = new Error(`Missing id.`);
//         err.status = 400;
//         return next(err);
//     }
// const id = req.body.id;
//     delete req.body.id;

//     const { name, category, ingredients, instructions } = req.body;
//     try {
//         const [result] = await pool.query('INSERT INTO recipes (name, category, ingredients, instructions) VALUES (?, ?, ?, ?)', [name, category, ingredients, instructions]);
//         debug(result);
//         res.status(201).location(`/${result.insertId}`).json({
//             id: result.insertId,
//             name,
//             category,
//             ingredients,
//             instructions
//         });
//     } catch (err) {
//         err.status = 500;
//         next(err)
//     }


// })


router.put('/', async (req, res, next) => {

    if (!req.body.id) {
        const err = new Error(`Missing id.`);
        err.status = 400;
        return next(err);
    }

    const { id, name, category, ingredients, instructions } = req.body;
    try {
        const [result] = await pool.query('UPDATE recipes SET name = ?, category = ?, ingredients = ?, instructions = ? WHERE id = ?', [name, category, ingredients, instructions, id]);
        debug(result);
        if (result.affectedRows === 0) {
            const err = new Error(`Id not found`);
            err.status = 404;
            return next(err);
        }
        else {
            res.status(200).json({
                ...req.body
            })
        }

    } catch (err) {
        err.status = 500;
        next(err)
    }


})


router.delete('/', async (req, res, next) => {
    if (!req.body.id) {
        const err = new Error(`Missing id.`);
        err.status = 400;
        return next(err);
    }

    
    try {
        const [result] = await pool.query('DELETE FROM recipes WHERE id = ?', [req.body.id]);
        debug(result);
        if (result.affectedRows === 0) {
            const err = new Error(`Id not found`);
            err.status = 404;
            return next(err);
        }
        else {
            res.status(204).send();
        }

    } catch (err) {
        err.status = 500;
        next(err)
    }

})



router.use((err, req, res, next) => {
    res.status(err.status).json({
        message: `${err}`
    });
})
export default router;