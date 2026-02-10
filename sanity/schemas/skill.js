import {defineType} from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Frontend', value: 'frontend'},
          {title: 'Mobile', value: 'mobile'},
          {title: 'Testing', value: 'testing'},
          {title: 'Tooling', value: 'tooling'},
          {title: 'Platform', value: 'platform'},
          {title: 'Backend', value: 'backend'},
          {title: 'Design', value: 'design'},
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
          {title: 'Expert', value: 'expert'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(50),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'currentlyUsing',
      title: 'Currently Using',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower value appears first.',
      validation: (Rule) => Rule.min(0),
    },
    {
      name: 'progress',
      title: 'Legacy Progress (Deprecated)',
      type: 'number',
      hidden: true,
      readOnly: true,
    },
  ],
})
