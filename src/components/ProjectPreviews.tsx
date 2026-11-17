import React, { useMemo } from 'react';
import { ProjectItem } from '../data/portfolio';

const EV_BANNER_PALETTES = [
  {
    bg: 'from-[#064E3B] via-[#0F766E] to-[#115E59]',
    accent: 'text-emerald-300',
    glow: 'bg-emerald-400/20',
  },
  {
    bg: 'from-[#1E1B4B] via-[#312E81] to-[#1E3A8A]',
    accent: 'text-sky-300',
    glow: 'bg-sky-400/20',
  },
  {
    bg: 'from-[#18181B] via-[#27272A] to-[#14532D]',
    accent: 'text-lime-300',
    glow: 'bg-lime-400/20',
  },
];

export const ProjectPreviewGraphic: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const randomPalette = useMemo(
    () => EV_BANNER_PALETTES[Math.floor(Math.random() * EV_BANNER_PALETTES.length)],
    []
  );

  switch (project.walkthroughType) {
    case 'phishguard-preview':
      return (
        <div className="relative flex h-48 w-full items-end justify-end overflow-hidden rounded-lg bg-gradient-to-br from-[#A3E635] via-[#4ADE80] to-[#0D9488] p-4 pb-0 pr-0">
          <div className="h-[88%] w-[92%] overflow-hidden rounded-tl-lg border-l border-t border-black/15 bg-[#FAFAFA] text-[#171717] shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-2 text-[10px]">
              <span className="font-semibold tracking-tight">PhishGuard</span>
              <span className="rounded bg-black px-2 py-0.5 font-mono text-[9px] text-white">
                URL Analyzer
              </span>
            </div>
            <div className="px-5 pt-5 text-center">
              <p className="text-base font-semibold leading-tight tracking-tight">
                Inspect suspicious links
                <br />
                with AI explanations.
              </p>
              <div className="mx-auto mt-3 flex max-w-[230px] items-center justify-between rounded border border-black/15 bg-white px-2.5 py-1.5 font-mono text-[9px] text-neutral-500">
                <span className="truncate">https://suspicious-link.test</span>
                <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[8px] text-white">
                  Scan
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'cipherx-walkthrough':
      return (
        <div className="relative flex h-48 w-full items-end justify-end overflow-hidden rounded-lg bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#4F46E5] p-4 pb-0 pr-0">
          <div className="h-[88%] w-[92%] overflow-hidden rounded-tl-lg border-l border-t border-black/15 bg-[#FAFAFA] text-[#171717] shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-2 text-[10px]">
              <span className="font-semibold">CipherX</span>
              <span className="font-mono text-[9px] text-neutral-500">Ollama · Local</span>
            </div>
            <div className="px-5 pt-4 text-center">
              <p className="text-base font-semibold leading-tight tracking-tight">
                Local voice commands
                <br />
                &amp; desktop automation.
              </p>
              <div className="mt-3 flex items-center justify-center gap-1">
                {[10, 20, 28, 16, 24, 12, 20, 10].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-1 rounded-full bg-blue-600/80"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'pdf-rag-walkthrough':
      return (
        <div className="relative flex h-48 w-full items-end justify-end overflow-hidden rounded-lg bg-gradient-to-br from-[#FB923C] via-[#F97316] to-[#EA580C] p-4 pb-0 pr-0">
          <div className="h-[88%] w-[92%] overflow-hidden rounded-tl-lg border-l border-t border-black/15 bg-[#FAFAFA] text-[#171717] shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-2 text-[10px]">
              <span className="font-semibold">PDF Chat</span>
              <span className="font-mono text-[9px] text-orange-600">RAG Pipeline</span>
            </div>
            <div className="px-5 pt-4">
              <p className="text-base font-semibold leading-tight tracking-tight">
                Ask your PDFs.
                <br />
                <span className="text-orange-600">Retrieve locally.</span>
              </p>
              <div className="mt-3 grid grid-cols-3 gap-1.5 font-mono text-[8.5px]">
                <div className="rounded border border-black/10 bg-neutral-100 p-1.5 text-center">
                  Chunking
                </div>
                <div className="rounded border border-orange-500/40 bg-orange-50 p-1.5 text-center text-orange-700">
                  FAISS Index
                </div>
                <div className="rounded border border-black/10 bg-neutral-100 p-1.5 text-center">
                  Ollama QA
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'python-viz-walkthrough':
      return (
        <div className="relative flex h-48 w-full items-end justify-end overflow-hidden rounded-lg bg-gradient-to-br from-[#38BDF8] via-[#60A5FA] to-[#A78BFA] p-4 pb-0 pr-0">
          <div className="h-[88%] w-[92%] overflow-hidden rounded-tl-lg border-l border-t border-black/15 bg-[#111216] text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-[10px]">
              <span className="font-mono font-medium">Execution Visualizer</span>
              <span className="font-mono text-[9px] text-sky-400">Python</span>
            </div>
            <div className="space-y-1.5 p-4 font-mono text-[10px]">
              <div className="text-neutral-400">01 nums = [2, 4, 6]</div>
              <div className="rounded bg-sky-500/20 px-2 py-1 text-sky-300">
                &gt; 02 for n in nums: total += n
              </div>
              <div className="text-neutral-400">03 print(total)</div>
            </div>
          </div>
        </div>
      );

    case 'ev-parking-overview':
    default:
      return (
        <div
          className={`relative flex h-44 w-full items-center justify-between overflow-hidden rounded-lg bg-gradient-to-br ${randomPalette.bg} p-6 text-white`}
        >
          <div
            aria-hidden="true"
            className={`absolute -right-8 -top-8 h-40 w-40 rounded-full blur-2xl ${randomPalette.glow}`}
          />
          <div className="relative z-10 max-w-md">
            <span className={`font-mono text-[10px] uppercase tracking-widest ${randomPalette.accent}`}>
              COEP Project Competition
            </span>
            <h3 className="mt-1.5 font-serif text-3xl tracking-tight">EV Parking System</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-white/80">
              Student competition project presented and demonstrated at the COEP Project Competition.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="relative z-10 hidden grid-cols-2 gap-2 opacity-80 sm:grid"
          >
            {['BAY 01', 'BAY 02', 'BAY 03', 'EV'].map((slot) => (
              <div
                key={slot}
                className="flex h-12 w-16 items-center justify-center rounded border border-white/25 bg-black/25 font-mono text-[10px] tracking-wider"
              >
                {slot}
              </div>
            ))}
          </div>
        </div>
      );
  }
};
