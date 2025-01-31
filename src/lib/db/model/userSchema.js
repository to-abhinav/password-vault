import mongoose from "mongoose";
import Email from "next-auth/providers/email";

const schema = mongoose.Schema;

const userSchema = new schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  provider: {
    type: String,
    default: "credentials",
  },
});

const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
