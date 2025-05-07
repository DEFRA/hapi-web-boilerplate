import { SummaryPageController } from '@defra/forms-engine-plugin/controllers/SummaryPageController.js'
import { db } from '../services/state.js'

export default class TaskListSummaryPageController extends SummaryPageController {
  /**
   * Override the POST handler to return to the task list page
   */
  makePostRouteHandler () {
    return async (request, context, h) => {
      // Save to "db"
      db.set(request.app.model.basePath, { completed: true, state: context.relevantState })

      return h.redirect('/')
    }
  }
}
