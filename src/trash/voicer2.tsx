import React, { useState, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";

const AudioRecorder: React.FC = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const chunks = useRef<Blob[]>([]);

  // Start recording when button pressed
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        chunks.current = [];
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      recorder.start();
      setMediaRecorder(recorder);
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  // Stop recording when button released
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
  };

  // Delete the preview
  const deleteRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
      setAudioURL(null);
    }
  };

  // Send simulation
  const sendRecording = () => {
    if (audioURL) {
      console.log("Sending audio:", audioURL);
      alert("Audio sent!");
      setAudioURL(null);
    }
  };

  return (
    <div className=" relative flex flex-col w-full  items-center ">
      {/* Record button */}
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        className="text-[21px] text-chats-white cursor-pointer"
      >
        <FaMicrophone />{" "}
      </button>

      {/* Preview after recording */}
      {audioURL && (
        <div className="flex absolute -top-30 right-0 w-full flex-col items-center space-y-2">
          <audio controls src={audioURL} className="w-64" />

          <div className="flex space-x-4">
            <button
              onClick={deleteRecording}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              ❌ Delete
            </button>
            <button
              onClick={sendRecording}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              ✅ Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
