import { useState, useCallback, useEffect } from 'react';
import { Play, RefreshCw, Copy, CheckCircle } from 'lucide-react';

export function MiniCodeRunner() {
  const [code, setCode] = useState(`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 示例：创建DataFrame
data = {'姓名': ['张三', '李四', '王五', '赵六'], 
        '年龄': [25, 30, 28, 32],
        '城市': ['北京', '上海', '广州', '深圳']}
df = pd.DataFrame(data)
print(df)

# 示例：绘图
plt.figure(figsize=(8, 5))
plt.bar(df['姓名'], df['年龄'], color='#8B5CF6')
plt.title('年龄分布')
plt.xlabel('姓名')
plt.ylabel('年龄')
plt.show()
`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState('');
  const [plotImage, setPlotImage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadPyodide() {
      const pyodideScript = document.createElement('script');
      pyodideScript.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.0/full/pyodide.js';
      pyodideScript.onload = async () => {
        const pyodide = await (window as any).loadPyodide();
        (window as any).pyodide = pyodide;
        await pyodide.loadPackage(['pandas', 'numpy', 'matplotlib']);
        setHasLoaded(true);
      };
      document.head.appendChild(pyodideScript);
      return () => {
        document.head.removeChild(pyodideScript);
      };
    }
    loadPyodide();
  }, []);

  const handleRun = useCallback(async () => {
    setOutput('');
    setError('');
    setPlotImage('');
    
    if (!(window as any).pyodide) {
      setError('Pyodide 加载中...');
      return;
    }

    setIsRunning(true);
    
    try {
      const pyodide = (window as any).pyodide;
      
      const fullCode = `
import matplotlib.pyplot as plt
import io
import sys
from io import StringIO

plt.switch_backend('Agg')

# 捕获输出
old_stdout = sys.stdout
captured_output = StringIO()
sys.stdout = captured_output

# 绘图函数
def show_plot():
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    import base64
    return base64.b64encode(buf.read()).decode('utf-8')

# 用户代码
${code}

# 恢复输出
sys.stdout = old_stdout

# 获取捕获的输出
output_text = captured_output.getvalue()

# 获取图片
plot_image = show_plot()

output_text, plot_image
`;
      
      const result = await pyodide.runPythonAsync(fullCode);
      
      if (result) {
        const [text, img] = result;
        setOutput(text);
        
        if (img && typeof img === 'string' && img.length > 0) {
          setPlotImage(img);
        }
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  const handleReset = () => {
    setCode(`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 示例：创建DataFrame
data = {'姓名': ['张三', '李四', '王五', '赵六'], 
        '年龄': [25, 30, 28, 32],
        '城市': ['北京', '上海', '广州', '深圳']}
df = pd.DataFrame(data)
print(df)

# 示例：绘图
plt.figure(figsize=(8, 5))
plt.bar(df['姓名'], df['年龄'], color='#8B5CF6')
plt.title('年龄分布')
plt.xlabel('姓名')
plt.ylabel('年龄')
plt.show()
`);
    setOutput('');
    setError('');
    setPlotImage('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden h-full flex flex-col">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Python 在线运行</h3>
          <span className={`text-xs px-2.5 py-1 rounded-full ${
            hasLoaded ? 'bg-green-500/30 text-green-200' : 'bg-yellow-500/30 text-yellow-200'
          }`}>
            {hasLoaded ? '就绪 ✓' : '加载中...'}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="bg-slate-800 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-700">
              <span className="text-xs text-slate-400 font-mono">practice.py</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle size={14} className="text-green-400" />
                    <span className="text-green-400">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>复制</span>
                  </>
                )}
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-56 bg-slate-900 text-slate-300 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              placeholder="输入Python代码..."
              spellCheck={false}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleRun}
              disabled={isRunning || !hasLoaded}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>运行中...</span>
                </>
              ) : (
                <>
                  <Play size={18} />
                  <span>运行</span>
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
            >
              <RefreshCw size={18} />
              <span>重置</span>
            </button>
          </div>
          
          <div className="bg-slate-50 rounded-xl overflow-hidden">
            <div className="px-4 py-2 bg-slate-100 border-b border-slate-200">
              <span className="text-sm font-medium text-slate-600">控制台输出</span>
            </div>
            <div className="p-4 min-h-32 max-h-48 overflow-auto">
              {isRunning ? (
                <div className="flex items-center gap-2 text-primary-600">
                  <RefreshCw size={16} className="animate-spin" />
                  <span className="text-sm">正在运行...</span>
                </div>
              ) : error ? (
                <pre className="text-sm text-red-600 whitespace-pre-wrap font-mono">{error}</pre>
              ) : output ? (
                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">{output}</pre>
              ) : (
                <div className="text-slate-400 text-sm">点击运行按钮查看输出结果</div>
              )}
              {plotImage && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-sm font-medium text-slate-600 mb-2">图表输出</div>
                  <img 
                    src={`data:image/png;base64,${plotImage}`} 
                    alt="plot" 
                    className="w-full rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-primary-50/50 rounded-xl p-4">
            <div className="text-sm font-medium text-primary-600 mb-2">支持的库</div>
            <div className="flex flex-wrap gap-2">
              {['pandas', 'numpy', 'matplotlib'].map((lib) => (
                <span 
                  key={lib}
                  className="px-2.5 py-1 bg-primary-100 text-primary-600 text-xs rounded-full"
                >
                  {lib}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
