type Props = { className?: string };

export function Logo({ className = "w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32" }: Props) {
  return (
    <img
      src="/images/Professor logo.png"
      alt="Professor R.I.S Agbede Foundation Logo"
      loading="eager"
      decoding="async"
      draggable={false}
      className={`${className} object-contain shrink-0`}
    />
  );
}
