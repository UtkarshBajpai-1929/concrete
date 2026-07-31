const EmptyState = () => {
  return (
    <div className="flex min-h-[420px] items-center justify-center rounded-xl p-8 text-center">
      <div className="max-w-md">
        <p className="text-xl font-bold" style={{ color: "var(--text)" }}>
          No optimization has been performed.
        </p>
        <p className="mt-3 leading-7" style={{ color: "var(--text-2)" }}>
          When optimization finishes, the best candidate mixes will appear here.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
