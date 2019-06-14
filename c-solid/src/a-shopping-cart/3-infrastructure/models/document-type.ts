import { ISendDocuments } from './i-send-documents';

export interface DocumentType {
  typeName: string;
  prefix?: string;
  sender: ISendDocuments;
}
