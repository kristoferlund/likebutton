import { Attestation } from "./gql/attestation.type";

type DisplayComponentProps = {
  attestation: Attestation;
};

export type SchemaListItem = {
  name: string;
  description?: string;
  projectUrl?: string;
  uid: string;
  displayComponent?: (
    props: DisplayComponentProps
  ) => JSX.Element | Promise<JSX.Element>;
  logo?: any;
  gqlWhere?: any;
};
