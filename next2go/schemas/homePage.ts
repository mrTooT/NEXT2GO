import {defineField, defineType} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'home',
  name: 'home',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'title',
      type: 'string',
      description: 'Hoofdtitle  (NEXT TO GO)',
    }),
    defineField({
      name: 'subTitle',
      title: 'subTitle',
      type: 'string',
      description: 'Zwarte subtitle',
    }),
    defineField({
      name: 'teaser',
      title: 'Teaser text below subTitle',
      type: 'string',
      description: 'Text onder zwarte subtitle',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button text',
      type: 'string',
      description: 'Button text die linkt naar de quiz',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Let op: Dit moet gezien de darkmode een transparante gif zijn',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'answers',
      title: 'Answers',
      type: 'array',
      of: [{type: 'answer'}],
    }),
    defineField({
      name: 'quizFinishedTitle',
      title: 'Quiz Finished Title',
      type: 'string',
      description: 'Dit is de titel die de gebruiker te zien krijgt wanneer hij klaar is met de quiz',
    }),
    defineField({
      name: 'quizFinishedText',
      title: 'Quiz Finished Text',
      description:'Dit is de tekst die de gebruiker te zien krijgt wanneer hij klaar is met de quiz',
      type: 'array',
      of: [
        {
          type: 'block',
      }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title'},
  
    },
  })
