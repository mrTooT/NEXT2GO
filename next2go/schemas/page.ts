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
  title: 'page',
  name: 'page',
  type: 'document',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'meta Title',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'title',
      title: 'title',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'subTitle',
      title: 'subTitle',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'first',
      title: 'First text',
      type: 'string',
      description: '',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: '',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      description: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    description: 'Read https://css-tricks.com/use-target_blank/',
                    type: 'boolean',
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [
                      {type: 'post'},
                      // other types you may want to link to
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
