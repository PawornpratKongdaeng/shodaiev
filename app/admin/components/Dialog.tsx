"use client";

import React from "react";

interface AdminDialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function Dialog({
  open,
  title,
  children,
  confirmText = "บันทึก",
  onClose,
  onConfirm,
}: AdminDialogProps) {
  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4">{title}</h3>

        <div className="py-2 space-y-4">{children}</div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            ยกเลิก
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
}
