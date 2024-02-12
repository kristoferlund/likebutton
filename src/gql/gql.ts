/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment AttestationWithCoreFields on Attestation {\n    id\n    time\n    attester\n    recipient\n    decodedDataJson\n  }\n": types.AttestationWithCoreFieldsFragmentDoc,
    "\n  query Attestations($where: AttestationWhereInput, $take: Int, $skip: Int) {\n    attestations(\n      orderBy: { time: desc }\n      where: $where\n      take: $take\n      skip: $skip\n    ) {\n      ...AttestationWithCoreFields\n    }\n  }\n": types.AttestationsDocument,
    "\n  query AggregateAttestation($where: AttestationWhereInput) {\n    aggregateAttestation(where: $where) {\n      _count {\n        id\n      }\n    }\n  }\n": types.AggregateAttestationDocument,
    "\n  query RecipientAttestations($where: AttestationWhereInput) {\n    attestations(orderBy: { time: desc }, where: $where) {\n      ...AttestationWithCoreFields\n    }\n  }\n": types.RecipientAttestationsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AttestationWithCoreFields on Attestation {\n    id\n    time\n    attester\n    recipient\n    decodedDataJson\n  }\n"): (typeof documents)["\n  fragment AttestationWithCoreFields on Attestation {\n    id\n    time\n    attester\n    recipient\n    decodedDataJson\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Attestations($where: AttestationWhereInput, $take: Int, $skip: Int) {\n    attestations(\n      orderBy: { time: desc }\n      where: $where\n      take: $take\n      skip: $skip\n    ) {\n      ...AttestationWithCoreFields\n    }\n  }\n"): (typeof documents)["\n  query Attestations($where: AttestationWhereInput, $take: Int, $skip: Int) {\n    attestations(\n      orderBy: { time: desc }\n      where: $where\n      take: $take\n      skip: $skip\n    ) {\n      ...AttestationWithCoreFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AggregateAttestation($where: AttestationWhereInput) {\n    aggregateAttestation(where: $where) {\n      _count {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query AggregateAttestation($where: AttestationWhereInput) {\n    aggregateAttestation(where: $where) {\n      _count {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RecipientAttestations($where: AttestationWhereInput) {\n    attestations(orderBy: { time: desc }, where: $where) {\n      ...AttestationWithCoreFields\n    }\n  }\n"): (typeof documents)["\n  query RecipientAttestations($where: AttestationWhereInput) {\n    attestations(orderBy: { time: desc }, where: $where) {\n      ...AttestationWithCoreFields\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;