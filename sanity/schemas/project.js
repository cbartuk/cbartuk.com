import {defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'Title of the project',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'deviceTargets',
      title: 'Device Targets',
      description: 'Select which device previews are available for this project.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Desktop', value: 'desktop'},
          {title: 'Tablet', value: 'tablet'},
          {title: 'Mobile', value: 'mobile'},
        ],
        layout: 'grid',
      },
    },
    {
      name: 'desktopImage',
      title: 'Desktop Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tabletImage',
      title: 'Tablet Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'mobileImage',
      title: 'Mobile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'reference', to: {type: 'skill'}}],
    },
    {
      name: 'linkToBuild',
      title: 'Link To Build',
      type: 'url',
    },
  ],
})
