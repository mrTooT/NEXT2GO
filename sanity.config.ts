import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

export default defineConfig({
  name: "next2go",
  title: "Next2Go",
  projectId: "5eo5uf46",
  dataset: "production",
  plugins: [deskTool()],
});