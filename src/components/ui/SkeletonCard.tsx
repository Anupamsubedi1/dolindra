export function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-2xl bg-surface p-6 shadow-sm animate-pulse">
      <div className="h-4 w-20 rounded-full bg-gray-200" />
      <div className="h-5 w-full rounded bg-gray-200" />
      <div className="h-4 w-3/4 rounded bg-gray-200" />
      <div className="mt-4 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-gray-100" />
        <div className="h-5 w-16 rounded-full bg-gray-100" />
      </div>
    </div>
  )
}