// const asynchandler=(requestHandeler)=>{
//     (req,res,next)=>{
//         Promise.resolve(requestHandeler(req,res,next)).catch((err)=>next(err))
//     }
// }



// const asynchandler = (fn)=>(req,res,next)=>{
//     return Promise.resolve(fn(req,res,next)).catch((e)=>{
//         console.log("promise can e bracked");
//         next(e)
//     })
// }
// export default asynchandler

const asynchandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch((e) => {
      console.error("Promise rejected:", e);
      next(e);
    });
  };
  export default asynchandler





















// const asynchandler=(fn)=> async (req,res,next)=>{
//     try{

//     }catch(error){
//         res.status(err.code ||500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }
// export default asynchandler