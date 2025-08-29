import clsx from "clsx";
import React, { useState, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";

const VoiceRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  // Stop recording
  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  // Play / Pause preview
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  // Handle play/pause state
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleEnded = () => setIsPlaying(false);

  return (
    <div className="flex flex-col items-center gap-4 ">
      {/* Recording button */}
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        className={clsx(
          "cursor-pointer text-[21px] text-chats-white rounded-full",
          isRecording && "bg-red-500 animate-pulse p-3"
        )}
      >
        <FaMicrophone
          className={clsx(isRecording && "animate-pulse text-white")}
        />
      </button>

      {/* Preview Section */}
      {audioURL && (
        <div className="flex absolute -top-30 items-center gap-3  px-4 py-2 rounded-lg shadow w-full justify-between">
          {/* Hidden audio tag */}
          <audio
            // ref={audioRef}
            src={audioURL}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
          />

          {/* Custom Play Button */}
          {/* <button
            onClick={togglePlay}
            className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md"
          >
            {isPlaying ? "Pause" : "Play"}
          </button> */}

          {/* Delete */}
          <button
            onClick={() => setAudioURL(null)}
            className="bg-red-500 text-white px-3 py-2 rounded-full shadow-md"
          >
            ❌
          </button>

          {/* Send */}
          <button
            onClick={() => {
              console.log("Send audio:", audioURL);
              // You can emit/send this blob to backend
            }}
            className="bg-green-600 text-white px-3 py-2 rounded-full shadow-md"
          >
            ✅
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
