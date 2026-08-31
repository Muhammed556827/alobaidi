"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type FormState = {
  business_name: string;
  phone: string;
  email: string;
  hours: string;
  instagram: string;
  facebook: string;
  description: string;
  about_title: string;
  about_description: string;
  about_image: string;
  footer_description: string;
};

type EditableKey = Exclude<keyof FormState, "about_image">;

const defaults: FormState = {
  business_name: "Alobaidi Group Painting",
  phone: "",
  email: "",
  hours: "",
  instagram: "",
  facebook: "",
  description: "",
  about_title: "About Alobaidi Group Painting",
  about_description:
    "Alobaidi Group Painting provides professional residential and commercial painting services built on quality craftsmanship, attention to detail, and customer satisfaction.",
  about_image: "",
  footer_description:
    "Premium residential and commercial painting services built with craftsmanship, quality materials, and attention to every detail.",
};

export default function SettingsAdmin() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(defaults);

  useEffect(() => {
    async function loadSettings() {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !data) return;

      setForm((current) => ({
        ...current,
        ...Object.fromEntries(
          Object.keys(current).map((key) => {
            const typedKey = key as keyof FormState;
            return [typedKey, data[typedKey] ?? current[typedKey]];
          }),
        ),
      } as FormState));
    }

    loadSettings();
  }, []);

  async function uploadImage() {
    if (!imageFile) {
      alert("Please choose an image first");
      return;
    }

    try {
      setUploading(true);
      const fileName = `about-${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("website-images")
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("website-images")
        .getPublicUrl(fileName);

      setForm((prev) => ({ ...prev, about_image: data.publicUrl }));
      setImageFile(null);
      alert("Image uploaded!");
    } catch (error: unknown) {
      console.log(error);
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function saveSettings() {
    try {
      setSaving(true);
      const { error } = await supabase.from("settings").insert(form);
      if (error) throw error;
      alert("Settings Saved!");
    } catch (error: unknown) {
      console.log(error);
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  function update(key: EditableKey, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const fieldKeys = (Object.keys(form) as Array<keyof FormState>).filter(
    (key): key is EditableKey => key !== "about_image",
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
      <h1 className="text-3xl font-bold text-[#071D49] sm:text-4xl">Business Settings</h1>
      <p className="mt-3 max-w-2xl text-gray-500">
        Manage company information, contact details, footer copy, and the About section from one place. Phone becomes tap-to-call, and email opens a Gmail compose window automatically on the public Contact section and footer.
      </p>

      <div className="mt-8 max-w-3xl rounded-3xl bg-white p-5 shadow sm:mt-10 sm:p-8">
        <h2 className="text-xl font-bold text-[#071D49]">Business Information</h2>

        <label className="mt-6 mb-2 block font-semibold text-[#071D49]">About Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full rounded-xl border p-3"
        />
        <button
          type="button"
          onClick={uploadImage}
          disabled={uploading}
          className="mt-4 rounded-xl bg-[#071D49] px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        {form.about_image && (
          <img
            src={form.about_image}
            alt="About section preview"
            className="mt-6 h-56 w-full rounded-2xl object-cover sm:h-72"
          />
        )}

        {fieldKeys.map((key) => (
          <div key={key}>
            <label className="mt-5 mb-2 block font-semibold capitalize text-[#071D49]">
              {key.replaceAll("_", " ")}
            </label>
            {key.includes("description") ? (
              <textarea
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                rows={5}
                className="w-full rounded-xl border p-4 outline-none focus:border-[#1E5EFF]"
              />
            ) : (
              <input
                type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                placeholder={
                  key === "phone"
                    ? "+1 902 555 0123"
                    : key === "email"
                      ? "hello@example.com"
                      : undefined
                }
                className="w-full rounded-xl border p-4 outline-none focus:border-[#1E5EFF]"
              />
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={saveSettings}
          disabled={saving}
          className="mt-8 w-full rounded-xl bg-[#1E5EFF] px-8 py-4 font-semibold text-white transition hover:bg-[#C9A227] disabled:opacity-60 sm:w-auto"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
