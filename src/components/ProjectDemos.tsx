import React, { useState } from 'react';
import { ChevronRight, Play, RotateCcw } from 'lucide-react';
import { ProjectItem } from '../data/portfolio';

const CIPHERX_FLOWS = [
  {
    prompt: '"Open VS Code"',
    route: 'Desktop Intent Router -> subprocess launch',
    response: 'Triggered local application launch without needing LLM overhead.',
  },
  {
    prompt: '"Take a screenshot"',
    route: 'Desktop Automation Module',
    response: 'Captured desktop screen locally via Python utility.',
  },
  {
    prompt: '"Explain RAG in two lines"',
    route: 'SpeechRecognition -> Ollama Local LLM -> TTS',
    response: 'Generated concise reply on local model and read aloud via TTS.',
  },
];

const RAG_STAGES = [
  {
    stage: '1. PDF Extraction',
    detail: 'Read uploaded PDF pages and extract raw text content.',
  },
  {
    stage: '2. Text Chunking',
    detail: 'Split long document text into overlapping semantic chunks.',
  },
  {
    stage: '3. Embeddings',
    detail: 'Convert chunks into dense vectors using Sentence Transformers.',
  },
  {
    stage: '4. FAISS Search',
    detail: 'Match user query embedding against indexed chunks for top relevant passages.',
  },
  {
    stage: '5. Ollama Generation',
    detail: 'Inject retrieved context into local LLM prompt for grounded answering.',
  },
];

const PYTHON_TRACE = [
  { line: 1, code: 'scores = [10, 20, 30]', state: 'scores = [10, 20, 30]' },
  { line: 2, code: 'total = 0', state: 'scores = [10, 20, 30], total = 0' },
  { line: 3, code: 'for s in scores: total += s', state: 'looping -> total becomes 10 -> 30 -> 60' },
  { line: 4, code: 'print(total)', state: 'stdout: 60' },
];

export const ProjectInteractiveWalkthrough: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (project.walkthroughType === 'cipherx-walkthrough') {
    const active = CIPHERX_FLOWS[selectedIndex];
    return (
      <div className="border border-line bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-medium text-ink">
            Prototype Walkthrough — Local Desktop Architecture
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Conceptual Demo (Not Live Backend)
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          Because CipherX runs locally with microphone and OS access, select a sample command to inspect how the Python loop routes actions:
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {CIPHERX_FLOWS.map((flow, i) => (
            <button
              key={flow.prompt}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`border px-3 py-1.5 font-mono text-[11px] transition-colors ${
                selectedIndex === i
                  ? 'border-ink bg-ink text-canvas'
                  : 'border-line bg-canvas text-muted hover:text-ink'
              }`}
            >
              {flow.prompt}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-1.5 border border-line bg-canvas p-4 font-mono text-xs">
          <p className="text-muted">
            <span className="text-ink">Input:</span> {active.prompt}
          </p>
          <p className="text-muted">
            <span className="text-ink">Route:</span> {active.route}
          </p>
          <p className="text-ink">{active.response}</p>
        </div>
      </div>
    );
  }

  if (project.walkthroughType === 'pdf-rag-walkthrough') {
    return (
      <div className="border border-line bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-medium text-ink">
            Pipeline Explorer — In Development
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Conceptual Walkthrough
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {RAG_STAGES.map((item, i) => (
            <button
              key={item.stage}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`inline-flex items-center gap-1 border px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
                selectedIndex === i
                  ? 'border-ink bg-ink text-canvas'
                  : 'border-line bg-canvas text-muted hover:text-ink'
              }`}
            >
              <span>{item.stage}</span>
              {i < RAG_STAGES.length - 1 && <ChevronRight className="h-3 w-3 opacity-50" />}
            </button>
          ))}
        </div>

        <div className="mt-4 border border-line bg-canvas p-4">
          <h4 className="font-mono text-xs font-medium text-ink">
            {RAG_STAGES[selectedIndex].stage}
          </h4>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            {RAG_STAGES[selectedIndex].detail}
          </p>
        </div>
      </div>
    );
  }

  if (project.walkthroughType === 'python-viz-walkthrough') {
    const step = PYTHON_TRACE[selectedIndex];
    return (
      <div className="border border-line bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-medium text-ink">
            Sample-Data Concept Preview — Step Execution
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedIndex((prev) => (prev + 1) % PYTHON_TRACE.length)}
              className="inline-flex items-center gap-1.5 border border-line bg-canvas px-2.5 py-1 font-mono text-[11px] text-ink transition-colors hover:border-ink/40"
            >
              <Play className="h-3 w-3" />
              <span>Next Step</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedIndex(0)}
              aria-label="Reset trace"
              className="inline-flex items-center border border-line bg-canvas p-1 text-muted hover:text-ink"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-1 border border-line bg-canvas p-3 font-mono text-xs">
            {PYTHON_TRACE.map((row, i) => (
              <div
                key={row.line}
                className={`px-2 py-1 ${
                  i === selectedIndex ? 'bg-subtle font-medium text-ink' : 'text-muted'
                }`}
              >
                {row.line}. {row.code}
              </div>
            ))}
          </div>

          <div className="border border-line bg-canvas p-3 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-wider text-muted">
              Conceptual State at Line {step.line}
            </span>
            <p className="mt-2 text-ink">{step.state}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
