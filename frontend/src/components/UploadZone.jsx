import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './UploadZone.css';

function UploadZone({ onUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="upload-zone">
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="upload-icon">📤</div>
        
        {isDragActive ? (
          <p className="upload-text">释放图片到这里...</p>
        ) : (
          <>
            <p className="upload-text">
              <strong>拖放图片到这里</strong>
              <br />
              或者
            </p>
            <button 
              type="button"
              className="select-button"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('file-input').click();
              }}
            >
              选择文件
            </button>
            <input
              id="file-input"
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>

      <div className="upload-info">
        <h3>📋 支持格式</h3>
        <ul>
          <li>JPG / JPEG - 常见照片格式</li>
          <li>PNG - 支持透明背景</li>
          <li>WebP - 现代图像格式</li>
        </ul>

        <h3>⚠️ 限制条件</h3>
        <ul>
          <li>最大文件大小：5MB</li>
          <li>单次处理一张图片</li>
          <li>免费版本处理时间：3-10秒</li>
        </ul>

        <h3>🔒 隐私保护</h3>
        <p>所有图片仅在内存中处理，完成后自动清除，不会存储在任何服务器上。</p>
      </div>
    </div>
  );
}

export default UploadZone;