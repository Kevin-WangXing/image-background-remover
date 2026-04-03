import React, { useState } from 'react';
import UploadZone from './components/UploadZone';
import Preview from './components/Preview';
import './App.css';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    setImageFile(file);
    setResultImage(null);
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`处理失败: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setResultImage(imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setResultImage(null);
    setError(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🖼️ Image Background Remover</h1>
        <p>免费在线AI图片背景移除工具</p>
      </header>

      <main className="main">
        {!imageFile ? (
          <UploadZone onUpload={handleUpload} />
        ) : (
          <Preview 
            originalImage={URL.createObjectURL(imageFile)}
            resultImage={resultImage}
            loading={loading}
            error={error}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="footer">
        <p>
          使用 <a href="https://www.remove.bg/" target="_blank" rel="noopener noreferrer">Remove.bg</a> API + 
          <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer"> Cloudflare</a> 构建
        </p>
        <p>开源项目 • 隐私保护 • 无需注册</p>
      </footer>
    </div>
  );
}

export default App;