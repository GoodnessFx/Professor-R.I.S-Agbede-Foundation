type Props = { className?: string };

export function Logo({ className = "w-10 h-10" }: Props) {
  return (
    <img 
      src="/images/Professor logo.png" 
      alt="Professor R.I.S Agbede Foundation Logo" 
      className={`${className} object-contain`}
    />
  );
}
