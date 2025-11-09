import React, { useState } from 'react';
import { ArrowRightLeft, Upload, Copy, Check } from 'lucide-react';

export default function TranslatorApp() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRuneToEnglish, setIsRuneToEnglish] = useState(false);

  // Character mapping - customize this with your game's rune mappings
  const characterMap = {
    // Lowercase letters
    'a': 'ᚨ', 'b': 'ᛒ', 'c': 'ᚲ', 'd': 'ᛞ', 'e': 'ᛖ',
    'f': 'ᚠ', 'g': 'ᚷ', 'h': 'ᚺ', 'i': 'ᛁ', 'j': 'ᛃ',
    'k': 'ᚲ', 'l': 'ᛚ', 'm': 'ᛗ', 'n': 'ᚾ', 'o': 'ᛟ',
    'p': 'ᛈ', 'q': 'ᛩ', 'r': 'ᚱ', 's': 'ᛋ', 't': 'ᛏ',
    'u': 'ᚢ', 'v': 'ᚡ', 'w': 'ᚹ', 'x': 'ᛪ', 'y': 'ᚤ', 'z': 'ᛉ',
    // Uppercase letters
    'A': 'ᚨ', 'B': 'ᛒ', 'C': 'ᚲ', 'D': 'ᛞ', 'E': 'ᛖ',
    'F': 'ᚠ', 'G': 'ᚷ', 'H': 'ᚺ', 'I': 'ᛁ', 'J': 'ᛃ',
    'K': 'ᚲ', 'L': 'ᛚ', 'M': 'ᛗ', 'N': 'ᚾ', 'O': 'ᛟ',
    'P': 'ᛈ', 'Q': 'ᛩ', 'R': 'ᚱ', 'S': 'ᛋ', 'T': 'ᛏ',
    'U': 'ᚢ', 'V': 'ᚡ', 'W': 'ᚹ', 'X': 'ᛪ', 'Y': 'ᚤ', 'Z': 'ᛉ',
    // Numbers
    '0': '᛭', '1': 'ᛮ', '2': 'ᛯ', '3': 'ᛰ', '4': '᛫', 
    '5': '᛬', '6': '᛭', '7': 'ᛮ', '8': 'ᛯ', '9': 'ᛰ',
  };

  // Create reverse mapping for rune to English
  const reverseMap = Object.fromEntries(
    Object.entries(characterMap).map(([key, val]) => [val, key])
  );

  // Handle custom font upload
  const handleFontUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const fontData = event.target.result;
      const fontName = 'CustomLanguageFont';
      
      // Create a new font face
      const newFont = new FontFace(fontName, `url(${fontData})`);
      
      newFont.load().then((loadedFace) => {
        document.fonts.add(loadedFace);
        setFontLoaded(true);
        
        // Apply the font to the output
        const style = document.createElement('style');
        style.textContent = `
          .custom-font {
            font-family: '${fontName}', sans-serif !important;
          }
        `;
        document.head.appendChild(style);
      }).catch((err) => {
        console.error('Font loading failed:', err);
        alert('Failed to load font. Please try again.');
      });
    };
    
    reader.readAsDataURL(file);
  };

  // Placeholder translation function - you'll need to implement your actual translation logic
  const handleTranslate = () => {
    if (!sourceText.trim()) {
      alert('Please enter text to translate');
      return;
    }
    
    // TODO: Replace this with your actual translation logic
    // For now, it just mirrors the input as a placeholder
    setTranslatedText(sourceText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    const temp = sourceText;
    setSourceText(translatedText);
    setTranslatedText(temp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Custom Language Translator
          </h1>
          <p className="text-gray-600">
            Translate to and from your custom language
          </p>
        </div>

        {/* Font Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Upload Custom Font
              </h2>
              <p className="text-sm text-gray-600">
                Upload your .ttf or .otf font file to display your language correctly
              </p>
            </div>
            <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors">
              <Upload size={20} />
              <span>{fontLoaded ? 'Font Loaded ✓' : 'Upload Font'}</span>
              <input
                type="file"
                accept=".ttf,.otf"
                onChange={handleFontUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Translation Interface */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Source Text */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  English
                </h3>
              </div>
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none resize-none text-lg"
              />
            </div>

            {/* Translated Text */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  Your Language
                </h3>
                {translatedText && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
              <textarea
                value={translatedText}
                readOnly
                placeholder="Translation will appear here..."
                className={`w-full h-64 p-4 border-2 border-gray-200 rounded-lg bg-gray-50 resize-none text-lg ${
                  fontLoaded ? 'custom-font' : ''
                }`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={handleTranslate}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Translate
            </button>
            <button
              onClick={handleSwap}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <ArrowRightLeft size={20} />
              Swap
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            Next Steps to Complete Your Translator:
          </h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Upload your custom font file (.ttf or .otf)</li>
            <li>Implement your translation logic in the <code className="bg-blue-100 px-1 rounded">handleTranslate</code> function</li>
            <li>You can add a translation API, dictionary mapping, or any custom logic</li>
            <li>Deploy to Vercel or Netlify by connecting your Git repository</li>
          </ul>
        </div>
      </div>
    </div>
  );
}