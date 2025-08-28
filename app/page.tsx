
'use client';
import Link from 'next/link';
import { useQuality, type Quality } from '@/hooks/useQuality';

const Button = ({ children, onClick, active }: any) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-xl border ${active ? 'bg-white/10' : 'hover:bg-white/5'}`}
  >{children}</button>
);

export default function Page() {
  const quality = useQuality((s) => s.quality);
  const setQuality = useQuality((s) => s.setQuality);
  const set = (q: Quality) => () => setQuality(q);

  return (
    <main className="min-h-dvh bg-black text-zinc-100">
      <section className="mx-auto max-w-5xl px-6 py-16 grid gap-8">
        <h1 className="text-4xl font-bold">Atucha Tour</h1>
        <p className="opacity-70">Start simple. Then crank it to cinematic when your laptop stops wheezing.</p>

        <div className="flex gap-2">
          {(['basic','pro','cinematic'] as Quality[]).map(q => (
            <Button key={q} onClick={set(q)} active={quality===q}>{q}</Button>
          ))}
        </div>

        <nav className="flex gap-4 pt-4 underline">
          <Link href="/free-roam">Free Roam</Link>
          <Link href="/tour/demo">Guided Tour (demo)</Link>
        </nav>
      </section>
    </main>
  );
}
