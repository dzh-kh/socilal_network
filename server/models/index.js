const sequelize = require("../db/db");
const { DataTypes, INTEGER } = require("sequelize");

const UserModel = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING(1000) },
  },
  { timestamps: false, createdAt: false, updatedAt: false }
);

const ProfileModel = sequelize.define("profile", {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  avatar: { type: DataTypes.STRING },
  background: { type: DataTypes.STRING },
  isOnline: { type: DataTypes.BOOLEAN },
  bio: { type: DataTypes.TEXT },
  gender: { type: DataTypes.STRING },
});

const FriendshipModel = sequelize.define(
  "friendship",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: false, createdAt: false, updatedAt: false }
);

const CommentModel = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.TEXT },
  attachment: { type: DataTypes.STRING },
  parentId: { type: DataTypes.INTEGER },
  adresseeId: { type: DataTypes.INTEGER },
});

const PostModel = sequelize.define("post", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  message: { type: DataTypes.STRING(1000) },
  selectedFile: { type: DataTypes.STRING },
});

const TokenModel = sequelize.define("token", {
  refreshToken: { type: DataTypes.STRING(1000) },
});

const PostLikeModel = sequelize.define(
  "post-like",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  { timestamps: false, createdAt: false, updatedAt: false }
);

const CommentLikeModel = sequelize.define(
  "comment-like",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  { timestamps: false, createdAt: false, updatedAt: false }
);

const PostTagModel = sequelize.define(
  "post-tag",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  { timestamps: false, createdAt: false, updatedAt: false }
);

const TagModel = sequelize.define(
  "tag",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
  },
  { timestamps: false, createdAt: false, updatedAt: false }
);

const ChatRoomModel = sequelize.define("chat", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  members: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  user1LastChecked: { type: DataTypes.DATE },
  user2LastChecked: { type: DataTypes.DATE },
});

const MessageModel = sequelize.define("message", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.TEXT(1000) },
  readStatus: { type: DataTypes.BOOLEAN, defaultValue: false },
});

ProfileModel.hasMany(ChatRoomModel);
ChatRoomModel.belongsTo(ProfileModel, { as: "user1" });
ProfileModel.hasMany(ChatRoomModel);
ChatRoomModel.belongsTo(ProfileModel, { as: "user2" });

ChatRoomModel.hasMany(MessageModel);
MessageModel.belongsTo(ChatRoomModel);

ProfileModel.hasMany(MessageModel);
MessageModel.belongsTo(ProfileModel, { as: "to" });

ProfileModel.hasMany(MessageModel);

MessageModel.belongsTo(ProfileModel, { as: "from" });

ChatRoomModel.hasMany(MessageModel);
MessageModel.belongsTo(ChatRoomModel);

UserModel.hasOne(ProfileModel);
ProfileModel.belongsTo(UserModel);

UserModel.hasOne(TokenModel);
TokenModel.belongsTo(UserModel);

CommentModel.belongsTo(ProfileModel, {
  as: "author",
  foreignKey: "profileId",
});

PostModel.hasMany(CommentModel, {
  as: "comments",
  onDelete: "cascade",
  hooks: true,
});
CommentModel.belongsTo(PostModel, { onDelete: "cascade", hooks: true });

CommentModel.belongsTo(CommentModel, {
  as: "addressee",
  foreignKey: "adresseeId",
});

ProfileModel.belongsToMany(ProfileModel, {
  as: "requesters",
  foreignKey: "requesterId",
  through: FriendshipModel,
});
ProfileModel.belongsToMany(ProfileModel, {
  as: "adressees",
  foreignKey: "adresseeId",
  through: FriendshipModel,
});

ProfileModel.hasMany(FriendshipModel, {
  foreignKey: "id",
});

PostModel.belongsToMany(TagModel, {
  as: "tags",
  through: PostTagModel,
});
TagModel.belongsToMany(PostModel, { as: "post-tags", through: PostTagModel });

ProfileModel.hasMany(PostModel);
PostModel.belongsTo(ProfileModel, { as: "author", foreignKey: "userId" });

UserModel.belongsToMany(PostModel, {
  as: "post-likes",
  through: PostLikeModel,
  hooks: true,
});
PostModel.belongsToMany(UserModel, {
  as: "likedBy",
  through: PostLikeModel,
  hooks: true,
});

UserModel.belongsToMany(CommentModel, {
  through: CommentLikeModel,
});
CommentModel.belongsToMany(UserModel, {
  as: "likedBy",
  through: CommentLikeModel,
});

module.exports = {
  ChatRoomModel,
  MessageModel,
  UserModel,
  TokenModel,
  PostLikeModel,
  CommentLikeModel,
  PostModel,
  PostTagModel,
  TagModel,
  FriendshipModel,
  CommentModel,
  ProfileModel,
};
