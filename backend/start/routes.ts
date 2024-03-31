/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AuthController from '#controllers/auth_controller'
const ClientsController = () => import('#controllers/clients_controller')

router
  .group(() => {
    router.resource('clients', ClientsController).apiOnly()
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )
router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])
