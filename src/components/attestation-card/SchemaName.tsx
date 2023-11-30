import { EAS_SCHEMAS } from "../../config";
import React from "react";

type SchemaNameProps = {
  uid: string;
};

export const SchemaName = React.memo(function SchemaName({
  uid,
}: SchemaNameProps) {
  const schema = EAS_SCHEMAS.find((schema) => schema.uid === uid);

  return (
    <div className="w-32 px-2 py-1 text-xs text-center border rounded-md bg-theme-gray-1">
      {schema?.name}
    </div>
  );
});
