import { db } from '../services/state.js'

const sections = [
  {
    id: 'eligibility',
    title: 'Check before you start',
    subSections: [
      { title: 'Check grant requirements', slug: 'eligibility', id: 'ffb3f0d9-d506-4332-bd8f-0435c190446f' }
    ]
  },
  {
    id: 'prepare-your-application',
    title: 'Prepare your application',
    subSections: [
      { title: 'Personal details', slug: 'personal-details', id: '95e92559-968d-44ae-8666-2b1ad3dffd31' }
    ]
  }
]

export default [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      const model = {
        title: 'Apply for a laying hens grant',
        caption: 'Farming Transformation Fund (FTF) 2025',
        closingDate: '17 June 2025',
        taskLists: []
      }

      sections.forEach((section, index) => {
        const taskList = {
          title: `${index + 1}. ${section.title}`,
          options: {
            idPrefix: section.id,
            items: []
          }
        }

        section.subSections.forEach(subSection => {
          const state = db.get(subSection.slug)
          let status = {
            tag: {
              text: 'Not yet started',
              classes: 'govuk-tag--blue'
            }
          }

          if (state) {
            status = {
              tag: {
                text: 'In progress',
                classes: 'govuk-tag--green'
              }
            }

            if (state.completed) {
              status = { text: 'Completed' }
            }
          }

          taskList.options.items.push({
            title: { text: subSection.title },
            href: `/${subSection.slug}`,
            status
          })
        })

        model.taskLists.push(taskList)
      })

      return h.view('home', { model })
    }
  }
]
