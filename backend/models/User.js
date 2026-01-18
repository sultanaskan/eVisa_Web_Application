import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema =  new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, require: true},
    dType: { type: String, require: true},
    passCountry: { type: String, require: true},
    dNumber: { type: String, require: true},
    dEDate: { type: String, require: true},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false , required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
 
});

export default mongoose.model('User', userSchema);