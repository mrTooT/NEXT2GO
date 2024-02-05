import { defineConfig } from "sanity";
import { schemaTypes } from './next2go/schemas'

import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: "next2go",
  title: "Next2Go",
  projectId: "5eo5uf46",
  dataset: "production",
  plugins: [
    structureTool(),
    visionTool(),
    //googleMapsInput(),
  ],
  schema: {
    types: schemaTypes,
  },
});

