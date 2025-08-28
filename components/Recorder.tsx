
'use client';
import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';

export default function Recorder() {
  const gl = useThree((s) => s.gl);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const start = () => {
    const stream = gl.domElement.captureStream(30);
    const options: MediaRecorderOptions = { mimeType: 'video/webm;codecs=vp9' as any };
    const mr = new MediaRecorder(stream, options);
    chunksRef.current = [];
    mr.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tour-${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
    };
    mr.start();
    mediaRecorderRef.current = mr;
    setRecording(true);
  };

  const stop = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      {!recording ? (
        <button onClick={start} className="px-3 py-2 rounded-xl bg-white/10 border">Record</button>
      ) : (
        <button onClick={stop} className="px-3 py-2 rounded-xl bg-red-600 border border-red-400">Stop</button>
      )}
    </div>
  );
}
