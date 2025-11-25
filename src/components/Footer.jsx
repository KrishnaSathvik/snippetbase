const Footer = () => {
  return (
    <footer className="bg-[#FAFAF5] border-t-4 md:border-t-8 border-black py-6 md:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 md:mb-6">
          <div>
            <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-3 text-black">⚡ SnippetBase</h3>
            <p className="font-bold text-sm md:text-base text-black">Your knowledge base for everything code. Find production-tested code snippets, quick reference cheat sheets.</p>
          </div>
        </div>
        <div className="text-center pt-4 md:pt-6 border-t-2 md:border-t-4 border-black font-bold text-xs md:text-base text-black">
          © 2025 SnippetBase. By data engineers, for data engineers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
