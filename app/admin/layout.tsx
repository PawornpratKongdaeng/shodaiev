import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("admin_auth")?.value;

  // ยังไม่ได้ login → ส่งไปหน้า /admin/login
  if (!token) {
    redirect("/admin/login");
  } {
  return (
    <html lang="th" data-theme="light">
      <body className="bg-base-200">
      <div data-theme="light">
        <div className="flex min-h-screen">
          <main className="flex-1 p-6">{children}</main>
        </div>
    </div>
      </body>
    </html>
  );
}
}
