export default function (req, res, next) {
    const operatorFunctionMap = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    }

    const operatorWordMap = {
        'add': '+',
        'subtract': '-',
        'multiply': '*',
        'divide': '/'
    }




    req.operator = req.params.operator?.toLowerCase() || req.query.operator;

    if (req.operator.length > 1) { req.operator = operatorWordMap[req.operator] }

    if (req.operator === ' ') { req.operator = '+' };

    if (!Object.keys(operatorFunctionMap).includes(req.operator)) {
        return res.status(400).send(`<h1>Error. Please make sure that your operator query parameter is a valid operator ( +, -, *, /, add, subtract, multiply, divide). It\'s currently "${req.operator}".</h1>`)
    }
    else {
        req.operatorFunction = operatorFunctionMap[req.operator]
        next();
    }
}
