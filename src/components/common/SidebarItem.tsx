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
      className={`block p-3 text-sm font-bold transition-all duration-200 ${
        isActive
          ? /* 활성화 상태 */
            "bg-black text-white dark:bg-slate-100 dark:text-slate-950 rounded-lg shadow-sm"
          : /* 비활성화 상태 */
            "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg"
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
