import React from "react";
import { Plus, LogIn, Home, FileText, LogOut } from "lucide-react";

const iconMap = {
  Home,
  Plus,
  LogIn,
  FileText,
  LogOut,
};

function Icon({ icon }) {
  const LucideIcon = iconMap[icon];
  return LucideIcon ? <LucideIcon size={18} className="hover:stroke-inherit"/> : null;
}

export default Icon