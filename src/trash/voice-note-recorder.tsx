import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { LuDelete } from "react-icons/lu";

type VoiceRec = {
  setRecordingBlob: Dispatch<SetStateAction<Blob | null>>;
  previewUrl: string | null;
  setPreviewUrl: Dispatch<SetStateAction<string | null>>;
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
};

export function VoiceNoteRecorder({
  setRecordingBlob,
  previewUrl,
  setPreviewUrl,
  seconds,
  setSeconds,
}: VoiceRec) {
  // ---- refs ----
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<number | null>(null);

  // ---- state ----
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ---- helpers ----
  const stopAllTracks = () => {
    const s = streamRef.current;
    if (s) {
      s.getTracks().forEach((t) => {
        try {
          t.stop();
        } catch (err: unknown) {
          console.error("An Error Occurred", err?.message);
        }
      });
      streamRef.current = null;
    }
  };

  // finalize(blob) -> create preview URL, clear recorder refs
  const finalizeRecording = (mimeType?: string) => {
    try {
      const blob = new Blob(audioChunksRef.current, {
        type: mimeType ?? "audio/webm",
      });
      setRecordingBlob(blob);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      // keep blob for send; clear buffered chunks
      audioChunksRef.current = [];
    } catch (e: unknown) {
      setError("Failed to finalize recording: " + (e?.message ?? String(e)));
    } finally {
      // Clean recorder ref
      if (mediaRecorderRef.current) {
        try {
          // stop if still around
          if (mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
          }
        } catch (err: unknown) {
          console.error("An Error Occurred", err?.message);
        }
        mediaRecorderRef.current = null;
      }
      // stop mic hardware
      stopAllTracks();
      // stop timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRecording(false);
      setSeconds(0);
    }
  };

  // ---- startRecording: minimal, called on user gesture ----
  const startRecording = async () => {
    setPreviewUrl(null);
    setRecordingBlob(null);
    audioChunksRef.current = [];

    if (isRecording) return; // noop if already recording
    setError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Microphone not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // choose safe mime if supported
      const options: MediaRecorderOptions = {};
      if (typeof MediaRecorder !== "undefined") {
        if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
          options.mimeType = "audio/webm;codecs=opus";
        } else if (MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")) {
          options.mimeType = "audio/ogg;codecs=opus";
        }
      }

      const recorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (ev: BlobEvent) => {
        if (ev.data && ev.data.size > 0) audioChunksRef.current.push(ev.data);
      };

      // when stop invoked, finalize
      recorder.onstop = () => {
        if (audioChunksRef.current.length > 0) {
          finalizeRecording(recorder.mimeType ?? options.mimeType);
        }
      };

      recorder.start();
      setIsRecording(true);
      setSeconds(0);

      // tiny timer to show seconds (minimal)
      intervalRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } catch (e: unknown) {
      setError(e?.message ?? "Could not access microphone");
      stopAllTracks();
    }
  };

  // ---- stopRecording: minimal ----
  const stopRecording = () => {
    if (!mediaRecorderRef.current) {
      // no recorder but maybe we have chunks -> finalize anyway
      if (audioChunksRef.current.length > 0) {
        finalizeRecording();
      }
      return;
    }

    try {
      // stop triggers onstop which calls finalizeRecording
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      } else {
        finalizeRecording(mediaRecorderRef.current.mimeType);
      }
    } catch (err: unknown) {
      // fallback finalize
      finalizeRecording();
      console.error("An Error Occurred", err?.message);
    }
  };

  // ---- discard preview ----
  const discardRecording = () => {
    if (previewUrl) {
      try {
        URL.revokeObjectURL(previewUrl);
      } catch (err: unknown) {
        console.error("An Error Occurred", err?.message);
      }
    }
    setPreviewUrl(null);
    setRecordingBlob(null);
    setSeconds(0);
    audioChunksRef.current = [];
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopAllTracks();

      if (mediaRecorderRef.current) mediaRecorderRef.current = null;
      if (streamRef.current) streamRef.current = null;
      if (previewUrl) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch (err: unknown) {
          console.error("An Error Occurred", err?.message);
        }
      }
    };
  }, [previewUrl]);

  // small formatter
  const fmt = (s: number) => {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const ss = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <div className="relative">
      {/* preview area (after stop) */}
      {previewUrl && (
        <div className="absolute -top-30  z-10 left-0 bg-background p-5 shadow-sm flex gap-2 w-90">
          <audio controls src={previewUrl} className="w-full" />
          <div className="flex gap-2 *:rounded-full items-center *:flex *:border *:text-white *:items-center *:cursor-pointer *:text-base *:py-2 *:px-2">
            <button
              onClick={discardRecording}
              className="bg-red-500 border-red-500"
            >
              <LuDelete />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onMouseDown={() => startRecording()}
          onMouseUp={() => stopRecording()}
          onTouchStart={(e) => {
            e.preventDefault();
            startRecording();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            stopRecording();
          }}
          aria-pressed={isRecording}
          className={clsx(
            " cursor-pointer text-[21px] text-chats-white rounded-full",
            isRecording && "bg-red-500 animate-pulse p-3"
          )}
        >
          <FaMicrophone
            className={clsx(isRecording && "animate-pulse text-white")}
          />
        </button>

        {error && <span className="text-xs text-red-600">{error}</span>}

        <small className="text-xs">{isRecording && <>{fmt(seconds)}</>}</small>
      </div>
    </div>
  );
}
