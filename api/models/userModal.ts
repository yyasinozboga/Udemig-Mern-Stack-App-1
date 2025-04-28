import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export interface IUser {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: [
        true,
        "There is already an username registered to this username.",
      ],
      minlength: [5, "User name length must be more than 5 characters."],
      maxlength: [20, "User name length must be less than 20 characters."],
    },

    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [
        true,
        "There is already an email registered to this email address.",
      ],
      validate: {
        validator: function (value: string) {
          return validator.isEmail(value);
        },

        message: "Please enter a valid email address!",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: 8,
      validate: {
        validator: function (value: string) {
          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
          });
        },
        message:
          "Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },

    passwordConfirm: {
      type: String,
      required: [true, "Confirm password is required!"],
      validate: {
        validator: function (value: string) {
          return this.password === value;
        },
        message: "Passwords do not match.",
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(this.password, 12);

  this.password = hashedPassword;
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
