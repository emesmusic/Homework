export default function (req, res, next) {

    req.firstNum = Number(req.query.firstNum);
    req.secondNum = Number(req.query.secondNum);





    if (Number.isNaN(req.firstNum) || Number.isNaN(req.secondNum)) {
        return res.status(400).send(
            '<h1>Error. Please make sure that your firstNum and secondNum parameters are valid numbers...</h1>'
        )
    }

    else {
        next();
    }
}