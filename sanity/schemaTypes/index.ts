import { type SchemaTypeDefinition } from 'sanity'
import projectType from './project';
import { skillType } from './skill';
import { experienceType } from './experience';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, skillType, experienceType],
}