import { UploadCloud } from "lucide-react";

type ImageDropZoneProps = React.ComponentPropsWithoutRef<"input">;

const ImageDropZone = ({ name, ...props }: ImageDropZoneProps) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor={name}
        className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
      >
        <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
          <UploadCloud />
          <p className="mb-2 text-sm">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id={name} type="file" className="hidden" {...props} />
      </label>
    </div>
  );
};

export default ImageDropZone;
