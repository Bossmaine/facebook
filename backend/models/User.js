const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const User = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    text: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    text: true,
  },
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    text: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    trim: true,
  },
  cover: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    required: [true, "Gender  is required"],
    trim: true,
  },
  birthYear: {
    type: Number,
    required: [true, "Birth year name is required"],
    trim: true,
  },
  birthMonth: {
    type: Number,
    required: [true, "Birth month is required"],
    trim: true,
  },
  birthDay: {
    type: Number,
    required: [true, "Birth day is required"],
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  friends: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  requests: {
    type: Array,
    default: [],
  },
  search: [
    {
      user: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
  details: {
    bio: {
        type: String,
    },
    otherName: {
        type: String,
    },
    job: {
        type: String,
    },
    workplace: {
        type: String,
    },
    highschool: {
        type: String,
    },
    college: {
        type: String,
    },
    currentCity: {
        type: String,
    },
    hometown: {
        type: String,
    },
    relationship: {
        type: String,
        enum: ['Single', 'In a relationship', 'Married', 'Divorced' ],
    },
    Instagram: {
        type: String,
    },
  },
  savedPosts: [
    {
        post: {
            type: ObjectId,
            ref: "Post",
        }, 
        savedAt: {
            type: Date,
            default: new Date(),
        }
    }
  ],
}, 
{
    timestamps: true,
}
);

module.exports = mongoose.model('User', User )
