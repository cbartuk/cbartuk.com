import {defineField, defineType} from 'sanity'

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
    },
    {
      name: 'desktopImage',
      title: 'DesktopImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tabletImage',
      title: 'TabletImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'mobileImage',
      title: 'MobileImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'reference', to: {type: 'skill'}}],
    },
    {
      name: 'linkToBuild',
      title: 'LinkToBuild',
      type: 'url',
    },
  ],
})
