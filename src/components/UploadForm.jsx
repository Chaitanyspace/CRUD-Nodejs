// src/components/UploadForm.jsx
import React, { useState } from "react";
import api from "../api/api";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  async function handleUpload() {
    if (!file) return;
    setMessage("Generating presigned URL...");

    // Request presigned URL from backend
    const res = await api.apiFetch(`/api/upload/presign?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type || 'application/octet-stream')}`);
    if (!res || !res.url) {
      setMessage("Failed to get presigned URL");
      return;
    }

    const url = res.url;
    const key = res.key;

    setMessage("Uploading to S3...");

    // IMPORTANT: these headers MUST match what the backend used when generating the presigned URL.
    const headers = {
      "Content-Type": file.type || "application/octet-stream",
    };

    // If you use KMS server-side encryption, include these headers exactly:
    // Make sure REACT_APP_KMS_KEY_ID is set in the frontend environment (or replace with literal ARN)
    const kmsArn = process.env.REACT_APP_KMS_KEY_ID || "";
    if (kmsArn) {
      headers["x-amz-server-side-encryption"] = "aws:kms";
      headers["x-amz-server-side-encryption-aws-kms-key-id"] = kmsArn;
    }

    // Do the PUT to the presigned URL
    const putRes = await fetch(url, { method: "PUT", headers, body: file });

    if (!putRes.ok) {
      // Read text (may be XML error from S3) and show to user
      const text = await putRes.text().catch(() => "");
      setMessage(`Upload failed: ${putRes.status} ${putRes.statusText} ${text}`);
      return;
    }

    // Persist metadata to backend (optional)
    const completeRes = await api.apiFetch("/api/uploads/complete", {
      method: "POST",
      body: JSON.stringify({ key, fileName: file.name, s3Url: url }),
    });

    if (completeRes && completeRes.ok) {
      setMessage("✅ Upload complete!");
    } else {
      setMessage("Upload succeeded but failed to save metadata.");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload a File</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2 mb-4"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Upload
      </button>
      {message && <p className="mt-4 text-gray-700 whitespace-pre-wrap">{message}</p>}
    </div>
  );
}
