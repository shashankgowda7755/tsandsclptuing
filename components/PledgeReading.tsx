import React, { useState, useRef, useEffect, useCallback } from 'react';
import { UserData } from '../types';
import { ArrowRight, ShieldAlert, Play, BookOpen } from 'lucide-react';

interface PledgeReadingProps {
  userData: UserData;
  onBack: () => void;
  onConfirm: () => void;
}

// The pledge text to be read aloud (word by word)
// Breakdown of the pledge into individual points for the user to agree to
const PLEDGE_POINTS = [
  "I pledge to keep beaches clean and carry away all trash, ensuring that no plastic or debris enters the ocean to harm marine life.",
  "I pledge to avoid using single-use plastics, such as straws and bags, which are often mistaken for food by sea turtles.",
  "I pledge to maintain a respectful distance from nesting turtles and hatchlings, ensuring I do not disturb their natural journey to the sea.",
  "I pledge to turn off or shield bright lights near nesting beaches, as artificial light can disorient hatchlings and lead them away from the water.",
  "I pledge to never touch, handle, or interfere with turtle eggs or nests found in the wild.",
  "I pledge to support and promote sustainable seafood choices that use turtle-excluder devices (TEDs) to prevent accidental trapping in fishing nets.",
  "I pledge to educate others about the importance of sea turtles in maintaining healthy seagrass beds and coral reefs.",
  "I pledge to report any injured or stranded sea turtles to the local wildlife authorities or rescue centers immediately."
];

export const PledgeReading: React.FC<PledgeReadingProps> = ({ userData, onBack, onConfirm }) => {
  // Store checked state for each point by index
  const [checkedPoints, setCheckedPoints] = useState<number[]>([]);

  const togglePoint = (index: number) => {
    if (checkedPoints.includes(index)) {
      setCheckedPoints(checkedPoints.filter(i => i !== index));
    } else {
      setCheckedPoints([...checkedPoints, index]);
    }
  };

  const handleSelectAll = () => {
    if (checkedPoints.length === PLEDGE_POINTS.length) {
      setCheckedPoints([]);
    } else {
      setCheckedPoints(PLEDGE_POINTS.map((_, i) => i));
    }
  };

  const allChecked = checkedPoints.length === PLEDGE_POINTS.length;

  return (
    <div className="min-h-screen bg-canvas pt-20 pb-0 flex flex-col">
      {/* Top Bar */}
      <div className="px-4 mb-4 max-w-lg mx-auto w-full">
        <button onClick={onBack} className="text-subText hover:text-indiaNavy font-medium mb-4 block">
          ← Back to Preview
        </button>
        <h2 className="text-2xl font-display font-bold text-indiaNavy">Save a Turtle Initiative</h2>
        <p className="text-sm text-subText mt-1">Read and acknowledge each point to continue.</p>
      </div>

      {/* Content Card */}
      <div className="flex-1 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] overflow-hidden relative max-w-lg mx-auto w-full border border-stone-100 flex flex-col">

        {/* Header decoration */}
        <div className="h-2 w-full bg-gradient-to-r from-teal-400 via-blue-500 to-emerald-600" />

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 pb-40">

          {/* The Pledge Points */}
          <section className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-indiaNavy" />
                <h3 className="font-display font-bold text-lg text-indiaNavy">The Pledge</h3>
              </div>
              <button
                onClick={handleSelectAll}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wide"
              >
                {allChecked ? 'Unselect All' : 'Select All'}
              </button>
            </div>

            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-3">
              {PLEDGE_POINTS.map((point, index) => {
                const isChecked = checkedPoints.includes(index);
                return (
                  <div
                    key={index}
                    onClick={() => togglePoint(index)}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isChecked
                      ? 'bg-white border-orange-200 shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-stone-100'
                      }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${isChecked
                      ? 'bg-orange-500 border-orange-500'
                      : 'bg-white border-stone-300'
                      }`}>
                      {isChecked && <CheckIcon />}
                    </div>
                    <p className={`text-sm leading-relaxed ${isChecked ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>
                      {point}
                    </p>
                  </div>
                );
              })}
            </div>

          </section>
        </div>

        {/* Bottom Floating Action */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-stone-100 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-20">
          <button
            onClick={onConfirm}
            disabled={!allChecked}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${allChecked
              ? 'bg-gradient-to-r from-saffron to-[#f97316] text-white shadow-lg hover:-translate-y-1'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
          >
            Take the Pledge <ShieldAlert size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
