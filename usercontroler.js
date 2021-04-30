async function authenticate(req, res, next){
    if (!req.body.text || !req.body.token) {
        res.redirect('/');

        return next(false);
    }

    const text = req.body.text;
    const token = req.body.token;
    let cookie = {};
    if (token === 'agral1234') {
        cookie.text = text;
        res.cookie('data', JSON.stringify(cookie));
        res.redirect('/intro.html');
    } else {
        cookie.error = 'Token inválido.';
        res.cookie('data', JSON.stringify(cookie));
        res.redirect('/');
    }
}
exports.authenticate=authenticate;
