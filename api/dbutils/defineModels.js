import {sequelize} from "./connectDB.js"
import {undefUserModel} from "../models/user.model.js"
import {undefVerificationCodeModel} from "../models/verificationCode.model.js"
import {undefPostModel} from "../models/post.model.js"
import {undefTopicModel} from "../models/topic.model.js"
import {undefPostRefTopicModel} from "../models/postRefTopic.model.js"

export const userModel = sequelize.define("user", undefUserModel)
export const verificationCodeModel = sequelize.define("verificationCode", undefVerificationCodeModel)
export const postModel = sequelize.define("post", undefPostModel)
export const topicModel = sequelize.define("topic", undefTopicModel)
export const postRefTopicModel = sequelize.define("postRefTopic", undefPostRefTopicModel)
