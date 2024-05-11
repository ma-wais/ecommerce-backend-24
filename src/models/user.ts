import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob?: Date;
  createdAt: Date;
  updatedAt: Date;
  //   Virtual Attribute
  age: number;
}

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      unique: [true, "Email already Exist"],
      required: [true, "Please enter Name"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please add Photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
      // required: [true, "Please enter Gender"],
    },
    dob: {
      type: Date,
      // required: [true, "Please enter Date of birth"],
      // default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
schema.virtual("age").get(function () {
  // Calculate age only if dob is defined
  if (this.dob) {
    const today = new Date();
    const dob = new Date(this.dob);
    let age = today.getFullYear() - dob.getFullYear();

    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  } else {
    return null; // Return null if dob is not defined
  }
});

export const User = mongoose.model<IUser>("User", schema);
