export interface Attestation {
  id: string;
  attester: string;
  recipient: string;
  expirationTime: bigint;
  revoked: boolean;
  decodedDataJson: string;
  time: bigint;
  schemaId: string;
}
