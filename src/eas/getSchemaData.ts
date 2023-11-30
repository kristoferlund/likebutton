import { EAS_SCHEMAS } from "../config";

export function getSchemaData(schemaUid: string) {
  return EAS_SCHEMAS.find((schema) => schema.uid === schemaUid);
}
