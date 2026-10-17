import jwt from "jsonwebtoken";

const MAX_REFRESH_AGE= 7*24*60*60*1000;

const refreshCookieOptions=()=>({
    httpOnly:true,
    secure:process.env.NODE_ENV===true,
    sameSite:'lax',
    path:'/auth',
    maxAge:MAX_REFRESH_AGE
})

export const signAcessToken=(user)=>{
    return jwt.sign(
        {sub:String(user._id),role:user.role},
        process.env.ACCESS_SECRET_KEY,
        {expiresIn:"15m"}
    )
}

export const signRefreshToken=(user)=>{
    return jwt.sign(
        {sub:String(user._id)},
        process.env.REFRESH_SECRET_KEY,
        {expiresIn:"7d"}
    )
}

export const setRefreshCookie=(res,user)=>{
    res.cookie("refreshToken",signRefreshToken(user),refreshCookieOptions());
}