const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const saltRounds = 10;

const userSchema = new Schema ({
    name: {
        type: String,
        required: "Please fill in name"
    },
    password:{
        type: String,
        required: "Please put in your password",
        min: [5, 'Password too short!'],
        validate: {
            validator: function(value) {
                let validate = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/
              return validate.test(value);
            },
            message: 'Password needs to include at least one number!'
          },
        unique: true
    },
    username: {
        type: String,
        required: "Please input your username",
        unique: true
    }
    
}, {timestamps: true})

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model("Users", userSchema);

module.exports = User;