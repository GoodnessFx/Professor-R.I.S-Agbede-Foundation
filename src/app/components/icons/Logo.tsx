type Props = { className?: string };

export function Logo({ className = "w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" }: Props) {
  return (
    <img 
      src="/images/Professor logo.png" 
      alt="Professor R.I.S Agbede Foundation Logo" 
      className={`${className} object-contain shrink-0`}
    />
  );
}
