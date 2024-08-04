export const Loading = () => {
  return (
    <div className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm grid place-items-center">
      <div className="bg-black/30 rounded-2xl p-5 flex flex-col items-center justify-center">
        <div className="loader"></div>
        <h1 className="text-xl font-bold tracking-wide text-white animate-pulse mt-4">
          Loading
        </h1>
      </div>
      <style>{`
        .loader {
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid #fff;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
