import React from "react";
import { Plus, LogIn, Home, FileText, LogOut, BookOpen, PenTool, MessageCircle} from "lucide-react";

const iconMap = {
  Home,
  Plus,
  LogIn,
  FileText,
  LogOut,
  BookOpen,
  PenTool,
  MessageCircle
};

function Icon({ icon, className, style}) {
  const LucideIcon = iconMap[icon];
  if(icon == "BookOpen" || icon == "PenTool" || icon == "MessageCircle"){
    return LucideIcon ? <LucideIcon size={30} style={style} className={className}/> : null
  }
  return LucideIcon ? <LucideIcon size={18} className={className}/> : null;
}

export default Icon