// AddMemberDynamic.jsx
import React from "react";
import { useParams } from "react-router-dom";
import AddMember from "../../pages/Admin/Member/AddMember";

const roleMap = {
  member: "Member",
  trainer: "Trainer",
  accountant: "Accountant",
  hr: "HR Manager",
  lead: "Lead",
  manager: "Manager",
  receptionist: "Receptionist",
};

const AddMemberDynamic = () => {
  const params = useParams();
  console.log("All params:", params);
  console.log(params.memberType);
  const roleKey = params.memberType;

  const role = roleMap[roleKey];
  console.log(role);

  if (!role) {
    return <div>Invalid Role</div>;
  }

  return <AddMember role={role} />;
};

export default AddMemberDynamic;
