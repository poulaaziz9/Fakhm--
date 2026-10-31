import { site, whatsappLink } from "@/lib/config";

export function WhatsAppButton() {
  if (!site.whatsapp) return null;
  return (
    <a
      href={whatsappLink("مرحباً فَخْم")}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصل معانا على واتساب"
      className="group fixed bottom-5 start-5 z-50 grid size-14 place-items-center rounded-full border border-gold/60 bg-night/90 text-gold shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur transition-all duration-500 hover:scale-110 hover:bg-gold hover:text-night"
    >
      <span className="absolute inset-0 animate-ping rounded-full border border-gold/40 [animation-duration:3s]" aria-hidden />
      <svg viewBox="0 0 32 32" className="size-7" fill="currentColor" aria-hidden>
        <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.2.6 4.4 1.7 6.3L3 29l7.3-1.9c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.2c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.3 1.1 1.2-4.2-.3-.4a10.4 10.4 0 01-1.6-5.5C5.3 9.9 10.1 5.2 16 5.2s10.6 4.7 10.6 10.5S21.9 26.2 16 26.2zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.6 8.6 0 01-4.3-3.7c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.1-1.2 2.7 1.2 3.1 1.4 3.3 2.3 3.6 5.7 5c2.1.9 2.9 1 4 .8.6-.1 1.9-.8 2.2-1.5s.3-1.4.2-1.5-.3-.2-.6-.4z" />
      </svg>
    </a>
  );
}
