import { AdminHeader } from "@/components/admin/admin-sidebar";
import { DashboardStats } from "@/components/admin/dashboard-stats";

export default function AdminDashboardPage() {
  return (
    <>
      <AdminHeader title="Dashboard" />
      <DashboardStats />
    </>
  );
}
