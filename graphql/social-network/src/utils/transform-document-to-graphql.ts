import { Document } from "mongoose";
export function transformDocumentToGraphql(document: Document) {
  return {
    id: String(document._id),
    ...document.toObject(),
  };
}
