export default function (req, res) {
    res.send(`<h1>
        ${req.firstNum} ${req.operator} ${req.secondNum} = ${req.operatorFunction(req.firstNum, req.secondNum)}
        </h1>`)
}
