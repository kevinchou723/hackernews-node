const user = (root, args, context, info) => {
  const { user: { id } } = root
  return context.db.query.user({
    where: {
      id
    }
  }, info)
}
module.exports = { user }