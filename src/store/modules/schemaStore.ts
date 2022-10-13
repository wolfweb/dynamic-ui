import { SchemaMode } from '@/enums/schemaMode';
import { defineStore } from 'pinia';
import { store } from '..';

interface SchemaModelState {
  Schema: Array<IElementMetadata>,
  Mode: SchemaMode | undefined
}

const schemaStore = (schema?:Array<IElementMetadata>) => {
  return defineStore({
    id: 'schemaStore',
    state: (): SchemaModelState => {
      return { Schema: schema || [], Mode: undefined };
    },
    actions: {
      updateSchema(schema: Array<IElementMetadata>) {
        this.Schema = schema;
      },
      setMode(mode: SchemaMode) {
        this.Mode = mode;
      }
    }
  })(store);
};

export function useSchemaStore(schema?: Array<IElementMetadata>) {
  return schemaStore(schema);
}