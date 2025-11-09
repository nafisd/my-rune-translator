import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import './App.css';

export default function TranslatorApp() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

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
    </div>
  );
}