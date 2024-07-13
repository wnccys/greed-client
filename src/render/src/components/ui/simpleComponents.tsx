interface SimpleButtonProps {
  count: number,
  onClick: () => void,
}

export function SimpleButton({count, onClick}: SimpleButtonProps) {
  return (
    <>
      <button 
        className="border border-slate-100 p-3 rounded"
        onClick={onClick}
      >
        Butao was clicked {count} times.
      </button>
    </>
  )
}