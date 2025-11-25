const CopiedNotification = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] animate-bounce">
      <div className="neo-box bg-[#4ECDC4] px-12 py-8">
        <div className="text-5xl font-black text-center mb-2">✓</div>
        <div className="text-3xl font-black text-center">COPIED!</div>
      </div>
    </div>
  );
};

export default CopiedNotification;
