import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  folder?: string;
}

export function ImageUpload({ value, onChange, label = "Image", folder = "images" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({ variant: "destructive", title: "Invalid file type", description: "Please select an image file" });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ variant: "destructive", title: "File too large", description: "Maximum file size is 5MB" });
      return;
    }

    setIsUploading(true);
    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("lore-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("lore-images")
        .getPublicUrl(fileName);

      onChange(publicUrl);
      toast({ title: "Image uploaded successfully" });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({ variant: "destructive", title: "Upload failed", description: error.message });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setShowUrlInput(false);
    }
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-40 object-cover rounded-md border border-border"
          />
          <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={14} className="mr-1" />
              Replace
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
            >
              <X size={14} className="mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
          {showUrlInput ? (
            <div className="flex gap-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter image URL..."
                onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
              />
              <Button type="button" size="sm" onClick={handleUrlSubmit}>
                Add
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowUrlInput(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-center gap-2 mb-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload size={14} className="mr-1" />
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUrlInput(true)}
                >
                  <LinkIcon size={14} className="mr-1" />
                  URL
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF up to 5MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}