import { AdminHeader } from "@/components/admin/admin-sidebar";
import { BookingsTable } from "@/components/admin/bookings-table";

export default function AdminBookingsPage() {
  return (
    <>
      <AdminHeader title="Customer Bookings" />
      <BookingsTable />
    </>
  );
}
