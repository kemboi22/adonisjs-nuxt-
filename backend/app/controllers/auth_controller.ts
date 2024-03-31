// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async login({ response, request }: HttpContext) {
    let body = request.body()
    const user = await User.verifyCredentials(body.email, body.password)
    if (!user) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
    let token = await User.accessTokens.create(user)
    return {
      token: token.value?.release(),
      data: {
        ...user.toJSON(),
      },
    }
  }

  async register({ request }: HttpContext) {
    let body = request.body()
    let user = await User.create(body)
    return {
      data: {
        ...user.toJSON(),
      },
    }
  }
}
