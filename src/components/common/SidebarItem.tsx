import Link from "next/link";

interface SidebarItemProps {
  href: string;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export default function SidebarItem({ href, label, onClick, isActive }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`block p-3 text-sm font-medium transition-colors ${
        isActive ? "bg-black text-white rounded-lg" : "text-gray-600 hover:bg-gray-200 rounded-lg"
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
