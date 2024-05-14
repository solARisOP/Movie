export const invalidRoute = (req, res, next)=>{
    res.status(404);
    throw new Error("The Page you are looking for doesnot exists");
}