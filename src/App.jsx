import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-3 tracking-wide">
            Ancient Novian Sota
          </h1>
          <p className="text-indigo-200 text-lg">
            Transform your words into ancient runes
          </p>
        </div>

        {/* Main Translation Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-indigo-500/30 overflow-hidden">
          
          {/* Font Status Alert */}
          {fontError && (
            <div className="p-4 bg-yellow-900/30 border-b border-yellow-500/30">
              <p className="text-yellow-300 text-sm">
                ⚠️ Font not loaded. Make sure <code className="bg-yellow-950/50 px-2 py-1 rounded">ancient-novian-sota.ttf</code> is in <code className="bg-yellow-950/50 px-2 py-1 rounded">public/fonts/</code>
              </p>
            </div>
          )}
          
          {fontLoaded && (
            <div className="p-4 bg-green-900/30 border-b border-green-500/30">
              <p className="text-green-300 text-sm">
                ✅ Ancient Novian Sota font loaded successfully!
              </p>
            </div>
          )}

          {/* English Input Section */}
          <div className="p-6 border-b border-indigo-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-indigo-300 flex items-center gap-2">
                <span className="text-2xl">✍️</span>
                English Text
              </h3>
              <span className="text-sm text-indigo-400 bg-indigo-950/50 px-3 py-1 rounded-full">
                {text.length} characters
              </span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-48 p-4 bg-slate-900/50 border-2 border-indigo-500/30 rounded-xl 
                focus:border-indigo-500 focus:outline-none resize-none text-lg text-white
                placeholder-indigo-300/30 transition-all"
            />
          </div>

          {/* Rune Output Section */}
          <div className="p-6 bg-gradient-to-br from-slate-900/50 to-indigo-950/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-indigo-300 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Ancient Novian Runes
              </h3>
              {text && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 
                    text-indigo-300 hover:bg-indigo-600/30 rounded-lg transition-all border border-indigo-500/30
                    hover:scale-105"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? 'Copied!' : 'Copy Runes'}
                </button>
              )}
            </div>
            <div
              className="w-full min-h-48 p-4 bg-slate-950/50 border-2 border-indigo-500/30 rounded-xl 
                overflow-y-auto text-2xl text-indigo-100 rune-font leading-relaxed"
            >
              {text || (
                <span className="text-indigo-300/30 text-lg font-sans">
                  Your runes will appear here magically...
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-slate-900/30 border-t border-indigo-500/20">
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 text-indigo-300 
                  rounded-xl hover:bg-slate-700 transition-all border border-indigo-500/30"
              >
                <RotateCcw size={20} />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {/* How to Use */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-5 hover:border-indigo-500/40 transition-colors">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-semibold text-indigo-300 mb-3 text-lg">
              How to Use
            </h3>
            <ul className="text-sm text-indigo-200 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span>Type any English text in the input box</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span>Watch it transform into runes instantly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span>Copy and use your runes anywhere</span>
              </li>
            </ul>
          </div>

          {/* Font Info */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-5 hover:border-indigo-500/40 transition-colors">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold text-indigo-300 mb-3 text-lg">
              Font Details
            </h3>
            <ul className="text-sm text-indigo-200 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span><strong>Name:</strong> Ancient Novian Sota</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span><strong>Version:</strong> 001.001</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span>Supports: A-Z, a-z, 0-9, punctuation</span>
              </li>
            </ul>
          </div>

          {/* Setup */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-5 hover:border-indigo-500/40 transition-colors">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="font-semibold text-indigo-300 mb-3 text-lg">
              Setup Guide
            </h3>
            <ul className="text-sm text-indigo-200 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span>Place font in <code className="bg-slate-900/50 px-1.5 py-0.5 rounded text-indigo-300">public/fonts/</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span>Name it: <code className="bg-slate-900/50 px-1.5 py-0.5 rounded text-indigo-300">ancient-novian-sota.ttf</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span>Deploy to Vercel or Netlify</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Example Text */}
        <div className="mt-6 bg-indigo-950/20 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6">
          <h3 className="font-semibold text-indigo-300 mb-3 text-lg">
            ✨ Try These Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "The quick brown fox jumps over the lazy dog",
              "Welcome to Ancient Novian",
              "May the runes guide you",
              "Strength and Honor"
            ].map((example, i) => (
              <button
                key={i}
                onClick={() => setText(example)}
                className="text-left p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg 
                  border border-indigo-500/20 hover:border-indigo-500/40 transition-all text-indigo-200 text-sm"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for Ancient Novian Sota font */}
      <style>{`
        @font-face {
          font-family: 'AncientNovianSota';
          src: url('/fonts/AncientNovianSota-Regular.ttf') format('truetype'),
               url('/fonts/AncientNovianSota-Regular.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        
        .rune-font {
          font-family: 'AncientNovianSota', serif !important;
          letter-spacing: 0.05em;
        }
        
        /* Custom scrollbar */
        textarea::-webkit-scrollbar,
        div::-webkit-scrollbar {
          width: 8px;
        }
        
        textarea::-webkit-scrollbar-track,
        div::-webkit-scrollbar-track {
          background: rgba(99, 102, 241, 0.1);
          border-radius: 4px;
        }
        
        textarea::-webkit-scrollbar-thumb,
        div::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.4);
          border-radius: 4px;
        }
        
        textarea::-webkit-scrollbar-thumb:hover,
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.6);
        }
      `}</style>
    </div>
  );
}