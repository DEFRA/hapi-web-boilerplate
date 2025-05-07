import { FileFormService } from '@defra/forms-engine-plugin/file-form-service.js'

// Create shared form metadata
const now = new Date()
const user = { id: 'user', displayName: 'Username' }
const author = {
  createdAt: now,
  createdBy: user,
  updatedAt: now,
  updatedBy: user
}
const metadata = {
  organisation: 'Defra',
  teamName: 'Team name',
  teamEmail: 'team@defra.gov.uk',
  submissionGuidance: "Thanks for your submission, we'll be in touch",
  notificationEmail: 'a@b.co.uk',
  ...author,
  live: author
}

// Instantiate the file loader form service
const loader = new FileFormService()

// Add Eligibility form
await loader.addForm('server/forms/eligibility.json', {
  ...metadata,
  id: 'ffb3f0d9-d506-4332-bd8f-0435c190446f',
  title: 'Eligibility',
  slug: 'eligibility'
})

// Add Personal details form
await loader.addForm('server/forms/personal-details.json', {
  ...metadata,
  id: '95e92559-968d-44ae-8666-2b1ad3dffd31',
  title: 'Personal details',
  slug: 'personal-details'
})

export const formsService = loader.toFormsService()
