/**
 * FileData interface represents the metadata of a file.
 * Used for file uploads in various service requests.
 */

export interface FileData {
  uri: string;
  name: string;
  type: string;
}
