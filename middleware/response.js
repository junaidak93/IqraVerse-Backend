export default (req, res, next) => {
    res.reply = (status_code, msg, data = null) => {
        res.status(status_code).json({
            status: String(status_code).startsWith('2') ? 'ok' : 'error',
            code: status_code,
            message: msg,   
            data: data
        });
    }
    
    next();
};