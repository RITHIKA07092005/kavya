export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      <a
        href="https://wa.me/910000000000"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="WhatsApp"
      >
        💬
      </a>
      <a
        href="mailto:hello@genoidtech.com"
        className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="Email us"
      >
        ✉️
      </a>
    </div>
  );
}
