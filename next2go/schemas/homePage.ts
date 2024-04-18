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
      name: 'metaTitle',
      title: 'meta Title',
      type: 'string',
      description: ''
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'string',
      description: '',
    }),
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
      name: 'tagline',
      title: 'Tagline text below button',
      type: 'string',
      description: 'Text onder button',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button text',
      type: 'string',
      description: 'Button text die linkt naar de quiz',
    }),
    defineField({
      name: 'proof1amount',
      title: 'Bewijs 1 nummer',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'proof1title',
      title: 'Bewijs 1 title',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'proof2amount',
      title: 'Bewijs 2 nummer',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'proof2title',
      title: 'Bewijs 2 title',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'proof3amount',
      title: 'Bewijs 3 nummer',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'proof3title',
      title: 'Bewijs 3 title',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'proof4amount',
      title: 'Bewijs 4 nummer',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'proof4title',
      title: 'Bewijs 4 title',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'stepsTitle',
      title: 'Titel voor stappen',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'stepsSubTitle',
      title: 'Bewijs 4 Sub title',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'step1text',
      title: 'Stap 1 tekst',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'step2text',
      title: 'Stap 2 tekst',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'step3text',
      title: 'Stap 3 tekst',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'step4text',
      title: 'Stap 4 tekst',
      type: 'string',
      description: '',
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
      }]
    }),
    defineField({
      name: 'blogs',
      title: 'Blogs',
      type: 'array',
      of: [{type: 'blog'}],
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonials',
      type: 'array',
      of: [{type: 'testimonial'}],
    }),
    defineField({
      name: 'blogTitle',
      title: 'Blog title',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'blogSubTitle',
      title: 'Blog Subtitle',
      type: 'string',
      description: '',
    }),
  ],
  preview: {
    select: {
      title: 'title'},
  
    },
  })
