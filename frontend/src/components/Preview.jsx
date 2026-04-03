import React from 'react';
import './Preview.css';

function Preview({ originalImage, resultImage, loading, error, onReset }) {
  const handleDownload = () => {
    if (!resultImage) return;

    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'background_removed.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h2>图片处理结果</h2>
        <button onClick={onReset} className="reset-button">
          上传另一张图片
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>❌ 处理失败: {error}</p>
          <button onClick={onReset} className="retry-button">
            重新上传
          </button>
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>AI正在处理图片背景移除...</p>
          <p className="loading-subtext">这通常需要3-10秒</p>
        </div>
      )}

      {!loading && originalImage && (
        <div className="images-container">
          <div className="image-card">
            <h3>原图</h3>
            <img src={originalImage} alt="原始图片" className="preview-image" />
          </div>

          <div className="image-separator">
            <div className="arrow">➡️</div>
            <p>处理后</p>
          </div>

          <div className="image-card">
            <h3>透明背景</h3>
            {resultImage ? (
              <>
                <img src={resultImage} alt="处理后图片" className="preview-image result" />
                <div className="result-actions">
                  <button onClick={handleDownload} className="download-button">
                    ⬇️ 下载PNG
                  </button>
                  <p className="file-info">透明背景PNG格式</p>
                </div>
              </>
            ) : (
              <div className="placeholder">
                <p>等待处理结果...</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="tips">
        <h3>💡 使用提示</h3>
        <ul>
          <li>下载的PNG图片已移除背景，可直接用于设计项目</li>
          <li>如果效果不理想，可以尝试上传更高分辨率的图片</li>
          <li>建议图片主体与背景对比度较高，效果更好</li>
          <li>支持人像、产品、动物等多种类型图片</li>
        </ul>
      </div>
    </div>
  );
}

export default Preview;