import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import './index.css';

export default function TranslatorApp() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fontError, setFontError] = useState(false);

  React.useEffect(() => {
    document.fonts.ready.then(() => {
      const isLoaded = document.fonts.check('16px AncientNovianSota');
      setFontLoaded(isLoaded);
      if (!isLoaded) setFontError(true);
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => setText('');

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        background: 'linear-gradient(to bottom, rgba(26, 26, 46, 0.75), rgba(15, 23, 42, 0.9))',
        overflowX: 'hidden',
      }}
    >
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 right-0 h-96 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: 'url(/image/Background3.png)',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)',
        }}
      ></div>

      {/* Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 relative">
        <div className="text-center mb-8 drop-shadow-lg">
          <img className="mx-auto mb-4 w-32 h-32" src="/image/Logo YT.png" alt="Logo 1" />
          <img className="mx-auto mb-4 h-32" src="/image/Logo Stella Sora.png" alt="Logo 2" />
          <h1 className="text-6xl font-bold text-[#fefefe] mb-3 tracking-wide">
            Nova Translator
          </h1>
          <p className="text-[#D098A8] text-lg">Transform your words into nova letter</p>
        </div>

        <div
          className="backdrop-blur-md rounded-2xl shadow-2xl border overflow-hidden"
          style={{
            backgroundColor: '#424969',
            borderColor: '#C6E1EE33',
            boxShadow: '0 0 25px rgba(93,135,174,0.3)',
          }}
        >
          <div className="p-6 border-b border-[#C6E1EE33]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#FEFEFE]">English Text</h2>
              <span className="text-sm text-[#C6E1EE] bg-[#5D87AE80] px-3 py-1 rounded-full">
                {text.length} characters
              </span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-48 p-4 rounded-xl resize-none text-lg focus:outline-none"
              style={{
                backgroundColor: 'rgba(93, 135, 174, 0.25)',
                border: '2px solid #5D87AE80',
                color: '#FEFEFE',
              }}
            />
          </div>

          <div className="p-6 bg-[#5D87AE]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#FEFEFE]">
                Nova Runes Output
              </h2>
              {text && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: copied ? '#D098A8cc' : '#D098A8',
                    color: '#FEFEFE',
                    border: '1px solid #C6E1EE55',
                    boxShadow: '0 0 12px #D098A844',
                  }}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? 'Copied!' : 'Copy Runes'}
                </button>
              )}
            </div>
            <div
              className="w-full min-h-48 p-4 rounded-xl overflow-y-auto text-2xl rune-font leading-relaxed"
              style={{
                backgroundColor: 'rgba(66, 73, 105, 0.6)',
                border: '2px solid #C6E1EE33',
                color: '#C6E1EE',
              }}
            >
              {text || <span className="text-[#C6E1EE66] text-lg font-sans"></span>}
            </div>
          </div>

          <div
            className="p-6 border-t border-[#C6E1EE33]"
            style={{ backgroundColor: 'rgba(66, 73, 105, 0.8)' }}
          >
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105"
                style={{
                  backgroundColor: '#D098A8',
                  color: '#FEFEFE',
                  boxShadow: '0 0 10px #D098A855',
                }}
              >
                <RotateCcw size={20} />
                Clear All
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 🌙 Footer */}
      <footer
        className="w-full py-5 border-t border-[#5D87AE55] backdrop-blur-md mt-auto"
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          color: '#C6E1EEAA',
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 text-center md:text-left">
          <p className="mb-3 md:mb-0 text-sm tracking-wide text-[18px]">
            ✦ Built with <span className="text-[#D098A8]">Sora Spirit</span> ✦ <br className="md:hidden" />
            © <span className="text-[#C6E1EE]">2024 Yostar. All rights reserved.</span>
          </p>

          {/* SVG Socials */}
          <div className="flex items-center gap-5 text-[#C6E1EE]">
            <a
              href="https://www.youtube.com/@SlerraSota/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 hover:text-[#D098A8]"
              aria-label="YouTube"
            >
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 32 32">
                <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.4 2.5 12 2.5 12 2.5h-.1s-4.4 0-8.2.3c-.5.1-1.5.1-2.4 1C.7 4.5.5 6.2.5 6.2S0 8.3 0 10.4v3.3c0 2.1.5 4.2.5 4.2s.2 1.7.9 2.4c.9.9 2.1.9 2.7 1 2 .2 8.1.3 8.1.3s4.4 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.5-2.1.5-4.2v-3.3c0-2.1-.5-4.2-.5-4.2zM9.6 15.3v-6l6.4 3-6.4 3z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@slerrasota/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 hover:text-[#D098A8]"
              aria-label="TikTok"
            >
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 32 32">
                <path d="M12.75 2c.41 2.88 2.55 5.17 5.25 5.64v2.36c-1.34-.04-2.62-.43-3.75-1.13v7.09a6.5 6.5 0 1 1-6.5-6.5c.25 0 .5.02.75.05v2.48a3.77 3.77 0 1 0 2.5 3.57V2h1.75z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/slerra_sota/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 hover:text-[#D098A8]"
              aria-label="Instagram"
            >
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 32 32">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.4.4.6.2 1 .4 1.5.9.5.5.7.9.9 1.5.2.5.3 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.4-.2.6-.4 1-.9 1.5-.5.5-.9.7-1.5.9-.5.2-1.2.3-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1-.4-1.5-.9-.5-.5-.7-.9-.9-1.5-.2-.5-.3-1.2-.4-2.4-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.4.2-.6.4-1 .9-1.5.5-.5.9-.7 1.5-.9.5-.2 1.2-.3 2.4-.4 1.3-.1 1.7-.1 4.9-.1m0-2.2C8.7 0 8.3 0 7 0 5.6.1 4.6.2 3.8.4 2.9.6 2.2.9 1.5 1.6.9 2.2.6 2.9.4 3.8.2 4.6.1 5.6 0 7c0 1.3 0 1.7 0 5s0 3.6.1 4.9c.1 1.4.2 2.4.4 3.2.2.9.5 1.6 1.2 2.3.6.6 1.3 1 2.2 1.2.8.2 1.8.3 3.2.4 1.3.1 1.7.1 5 .1s3.6 0 4.9-.1c1.4-.1 2.4-.2 3.2-.4.9-.2 1.6-.5 2.3-1.2.6-.6 1-1.3 1.2-2.2.2-.8.3-1.8.4-3.2.1-1.3.1-1.7.1-5s0-3.6-.1-4.9c-.1-1.4-.2-2.4-.4-3.2-.2-.9-.5-1.6-1.2-2.3-.6-.6-1.3-1-2.2-1.2C19.4.2 18.4.1 17 .1 15.7 0 15.3 0 12 0z" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="18.5" cy="5.5" r="1.5" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
