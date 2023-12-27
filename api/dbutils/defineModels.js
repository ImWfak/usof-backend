import {sequelize} from "./connectDB.js"
import {undefUserModel} from "../models/user.model.js"
import {undefVerificationCodeModel} from "../models/verificationCode.model.js"
import {undefForumRoleModel} from "../models/forumRole.model.js"
import {undefPostModel} from "../models/post.model.js"
import {undefTopicModel} from "../models/topic.model.js"
import {undefPostRefTopicModel} from "../models/postRefTopic.model.js"
import {undefCommentsModel} from "../models/comments.model.js"
import {undefActivityModel} from "../models/activity.model.js"

export const userModel = sequelize.define("user", undefUserModel)
export const verificationCodeModel = sequelize.define("verificationCode", undefVerificationCodeModel)
export const forumRoleModel = sequelize.define("forumRole", undefForumRoleModel)
export const postModel = sequelize.define("post", undefPostModel)
export const topicModel = sequelize.define("topic", undefTopicModel)
export const postRefTopicModel = sequelize.define("postRefTopic", undefPostRefTopicModel)
export const commentModel = sequelize.define("comment", undefCommentsModel)
export const activityModel = sequelize.define("activity", undefActivityModel)
