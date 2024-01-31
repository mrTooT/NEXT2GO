import { defineConfig } from "sanity";
import { schemaTypes } from './next2go/schemas'

export default defineConfig({
  name: "next2go",
  title: "Next2Go",
  projectId: "5eo5uf46",
  dataset: "production",
  schema: {
    types: schemaTypes,
  },
});