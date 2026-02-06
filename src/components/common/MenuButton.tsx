interface MenuButtonProps {
  onClick: () => void;
}

export default function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed left-0 top-0 z-110 w-16 h-16 flex items-center justify-center cursor-pointer select-none outline-none focus:outline-none group"
      aria-label="메뉴 토글"
    >
      <div className="space-y-1.5 pointer-events-none">
        <span className="block h-0.5 w-5 bg-slate-600 transition-transform duration-500"></span>
        <span className="block h-0.5 w-5 bg-slate-600 transition-transform duration-500"></span>
        <span className="block h-0.5 w-5 bg-slate-600 transition-transform duration-500"></span>
      </div>
    </button>
  );
}
