import { JWT_SECRET } from "./config";
import { jwt } from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(403).json({})
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId;
        next();

    } catch (error) {
        return res.status(403).json({})
    }
}

export default authMiddleware;