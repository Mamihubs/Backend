import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";

export interface UserDoc extends Document {
  profileID: object;
  fullName: string;
  login: string;
  password: string;
  active: boolean;
  type: string;
  status: string;
  company: object;
  createdBy: object;
  updatedBy: object;
  matchPassword(password: string): Promise<boolean>;
}

// defining the user status
export enum UserStatus {
  PENDING = "Pending",
  ACTIVE = "Active",
}

// defining user type
export enum UserType {
  CUSTOMER = "Customer",
  VENDOR = "Vendor",
  STAFF = "Staff",
}

const User = new Schema<UserDoc>(
  {
    profileID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },

    fullName: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: Object.values(UserType),
      default: UserType.CUSTOMER,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.PENDING,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// extend matchPassword function unto user
User.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

User.set("toJSON", {
  transform: function (_, ret) {
    delete ret.password;
    return ret;
  },
});
const UserModel = mongoose.model<UserDoc>("User", User);
export default UserModel;
// define the basic schema operations
export const getUserById = async (id: string) => await UserModel.findById(id);
export const getUserByEmail = async (email: string) =>
  await UserModel.findOne({ login: email });
export const updateUserInfo = async (id: string, values: Record<string, any>) =>
  await UserModel.findOneAndUpdate({ _id: id }, values, { new: true });
