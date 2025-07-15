export interface VideoStorageService {
  upload(fileBuffer: Buffer, fileName: string): Promise<string>; // returns video URL
  delete(fileUrl: string): Promise<void>;
}
