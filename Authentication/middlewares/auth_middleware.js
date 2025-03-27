import jwt from "jsonwebtoken";

// const authMiddleware = (req,res,next ) => {
// const authHeader =  req.headers["authorization"];
// console.log(authHeader);

// const token = authHeader && authHeader.split(" ")[1];

// if(!token){
//     return res.status(400).json({
//         success : false,
//         message : "Access denied no token provided. Please Login to continue"
//     })
// }

// try{
//     const decodedTokenInfo =  jwt.verify(token,process.env.JWT_SECRET_KEY);
//     console.log(decodedTokenInfo);

//     req.userInfo = decodedTokenInfo;

//     next()

// }catch(error){
//     return res.status(500).json({
//         success : false,
//         message : "Access denied no token provided. Please Login to continue"
//     })
// }

// }

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  console.log(authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Access denied no token provided. Please Login to continue",
    });
  }

  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log(decodedTokenInfo);

    req.userInfo = decodedTokenInfo;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Access denied no token provided. Please Login to continue",
    });
  }
};

export default authMiddleware;
