import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'question-winter',
  title: 'Question winter',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Id',
      type: 'number',
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'answers',
      title: 'Answers',
      type: 'array',
      of: [{type: 'answer'}],
    }),
  ],
  preview: {
    select: {
      title: 'question'    },
    // prepare(selection) {
    //   const year = selection.date && selection.date.split('-')[0]
    //   const cast = [selection.castName0, selection.castName1].filter(Boolean).join(', ')

    //   // return {
    //   //   title: `${selection.title} ${year ? `(${year})` : ''}`,
    //   //   date: selection.date,
    //   //   subtitle: cast,
    //   //   media: selection.media,
    //   // }
    // },
  },
})
