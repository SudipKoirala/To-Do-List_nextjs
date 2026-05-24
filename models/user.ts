import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";


interface IUser extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword?: string;
  _confirmPassword?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

UserSchema.virtual("confirmPassword")
  .set(function (this: IUser, value: string) {
    (this as any)._confirmPassword = value.trim();
  })
  .get(function (this: IUser) {
    return (this as any)._confirmPassword;
  });


UserSchema.pre<IUser>("validate",async function () {
  if (this.confirmPassword && this.confirmPassword !== this.password) {
    return new Error("Passwords do not match");
  }
});

// Pre-save hook - add proper typing
UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method - add proper typing
UserSchema.methods.comparePassword = async function (
  this: IUser,
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);