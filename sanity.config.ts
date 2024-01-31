import { defineConfig } from "sanity";
import { schemaTypes } from './next2go/schamas'

export default defineConfig({
  name: "next2go",
  title: "Next2Go",
  projectId: "5eo5uf46",
  dataset: "production",
  schema: {
    types: schemaTypes,
  },
});