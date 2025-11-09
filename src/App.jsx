import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import './index.css';

export default function TranslatorApp() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fontError, setFontError] = useState(false);

  // Check if font is loaded
  React.useEffect(() => {
    document.fonts.ready.then(() => {
      const isLoaded = document.fonts.check('16px AncientNovianSota');
      setFontLoaded(isLoaded);
      if (!isLoaded) {
        setFontError(true);
      }
    });
  }, []);


  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div
      className="min-h-screen p-4 relative"
      style={{
        background: 'linear-gradient(to bottom, rgba(26, 26, 46, 0.70), rgba(15, 23, 42, 0.80))',
      }}>
      <div
        className="absolute top-0 left-0 right-0 h-96 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: 'url(/image/Background1.png)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
        }}
      ></div>
      <div className="max-w-6xl mx-auto py-8 relative">
        {/* Header */}
        <div className="text-center mb-8 drop-shadow-lg">
          <img className="mx-auto mb-4 w-32 h-32" src="/image/Logo YT.png" alt="Logo 1" />
          <img className="mx-auto mb-4 h-32" src="/image/Logo Stella Sora.png" alt="Logo 2" />
          <h1 className="text-6xl font-bold text-[#C6E1EE] mb-3 tracking-wide">
            Nova Translator
          </h1>
          <p className="text-[#D098A8] text-lg">
            Transform your words into nova letter
          </p>
        </div>

        {/* Main Translation Card */}
        <div
          className="backdrop-blur-md rounded-2xl shadow-2xl border overflow-hidden"
          style={{
            backgroundColor: '#424969', // #424969 with transparency
            borderColor: '#C6E1EE33',
            boxShadow: '0 0 25px rgba(93,135,174,0.3)',
          }}
        >
          {/* English Input */}
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

          {/* Rune Output */}
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
              {text || (
                <span className="text-[#C6E1EE66] text-lg font-sans"></span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
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

      </div>
    </div>
  );
}