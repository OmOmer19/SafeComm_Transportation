// middlware func to restrict access based on roles
const authorizeRoles = (...allowedRoles) =>{
    
    return(req,res,next) =>{
        // getting user role from authenticated request
        const userRole = req.user.role

        //checking id user role is allowed
        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({ message: 'access forbidden: insufficient permissions' })
        }
        //moving to next
        next()
    }
}
module.exports = authorizeRoles