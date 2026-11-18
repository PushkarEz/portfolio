import React, { useMemo, useState } from 'react';
import { ProjectItem } from '../data/portfolio';

const EV_STUDIO_PALETTES = [
  'from-[#34D399] via-[#10B981] to-[#0D9488]',
  'from-[#38BDF8] via-[#3B82F6] to-[#4F46E5]',
  'from-[#A78BFA] via-[#8B5CF6] to-[#6D28D9]',
];

export const ProjectPreviewGraphic: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const [bytexImgFailed, setBytexImgFailed] = useState(false);
  const [pyVizImgFailed, setPyVizImgFailed] = useState(false);

  const randomEvBg = useMemo(
    () => EV_STUDIO_PALETTES[Math.floor(Math.random() * EV_STUDIO_PALETTES.length)],
    []
  );

  switch (project.walkthroughType) {
    case 'phishguard-preview':
      if (!bytexImgFailed) {
        return (
          <div className="relative h-48 w-full overflow-hidden rounded-lg border grid-line bg-[#EEF2FF]">
            <img
              src="/bytex.png"
              alt="ByteX web application preview"
              onError={() => setBytexImgFailed(true)}
              className="h-full w-full object-cover object-top"
            />
          </div>
        );
      }
      return (
        <div className="relative flex h-48 w-full items-end justify-end overflow-hidden rounded-lg bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#4F46E5] p-4 pb-0 pr-0">
          <div className="h-[88%] w-[92%] overflow-hidden rounded-tl-lg border-l border-t border-black/15 bg-[#FAFAFA] text-[#171717] shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-2 text-[10px]">
              <span className="font-semibold tracking-tight">ByteX</span>
              <span className="rounded bg-indigo-600 px-2 py-0.5 font-mono text-[9px] text-white">
                Security Suite
              </span>
            </div>
            <div className="px-5 pt-5 text-center">
              <p className="text-base font-semibold leading-tight tracking-tight">
                Just Paste.
                <br />
                ByteX Does The Rest.
              </p>
            </div>
          </div>
        </div>
      );

    case 'python-viz-walkthrough':
      if (!pyVizImgFailed) {
        return (
          <div className="relative h-48 w-full overflow-hidden rounded-lg border grid-line bg-[#0B0F17]">
            <img
              src="/python-visualizer.png"
              alt="Python Execution Visualizer preview"
              onError={() => setPyVizImgFailed(true)}
              className="h-full w-full object-cover object-top"
            />
          </div>
        );
      }
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

    case 'ev-parking-overview':
    default:
      return (
        <div
          className={`relative flex h-48 w-full items-end justify-end overflow-hidden rounded-lg bg-gradient-to-br ${randomEvBg} p-4 pb-0 pr-0`}
        >
          <div className="h-[88%] w-[92%] overflow-hidden rounded-tl-lg border-l border-t border-black/15 bg-[#111216] text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-[10px]">
              <span className="font-medium">EV Parking System</span>
              <span className="font-mono text-[9px] text-emerald-400">COEP Competition</span>
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold leading-tight">
                Student Project Showcase
              </p>
              <div className="mt-3 grid grid-cols-3 gap-1.5 font-mono text-[9px] text-neutral-300">
                <div className="rounded border border-white/10 bg-white/5 p-1.5 text-center">
                  BAY 01
                </div>
                <div className="rounded border border-emerald-400/40 bg-emerald-500/15 p-1.5 text-center text-emerald-300">
                  EV SLOT
                </div>
                <div className="rounded border border-white/10 bg-white/5 p-1.5 text-center">
                  BAY 03
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};
