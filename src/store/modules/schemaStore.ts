import { SchemaMode } from '@/enums/schemaMode';
import { FormElementMetadata, LayoutElementMetadata } from '@/models/schema';
import { defineStore } from 'pinia';
import { store } from '..';

interface SchemaModelState {
  Schema: Array<FormElementMetadata | LayoutElementMetadata>,
  Mode: SchemaMode | undefined
}

const schemaStore = (schema?:Array<FormElementMetadata | LayoutElementMetadata>) => {
  return defineStore({
    id: 'schemaStore',
    state: (): SchemaModelState => {
      return { Schema: schema || [], Mode: undefined };
    },
    actions: {
      updateSchema(schema: Array<FormElementMetadata | LayoutElementMetadata>) {
        this.Schema = schema;
      },
      setMode(mode: SchemaMode) {
        this.Mode = mode;
      }
    }
  })(store);
};

export function useSchemaStore(schema?: Array<FormElementMetadata | LayoutElementMetadata>) {
  return schemaStore(schema);
}