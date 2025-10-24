
import React, { useState, useCallback } from 'react';
import type { ComicPanelData } from './types';
import { generateComicImages } from './services/geminiService';
import Header from './components/Header';
import ComicPanel from './components/ComicPanel';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';

const comicContent = {
  captions: [
    "Der Leitfaden! Er hat gerade Hochkonjunktur...",
    "Er kann gepostet, gedruckt, abgelegt werden... fast wichtiger als sein Inhalt.",
    "Ein Leitfaden kann selbst wieder ein Leitfaden für einen Leitfaden sein.",
    "Alles beginnt und endet mit dem Leitfaden. Das würde die ANT unterschreiben.",
  ],
  imagePrompts: [
    "Simple black and white line art comic panel style. In a modern office meeting room, a person enthusiastically holds up a document with a glowing halo. The document has the word 'LEITFADEN' on the cover. Other people at the table look impressed.",
    "Simple black and white line art comic panel style, showing a montage of three small scenes. A document being uploaded to a cloud icon, a document sitting on a printer, and the same document under a coffee mug on a messy desk.",
    "Simple black and white line art comic panel style. A person sits at a desk, looking stressed, writing a new document. The title on the document is 'Leitfaden für Leitfäden'. A spiral emanates from the document, creating a sense of an endless loop.",
    "Simple black and white line art comic panel style. A single document with the word 'LEITFADEN' on it sits on a grand throne in an empty hall. Laptops, books, and phones are on the floor, bowing towards the glowing document."
  ]
};

const App: React.FC = () => {
  const [comicPanels, setComicPanels] = useState<ComicPanelData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateComic = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setComicPanels([]);

    try {
      const imageUrls = await generateComicImages(comicContent.imagePrompts);
      const newPanels = imageUrls.map((url, index) => ({
        imageUrl: url,
        caption: comicContent.captions[index],
      }));
      setComicPanels(newPanels);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'Ein unbekannter Fehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          <button
            onClick={handleGenerateComic}
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? 'Generiere...' : 'Comic generieren'}
          </button>
        </div>

        <div className="mt-8">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorDisplay message={error} />}
          {comicPanels.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {comicPanels.map((panel, index) => (
                <ComicPanel key={index} panel={panel} index={index} />
              ))}
            </div>
          )}
           {!isLoading && comicPanels.length === 0 && !error && (
            <div className="text-center text-gray-500 mt-16">
                <p className="text-2xl">Klicken Sie auf den Button, um die Comic-Saga des Leitfadens zu starten.</p>
            </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default App;
