import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'

export default class ClientsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return await Client.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    return await Client.create({
      firstName: request.body().firstName,
      lastName: request.body().lastName,
      age: request.body().age,
      gender: request.body().gender,
      town: request.body().town,
    })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Client.findOrFail(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    let client = await Client.findOrFail(params.id)
    const body = request.body()
    // client.firstName = body.firstName
    // client.lastName = body.lastName
    // client.age = body.age
    // client.town = body.town

    return client
      .merge({
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age,
        town: body.town,
      })
      .save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    let client = await Client.findOrFail(params.id)
    await client.delete()
    return {
      message: 'Successfully deleted client.',
    }
  }
}
