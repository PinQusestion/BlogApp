import React from "react";
import { Plus, LogIn, Home, FileText, LogOut, CodeSquare } from "lucide-react";

const iconMap = {
  Home,
  Plus,
  LogIn,
  FileText,
  LogOut,
};

function Icon({ icon, className }) {
  const LucideIcon = iconMap[icon];
  return LucideIcon ? <LucideIcon size={18} className={className}/> : null;
}

export default Icon