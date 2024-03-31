/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import ClientsController from '#controllers/clients_controller'

router.resource('clients', ClientsController).apiOnly()
