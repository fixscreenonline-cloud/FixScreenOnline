import { ChangePasswordForm } from "@/components/admin/change-password-form";
import { AdminHeader } from "@/components/admin/admin-sidebar";

export default function AdminSettingsPage() {
  return (
    <>
      <AdminHeader title="Settings" />
      <ChangePasswordForm />
    </>
  );
}
