const jwt = require('jsonwebtoken');

// kiểm tra có token trong header không
// kiểm tra token có hợp lệ không
// nếu hợp lệ gán cho req một {UserId : decode.UserId}
// không hợp lệ res.json({success: false})

const verifyToken = (req, res, next) => {
    
    const authHeader = req.header('Authorization');
    //console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res
            .status(401)
            .json({success: false, message: 'Access token not found'});
    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.userId = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({success: false, message:'Invalid token'});
    }
}

module.exports = verifyToken