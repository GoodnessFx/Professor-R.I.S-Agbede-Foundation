type Props = { className?: string };

export function Logo({ className = "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" }: Props) {
  return (
    <img
      src="/images/Professor logo.png"
      alt="Professor R.I.S Agbede Foundation Logo"
      loading="eager"
      decoding="async"
      draggable={false}
      className={`${className} object-contain shrink-0 rounded-full bg-white p-1 ring-1 ring-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.18)]`}
    />
  );
}
