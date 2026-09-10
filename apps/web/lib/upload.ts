import axios from "axios";

export interface UploadResult {
  id?: string; // Storage or database identifier
  url: string; // Public URL
  key?: string; // Storage key/path
  filename?: string; // Original filename
  size?: number; // File size in bytes
  mimeType?: string; // MIME type
}

export interface UploadProvider {
  upload(
    file: File,
    onProgress: (progress: number) => void,
  ): Promise<UploadResult>;
}

export const cloudinaryUploader: UploadProvider = {
  async upload(file, onProgress) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "jrlc8n92");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/image/upload`,
      formData,
      {
        onUploadProgress(e) {
          if (!e.total) return;

          onProgress(Math.round((e.loaded * 100) / e.total));
        },
      },
    );

    return response.data;
  },
};
