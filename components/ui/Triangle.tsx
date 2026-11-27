/** A simple right-triangle mark: the area under a straight line. Drawn for this demo. */
export default function Triangle({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M1 15 L15 15 L15 1 Z" fill="currentColor" />
    </svg>
  );
}
