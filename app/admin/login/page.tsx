"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "เข้าสู่ระบบไม่สำเร็จ");
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-200 shadow-sm mb-3">
            <span className="text-2xl">🔐</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            ShodaiEV Admin
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            เข้าสู่ระบบเพื่อจัดการเว็บไซต์
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur rounded-2xl border border-orange-100 shadow-sm p-6 sm:p-7 space-y-4"
        >
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">
              ชื่อผู้ใช้ 
            </label>
            <input
              type="text"
              autoComplete="username"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">
              รหัสผ่าน
            </label>
            <input
              type="password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(to right, #dc2626, #f97316)",
            }}
          >
            {submitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
      </div>
    </main>
  );
}
