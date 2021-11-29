import Router from 'koa-router'

import Employee from '../models/employees'

export default (router: Router) => {
  router
    .get('/employees', async (ctx) => {
      ctx.body = await Employee.find({})
    })
    .post('/employees', async (ctx) => {
      ctx.body = await Employee.create({
        username: ctx.request.body.usernames,
        email: ctx.request.body.email,
        createTime: new Date()
      })
    })
    .get('/employees/:id', async (ctx) => {
      let user

      if (ctx.params.id.length <= 2) {
        const id = Number.parseInt(ctx.params.id)
        user = await Employee.findOne({}).skip(id - 1).limit(1)
      } else {
        user = await Employee.findById(ctx.params.id)
      }

      if (user) {
        ctx.body = {
          id: user._id,
          username: user.username,
          createdAt: user.createdAt
        }
      }
    })
    .put('/employees/:id', async (ctx) => {
      const user = await Employee.findByIdAndUpdate(
        ctx.params.id,
        { username: ctx.request.body.username },
        { new: true, runValidators: true }
      )
      if (user) { ctx.body = user }
    })
    .delete('/employees/:id', async (ctx) => {
      const user = await Employee.findByIdAndRemove(ctx.params.id)
      if (user) { ctx.status = 204 }
    })
}