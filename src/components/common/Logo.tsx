// 로고 컴포넌트
"use client";

export default function Logo() {
  const handleReset = () => {
    window.dispatchEvent(new CustomEvent("reset-editor"));
  };

  return (
    <button onClick={handleReset} className="focus:outline-none cursor-pointer" type="button">
      <h1 className="text-xl font-black tracking-tighter ml-2">
        Ready<span className="text-orange-500">,</span> Done<span className="text-blue-600">.</span>
      </h1>
    </button>
  );
}
