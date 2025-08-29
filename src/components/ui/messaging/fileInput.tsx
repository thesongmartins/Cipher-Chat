export const FileInput = ({ fileInput }: { fileInput: File | null }) => {
  return (
    <>
      {fileInput && (
        <div className="justify-center flex items-center  rounded  flex-col">
          {/* Previewing different files */}
          <div className="flex items-center *:object-contain w-50">
            {/* image file type */}
            {fileInput.type.startsWith("image/") && (
              <img src={URL.createObjectURL(fileInput)} />
            )}

            {/* image file type */}
            {fileInput.type.startsWith("video/") && (
              <video>
                <source
                  src={URL.createObjectURL(fileInput)}
                  type={fileInput.type}
                />
                Your browser does not support video.
              </video>
            )}

            {/* PDF file type */}
            {fileInput.type === "application/pdf" && (
              <iframe src={URL.createObjectURL(fileInput)} />
            )}

            {/* WORD DOCS */}
            {fileInput.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
              <div>
                📄 <span>{fileInput.name}</span>
              </div>
            )}

            {/* EXCEL DOCS */}
            {fileInput.type ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
              <div>
                📊 <span>{fileInput.name}</span>
              </div>
            )}

            {/* FALLBACK */}
            {!fileInput.type.startsWith("image/") &&
              !fileInput.type.startsWith("video/") &&
              fileInput.type !== "application/pdf" &&
              fileInput.type !==
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
              fileInput.type !==
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                <div className="file-preview">
                  📁 <span>{fileInput.name}</span>
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
};
