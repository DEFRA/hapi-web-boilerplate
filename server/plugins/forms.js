import plugin from '@defra/forms-engine-plugin'
import { formsService } from '../services/forms.js'
import TaskListSummaryPageController from '../controllers/TaskListSummaryController.js'

export default {
  plugin,
  options: {
    services: {
      formsService
    },
    nunjucks: {
      baseLayoutPath: 'layout.html',
      paths: ['server/views']
    },
    viewContext: () => ({
      assetPath: '/assets',
      serviceName: 'Service name',
      pageTitle: 'Service name - GOV.UK'
    }),
    controllers: {
      TaskListSummaryPageController
    }
  }
}
