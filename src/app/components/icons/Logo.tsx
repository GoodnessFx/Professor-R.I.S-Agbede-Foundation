type Props = { className?: string };

export function Logo({ className = "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28" }: Props) {
  return (
    <img 
      src="/images/Professor logo.png" 
      alt="Professor R.I.S Agbede Foundation Logo" 
      className={`${className} object-contain shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]`}
    />
  );
}
