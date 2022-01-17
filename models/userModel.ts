import { Schema, model } from "mongoose";

export interface UserModelType extends Document {
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "RoleModel",
    default: null,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model("User", UserSchema);
