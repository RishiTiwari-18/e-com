import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import useProduct from "../hooks/useProduct";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const MAX_IMAGES = 7;

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "JPY"];

function FieldError({ error }) {
  if (!error) return null;
  return <p className="text-xs text-destructive">{error.message}</p>;
}

export default function CreateProduct() {
  const navigate = useNavigate();
  const { handleCreateProduct } = useProduct();
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);
  const [dragActive, setDragActive] = useState(false);
  const [imageEntries, setImageEntries] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      currency: "INR",
    },
  });

  const addImages = useCallback((fileList) => {
    const files = Array.from(fileList || []).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (files.length === 0) return;

    setImageEntries((current) => {
      const remaining = MAX_IMAGES - current.length;
      if (remaining <= 0) {
        toast.error(`Maximum ${MAX_IMAGES} images allowed.`);
        return current;
      }
      const toAdd = files.slice(0, remaining);
      if (files.length > remaining) {
        toast.error(`Only ${remaining} more image(s) can be added.`);
      }
      return [
        ...current,
        ...toAdd.map((file) => ({
          file,
          previewUrl: URL.createObjectURL(file),
        })),
      ];
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const removeImage = useCallback((index) => {
    setImageEntries((current) => {
      URL.revokeObjectURL(current[index].previewUrl);
      return current.filter((_, i) => i !== index);
    });
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current += 1;
    if (dragCounter.current === 1) setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dragCounter.current = 0;
    setDragActive(false);
    addImages(e.dataTransfer.files);
  };

  const onSubmit = async (values) => {
    if (imageEntries.length === 0) {
      toast.error("Please add at least one product image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("amount", values.amount);
      formData.append("currency", values.currency);
      imageEntries.forEach((entry) => formData.append("images", entry.file));

      await handleCreateProduct(formData);
      toast.success("Product created successfully");
      navigate("/products");
    } catch (error) {
      toast.error(error.message || "Failed to create product");
    }
  };

  return (
    <main className="min-h-screen px-6 py-10 text-stone-900">
      <section className="mx-auto w-full max-w-7xl space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-stone-500">
              Create listing
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              Add a new product
            </h1>
          </div>

          <Button
            variant="link"
            onClick={() => navigate("/products")}
            className="text-sm font-medium underline underline-offset-4"
          >
            View listed products
          </Button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start"
        >
          <div className="order-1 space-y-8">
            <div className="space-y-2">
              <Label
                className="block text-xs font-semibold uppercase tracking-[0.25em] text-stone-500"
                htmlFor="title"
              >
                Product title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Oversized Hoodie"
                {...register("title", { required: "Title is required" })}
              />
              <FieldError error={errors.title} />
            </div>

            <div className="space-y-2">
              <Label
                className="block text-xs font-semibold uppercase tracking-[0.25em] text-stone-500"
                htmlFor="description"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Write product details that feel sharp, useful, and clear."
                className="max-h-26 h-26 resize-none"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              <FieldError error={errors.description} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  className="block text-xs font-semibold uppercase tracking-[0.25em] text-stone-500"
                  htmlFor="amount"
                >
                  Price
                </Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  placeholder="999"
                  {...register("amount", {
                    required: "Amount is required",
                    validate: (value) =>
                      Number(value) >= 0 || "Amount must be non-negative",
                  })}
                />
                <FieldError error={errors.amount} />
              </div>

              <div className="space-y-3">
                <Label
                  className="block text-xs font-semibold uppercase tracking-[0.25em] text-stone-500"
                  htmlFor="currency"
                >
                  Currency
                </Label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="currency"
                        className="w-full h-10"
                        size="lg"
                      >
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((code) => (
                          <SelectItem
                            key={code}
                            className="min-h-10 py-2.5"
                            value={code}
                          >
                            {code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="order-2 space-y-5">
            <Label className="block text-xs font-semibold uppercase tracking-[0.25em] mb-3 text-stone-500">
              Images
            </Label>
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex min-h-72 cursor-pointer flex-col justify-center gap-4 rounded-lg border-2 border-dashed p-4 text-center outline-none transition-colors ${
                dragActive
                  ? "border-stone-900 bg-stone-50 text-stone-900"
                  : "border-stone-300 text-stone-500"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => addImages(e.target.files)}
                className="hidden"
              />

              {imageEntries.length > 0 ? (
                <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
                  {imageEntries.map((entry, index) => (
                    <div
                      key={`${entry.file.name}-${index}`}
                      className="relative group overflow-hidden rounded-lg border border-input"
                    >
                      <img
                        src={entry.previewUrl}
                        alt={entry.file.name}
                        className="h-36 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="absolute top-1.5 right-1.5 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
                        aria-label={`Remove ${entry.file.name}`}
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <UploadCloud className="mx-auto size-10" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Drop up to {MAX_IMAGES} images here
                    </p>
                    <p className="text-sm">
                      or click to choose files from your device.
                    </p>
                  </div>
                </>
              )}

              <p className="text-xs uppercase tracking-[0.25em]">
                {imageEntries.length}/{MAX_IMAGES} selected
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="order-3 w-full lg:col-start-1"
          >
            {isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </section>
    </main>
  );
}
