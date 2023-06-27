const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 5
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 5
    },

    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    verifyToken:{
        type: String,

    }
})

userSchema.pre('save', async function(next){
    const salt = bcrypt.genSaltSync(10);

    if(this.isModified ('password'))
    {
        this.password = await bcrypt.hashSync(this.password, salt);
        this.cpassword = await bcrypt.hashSync(this.cpassword, salt);

    }
    

    next();

})


userSchema.methods.generateAuthtoken = async function () {
    try {
    const token23 = jwt.sign({ _id: this._id }, process.env.SECRET_KEY,{
    expiresIn:"1d"
    });
    this.tokens = this.tokens.concat({token:token23})
    await this.save();
    return token23
        
    } catch (error) {
        res.status(422).json(error)
        
    }
};


const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;