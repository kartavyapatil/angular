// class ApiError extends Error{
//     constructor(
//         statuscode,
//         message="something went wrong in apiError handler",
//         errors=[],
//         stack=""
//     ){
//         super(message)
//         this.statuscode=statuscode
//         this.data=null
//         this.message=message
//         this.success=false;
//         this.error=errors

//         if(stack){
//             this.stack=stack
//         }else{
//             Error.captureStackTrace(this,this.constructor)
//         }
//     }
// }

// export default ApiError





class ApiError extends Error{
    statusCode = 500
    constructor(statusCode,msg){
        super(msg)
        this.message = msg
        this.statusCode  = statusCode;

        // Error.

    }
}
export default ApiError