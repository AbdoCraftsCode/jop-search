


export const asyncHandelr = (fn) => {

    return (req, res, next) => {

        fn(req, res, next).catch((error) => {

            next(new Error(error.message))

        })
    }

}




export const globalerror = (error, req, res, next) => {
    console.log(error);
    if (process.env.MOOD == "DEV") {

        return res.status(error.cause || 500).json({ message: error.message, error, stack: error.stack })

    }
    res.status(error.cause || 500).json({ message: error.message || "internal error server" })


}


