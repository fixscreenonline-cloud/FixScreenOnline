import { AdminProviders } from "@/components/admin/admin-query-provider";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getAuthenticatedAdmin } from "@/lib/auth/guards";
import { redirect } from "next/navigation";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <AdminProviders>
      <div className="min-h-screen bg-muted/20 lg:bg-background">
        <AdminSidebar email={admin.email} />
        <div className="lg:pl-64">
          <div className="mx-auto max-w-7xl px-3 pb-[calc(4.5rem+env(safe-area-inset-bottom))] pt-[calc(3.5rem+0.75rem)] lg:px-8 lg:pb-8 lg:pt-8">
            {children}
          </div>
        </div>
      </div>
    </AdminProviders>
  );
}
