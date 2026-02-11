import express from 'express';
import parseNumbersMiddleware from './parseNumbersMiddleware.js';
import parseOperatorMiddleware from './parseOperatorMiddleware.js';
import customOperatorMiddleware from './customOperatorMiddleware.js';
const app = express();

app.listen(80);

app.use('/function', parseNumbersMiddleware);
app.get('/function/add', (req, res) => {
    res.send(`<h1>${req.firstNum} + ${req.secondNum} = ${req.firstNum + req.secondNum}</h1>`);


});
app.get('/function/subtract', (req, res) => {
    res.send(`<h1>${req.firstNum} - ${req.secondNum} = ${req.firstNum - req.secondNum}</h1>`);


});


app.get('/function/custom', parseOperatorMiddleware, customOperatorMiddleware)
app.get('/function/custom/:operator', parseOperatorMiddleware, customOperatorMiddleware)


app.get('/function/custom', parseOperatorMiddleware, customOperatorMiddleware);
app.get('/function/custom/:operator', parseOperatorMiddleware, customOperatorMiddleware);
