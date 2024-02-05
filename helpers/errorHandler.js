const handleErrorUser = (err)=>{
    let errors = {errors:"",name:"",password:"" };
    if(err.code === 11000){
        errors.email = "Email address already in use"
        return errors
    }

    if(err.message === "Incorrect Email"){
        errors.email = "Not a regitered email"
        return errors

    }
    if(err.message === "Incorrect Password"){
        errors.email = "Email is incorrect"
        errors.password = "Password is incorrect"
        return errors
    }

    if(err.message.includes("User validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
        return errors
    }

}

// for post errors

const handleErrorPost = (err)=>{
    let errors = {title:"",tags:"",description:""};
    if(err.code === 11000){
        errors.title = "Tilte already used";
        return errors
    }

    if(err.message.includes("Post validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
    }
    return errors
}

module.exports = {
    handleErrorUser,
    handleErrorPost
}