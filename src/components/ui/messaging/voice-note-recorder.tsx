import clsx from "clsx";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { LuDelete } from "react-icons/lu";
import { useMessageStore } from "../../../store/message-store";

type VnTypes = {
  audioURL: string | null;
  setAudioURL: Dispatch<SetStateAction<string | null>>;
};
export const VoiceNoteRecorder = ({ audioURL, setAudioURL }: VnTypes) => {
  // --- store the active MediaRecorder instance ---
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  // --- store audio chunks in memory before building the Blob
  const chunks = useRef<Blob[]>([]);

  // --- Keep a reference to the audio stream so we can turn the mic OFF
  const streamRef = useRef<MediaStream | null>(null);

  // ---Subscribe to addMessage store
  const addMessage = useMessageStore((s) => s.addMessage);

  /**
   * Start recording audio when user press the mic button
   */
  const startRecording = async () => {
    try {
      // Ask for Microphone permission + stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream; //store the stream to close it later

      const recorder = new MediaRecorder(stream);

      // capture available audio data
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };

      // when Recording stops, build a playable audio URL

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        chunks.current = [];
        const url = URL.createObjectURL(blob);
        setAudioURL(url);

        // Stop the mic after recording
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };

      recorder.start();
      setMediaRecorder(recorder);
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  /**
   * Stop recording when button is released
   */
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
  };

  /**
   * Delete the preview recording
   */
  const deleteRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
      setAudioURL(null);
    }
  };

  /**
   * Stimulate sending audio
   */
  const sendRecording = () => {
    if (audioURL) {
      addMessage(null, null, audioURL);
      setAudioURL(null);
    }
  };

  return (
    <>
      <div className="relative ">
        {/* 🎤 Record button */}
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          className={clsx(
            "  text-[21px] cursor-pointer text-chats-white rounded-full",
            mediaRecorder && "bg-red-500 animate-pulse p-3"
          )}
        >
          <FaMicrophone
            className={clsx(mediaRecorder && "animate-pulse text-white")}
          />
        </button>

        {/* 🎧 Preview recording after stop */}
        {audioURL && (
          <div className="absolute -top-30  z-10 left-0 bg-background p-5 shadow-sm flex gap-2 w-90">
            <audio controls src={audioURL} className="w-64" />

            <div className="flex gap-2 *:rounded-full items-center *:flex *:text-white *:items-center *:cursor-pointer *:text-base *:py-2 *:px-2">
              <button
                onClick={deleteRecording}
                className="bg-red-500 border-red-500"
              >
                <LuDelete />
              </button>
              <button onClick={sendRecording} className="bg-green-500 ">
                <IoCheckmark />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
