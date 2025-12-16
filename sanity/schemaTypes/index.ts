import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import post from './post'
import fypUpdate from './fypUpdate'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [project, post, fypUpdate],
}
