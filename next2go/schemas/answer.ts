import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'answer',
  title: 'Answer',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Id',
      type: 'string',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Question Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'answer',
      media: 'image',
    },
  },
})
