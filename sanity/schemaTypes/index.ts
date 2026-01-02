import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import post from './post'
import fypUpdate from './fypUpdate'
import contentImage from './contentImage'
import experience from './experience'
import education from './education'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [project, post, fypUpdate, contentImage, experience, education],
}
