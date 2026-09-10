"use client";

import { useEffect, useRef, useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadProvider, UploadResult } from "@/lib/upload";

export interface UploadedFile {
  id: string;
  file?: File;
  preview: string;
  progress: number;
  status: "pending" | "uploading" | "uploaded" | "error";
  url?: string;
  error?: string;
}

interface FileUploadProps {
  value: UploadResult[];
  onChange: (value: UploadResult[]) => void;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  provider: UploadProvider;
}

export function FileUpload({
  value,
  onChange,
  multiple = true,
  accept = "image/*",
  maxFiles = 10,
  provider,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value?.length) {
      setFiles([]);
      return;
    }

    setFiles(
      value.map((item) => ({
        id: item.key ?? crypto.randomUUID(),
        preview: item.url,
        progress: 100,
        status: "uploaded",
        url: item.url,
      })),
    );
  }, [value]);

  useEffect(() => {
    return () => {
      files?.forEach((file) => {
        // Only revoke object URLs created locally.
        if (file.file) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  async function upload(uploadFile: UploadedFile) {
    if (!uploadFile.file) return;

    try {
      setFiles((current) =>
        current.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                status: "uploading",
              }
            : f,
        ),
      );

      const result = await provider.upload(uploadFile.file, (progress) => {
        setFiles((current) =>
          current.map((f) =>
            f.id === uploadFile.id
              ? {
                  ...f,
                  progress,
                }
              : f,
          ),
        );
      });

      setFiles((current) =>
        current.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                status: "uploaded",
                progress: 100,
                url: result.url,
              }
            : f,
        ),
      );

      onChange([...value, result]);
    } catch {
      setFiles((current) =>
        current.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                status: "error",
                error: "Upload failed",
              }
            : f,
        ),
      );
    }
  }

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);

    const available = maxFiles - files?.length;

    selected.slice(0, available).forEach((file) => {
      const uploadFile: UploadedFile = {
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: "pending",
      };

      setFiles((current) => [...current, uploadFile]);

      upload(uploadFile);
    });

    e.target.value = "";
  }

  function remove(id: string) {
    const item = files.find((f) => f.id === id);

    if (!item) return;

    if (item.file) {
      URL.revokeObjectURL(item.preview);
    }

    setFiles((current) => current.filter((f) => f.id !== id));

    if (item.url) {
      onChange(value.filter((res) => res.url !== item.url));
    }
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed"
      >
        <UploadCloud className="mb-2 h-6 w-6" />

        <p>Upload files</p>

        <input
          ref={inputRef}
          hidden
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleSelect}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {files?.map((file) => (
          <div key={file.id} className="rounded-lg border p-3">
            <img
              src={file.preview}
              alt="Uploaded file"
              className="mb-3 h-36 w-full rounded object-cover"
            />

            {file.status === "uploading" && (
              <>
                <Progress value={file.progress} />
                <p className="mt-2 text-sm">{file.progress}%</p>
              </>
            )}

            {file.status === "uploaded" && (
              <p className="text-sm text-green-600">Uploaded</p>
            )}

            {file.status === "error" && (
              <p className="text-sm text-red-600">{file.error}</p>
            )}

            <div className="mt-3 flex justify-end">
              {file.status === "uploading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  onClick={() => remove(file.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
