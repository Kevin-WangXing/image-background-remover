export default {
  async fetch(request, env) {
    // 处理CORS预检请求
    if (request.method === 'OPTIONS') {
      return handleCors();
    }

    // 只接受POST请求
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: corsHeaders()
      });
    }

    try {
      return await handleRemoveBg(request, env);
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }), {
        status: 500,
        headers: {
          ...corsHeaders(),
          'Content-Type': 'application/json'
        }
      });
    }
  }
};

async function handleRemoveBg(request, env) {
  // 验证API密钥
  if (!env.REMOVE_BG_API_KEY) {
    return new Response(JSON.stringify({ 
      error: 'Server configuration error' 
    }), {
      status: 500,
      headers: {
        ...corsHeaders(),
        'Content-Type': 'application/json'
      }
    });
  }

  // 解析表单数据
  const formData = await request.formData();
  const imageFile = formData.get('image');

  if (!imageFile) {
    return new Response(JSON.stringify({ 
      error: 'No image provided' 
    }), {
      status: 400,
      headers: {
        ...corsHeaders(),
        'Content-Type': 'application/json'
      }
    });
  }

  // 验证文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(imageFile.type)) {
    return new Response(JSON.stringify({ 
      error: 'Invalid file type. Supported: JPEG, PNG, WebP' 
    }), {
      status: 400,
      headers: {
        ...corsHeaders(),
        'Content-Type': 'application/json'
      }
    });
  }

  // 验证文件大小（最大5MB）
  const maxSize = 5 * 1024 * 1024;
  if (imageFile.size > maxSize) {
    return new Response(JSON.stringify({ 
      error: 'File too large. Maximum size is 5MB' 
    }), {
      status: 400,
      headers: {
        ...corsHeaders(),
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    // 将图片转换为base64
    const imageBuffer = await imageFile.arrayBuffer();
    const imageBase64 = arrayBufferToBase64(imageBuffer);

    // 调用Remove.bg API
    const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': env.REMOVE_BG_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        image_file_b64: imageBase64,
        size: 'auto',
        format: 'png'
      })
    });

    if (!removeBgResponse.ok) {
      const errorText = await removeBgResponse.text();
      console.error('Remove.bg API error:', errorText);
      throw new Error('Background removal failed');
    }

    // 获取处理后的图片
    const resultBuffer = await removeBgResponse.arrayBuffer();

    // 返回处理后的图片
    return new Response(resultBuffer, {
      headers: {
        ...corsHeaders(),
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Disposition': 'attachment; filename="background_removed.png"'
      }
    });
  } catch (error) {
    console.error('Remove.bg processing error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process image', 
      details: error.message 
    }), {
      status: 500,
      headers: {
        ...corsHeaders(),
        'Content-Type': 'application/json'
      }
    });
  }
}

function handleCors() {
  return new Response(null, {
    headers: corsHeaders()
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

function arrayBufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}