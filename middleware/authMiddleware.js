import JsonWebToken from "jsonwebtoken"

export const authenticationVerify = (req, res, next) => {
    const authe = req.headers.authorization;
    if(!authe || !authe.startsWith('Bearer '))
    {
        res.status(401)
        throw new Error('User is unauthorized');
    }
    const token = authe.split(' ')[1];

    try {
        const data = JsonWebToken.verify(token, process.env.jwt_secret);
        const {id, username} = data;
        req.user = {id, username}
        next()
    } catch(error) {
        res.status(401)
        throw new Error('User is unauthorized');
    }
}