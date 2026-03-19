import { Upload } from 'lucide-react';

interface UploadAreaProps {
  label?: string;
  accept?: string;
  onUpload?: (file: File) => void;
}

export default function UploadArea({ label = 'Upload file', accept, onUpload }: UploadAreaProps) {
  return (
    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors">
      <Upload size={24} className="text-gray-400 mb-2" />
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-xs text-gray-400 mt-1">Click or drag to upload</span>
      <input
        type="file"
        className="hidden"
        accept={accept}
        onChange={e => e.target.files?.[0] && onUpload?.(e.target.files[0])}
      />
    </label>
  );
}
