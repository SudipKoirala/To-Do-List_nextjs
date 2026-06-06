import bcrypt, { genSalt } from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword?: string;
  refreshToken: string;
  comparePassword: (candidatePass: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  userName: { type: String, required: true, trim: true, unique: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  refreshToken:{type: String }
});

UserSchema.virtual("confirmPassword")
  .set(function (value: string) {
    (this as any)._confirmPassword = value;
  })
  .get(function () {
    return (this as any)._confirmPassword;
  });

UserSchema.pre<IUser>("validate", async function () {
  if (this.confirmPassword && this.confirmPassword !== this.password) {
    this.invalidate("confirmPassword", "Confirm Password match vayena password sanga");
  }
});


UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePass: string) {
  return bcrypt.compare(candidatePass, this.password);
};

export const User =
  mongoose.models.user || mongoose.model<IUser>("User", UserSchema);
