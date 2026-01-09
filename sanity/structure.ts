import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Hero Section')
        .id('hero')
        .child(
          S.document()
            .schemaType('hero')
            .documentId('hero')
        ),
      S.listItem()
        .title('About Section')
        .id('about')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),
      // Filter out the "hero" and "about" types from the list of document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['hero', 'about'].includes(listItem.getId() as string)
      ),
    ])
