import { useState, useRef, useEffect, useContext } from 'react';
import './FileUpload.css';
import Vector from '../assets/Vector.png';
import Trash from '../assets/Trash.png';
import { VendorContext } from '../contexts/VendorContext.jsx';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { vendorData, setVendorData } = useContext(VendorContext);

  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'video/mp4',
    'audio/mpeg',
  ];

  useEffect(() => {
    setVendorData((prev) => ({
      ...prev,
      portfolio: files.length > 0 ? [...files] : [],
    }));
  }, [files]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const filtered = droppedFiles.filter(
      (file) =>
        allowedTypes.includes(file.type) &&
        !files.some((f) => f.name === file.name && f.size === file.size)
    );
    setFiles((prev) => [...prev, ...filtered]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filtered = selectedFiles.filter(
      (file) =>
        allowedTypes.includes(file.type) &&
        !files.some((f) => f.name === file.name && f.size === file.size)
    );
    setFiles((prev) => [...prev, ...filtered]);
    e.target.value = '';
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const formatFileSize = (size) => {
    return size > 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };

  const getFileType = (type) => {
    if (type.includes('image')) return type.replace('image/', '');
    if (type.includes('video')) return 'video';
    if (type.includes('audio')) return 'audio';
    if (type.includes('pdf')) return 'PDF';
    return type;
  };

  return (
    <div className="fileupload-container">
      <div
        className="fileupload-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <img src={Vector} alt="Upload" />
        <p>Drag files here<br />or</p>
        <input
          type="file"
          multiple
          accept=".pdf, .jpg, .jpeg, .png, .mp4, .mp3"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        <button className="fileupload-button" onClick={handleUploadClick}>
          Upload Files
        </button>
        <p className="fileupload-supported-text">
          Supported: PDF, JPG, PNG, MP4, MP3
        </p>
      </div>
      <div className="fileupload-list">
        {files.map((file, index) => (
          <div
            key={index}
            className="fileupload-item"
          >
            {file.type.startsWith('image/') && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="fileupload-preview-img"
              />
            )}
            <div className="fileupload-info">
              <div className="fileupload-filename">{file.name}</div>
              <div className="fileupload-details">
                {formatFileSize(file.size)}, {getFileType(file.type)}
              </div>
            </div>
            <img
              src={Trash}
              alt="Delete"
              className="fileupload-trash-icon"
              onClick={() => {
                const updatedFiles = files.filter((_, i) => i !== index);
                setFiles(updatedFiles);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;