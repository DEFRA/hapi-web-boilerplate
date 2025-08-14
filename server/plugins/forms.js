import plugin from '@defra/forms-engine-plugin'
import { FileFormService } from '@defra/forms-engine-plugin/file-form-service.js'

const loader = new FileFormService()
const now = new Date()
const user = { id: 'user', displayName: 'Username' }
const author = { createdAt: now, createdBy: user, updatedAt: now, updatedBy: user }
const metadata = {
  organisation: 'Defra',
  teamName: 'Team name',
  teamEmail: 'team@defra.gov.uk',
  submissionGuidance: "Thanks for your submission, we'll be in touch",
  notificationEmail: 'email@domain.com',
  ...author,
  live: author
}

await loader.addForm(
  'server/forms/register-as-a-unicorn-breeder.json', {
    ...metadata,
    id: '95e92559-968d-44ae-8666-2b1ad3dffd31',
    title: 'Register as a unicorn breeder',
    slug: 'register-as-a-unicorn-breeder'
  }
)

export default {
  plugin,
  options: {
    services: {
      formsService: loader.toFormsService()
    },
    nunjucks: {
      baseLayoutPath: 'layout.html',
      paths: ['server/views']
    },
    viewContext: () => { },
    baseUrl: 'http://localhost:3020'
  }
}
