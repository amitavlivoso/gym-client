import { useParams, Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../Admin/shared/AdminLayout";

const allowedLayouts = {
  admin: AdminLayout,
  receptionist: AdminLayout,
  trainer: AdminLayout,
  member: AdminLayout,
};

const RoleLayout = () => {
  const { role } = useParams();
  const roleKey = role?.toLowerCase();

  const LayoutComponent = allowedLayouts[roleKey];
  if (!LayoutComponent) {
    return <Navigate to="/login" replace />;
  }

  return (
    <LayoutComponent>
      <Outlet />
    </LayoutComponent>
  );
};

export default RoleLayout;
