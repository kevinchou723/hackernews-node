const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

const signup = async (root, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10)
  const selectionSection = ` { id } `
  const user = await context.db.mutation.createUser({
    data: {
      ...args,
      password
    },
  }, selectionSection)

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

const login = async (root, args, context, info) => {
  const { email } = args
  const selectionSection = ` { id password } `
  const user = await context.db.query.user({
    where: {
      email
    }
  }, selectionSection)

  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

const vote = async (parent, args, context, info) => {
  const userId = getUserId(context)
  const { linkId } = args
  const linkExists = await context.db.exists.Vote({
    user: { id: userId },
    link: { id: linkId },
  })
  if (linkExists) {
    throw new Error(`Already voted for link: ${linkId}`)
  }

  return context.db.mutation.createVote(
    {
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: linkId } },
      },
    },
    info,
  )
}

const post = (parent, args, context, info) => {
  const userId = getUserId(context)
  const { url, description } = args
  return context.db.mutation.createLink(
    {
      data: {
        url,
        description,
        postedBy: { connect: { id: userId } },
      },
    },
    info,
  )
}

module.exports = {
  signup,
  login,
  vote,
  post,
}