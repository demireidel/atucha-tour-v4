
'use client';
import { useQuality, type Quality } from '@/hooks/useQuality';
import { useTour } from '@/hooks/useTour';

export default function ControlBar() {
  const quality = useQuality((s) => s.quality);
  const setQuality = useQuality((s) => s.setQuality);
  const { playing, play, pause, stop, time, duration, seek } = useTour();

  const setQ = (q: Quality) => () => setQuality(q);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-4 z-50 bg-black/60 backdrop-blur border rounded-2xl px-4 py-3 flex items-center gap-3">
      <div className="flex gap-1">
        {(['basic','pro','cinematic'] as Quality[]).map(q => (
          <button key={q} onClick={setQ(q)}
            className={`px-2 py-1 rounded border ${quality===q?'bg-white/10':''}`}>{q}</button>
        ))}
      </div>

      <div className="mx-3 h-6 w-px bg-white/20" />

      <div className="flex items-center gap-2">
        {!playing ? (
          <button onClick={play} className="px-2 py-1 rounded border">Play</button>
        ) : (
          <button onClick={pause} className="px-2 py-1 rounded border">Pause</button>
        )}
        <button onClick={stop} className="px-2 py-1 rounded border">Stop</button>
      </div>

      <div className="mx-3 h-6 w-px bg-white/20" />

      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.01}
        value={time}
        onChange={(e) => seek(parseFloat(e.target.value))}
        className="w-64"
      />
      <span className="text-xs opacity-70 tabular-nums">{time.toFixed(1)} / {duration.toFixed(1)}s</span>
    </div>
  );
}
