import { useState, useCallback, useEffect } from 'react';
import { Code, Play, RefreshCw, Copy, CheckCircle, Terminal } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  expectedOutput: string;
  hints: string[];
  solution?: string;
}

export function CodeEditor({ initialCode, expectedOutput, hints, solution }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPyodide() {
      const pyodideScript = document.createElement('script');
      pyodideScript.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.0/full/pyodide.js';
      pyodideScript.onload = () => {
        (window as any).loadPyodide().then((pyodide: any) => {
          (window as any).pyodide = pyodide;
        });
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
    
    if (!(window as any).pyodide) {
      setError('Pyodide 正在加载中，请稍候...');
      return;
    }

    setIsRunning(true);
    
    try {
      const pyodide = (window as any).pyodide;
      await pyodide.loadPackage(['pandas', 'numpy']);
      
      const fullCode = `
import sys
from io import StringIO

# 捕获输出
old_stdout = sys.stdout
captured_output = StringIO()
sys.stdout = captured_output

# 用户代码
${code}

# 恢复输出
sys.stdout = old_stdout

# 获取捕获的输出
captured_output.getvalue()
`;
      
      const result = await pyodide.runPythonAsync(fullCode);
      setOutput(result);
    } catch (err) {
      setError(String(err));
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    setError('');
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-green to-accent-cyan flex items-center justify-center">
            <Code className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-soft-text">在线代码练习</h2>
            <p className="text-xs text-soft-muted">编写Python代码并运行</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="复制代码"
          >
            {copied ? <CheckCircle size={16} className="text-green-400" /> : <Copy size={16} />}
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="重置代码"
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>运行中</span>
              </>
            ) : (
              <>
                <Play size={14} />
                <span>运行</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <div className="flex-1 min-h-[200px] flex flex-col">
          <div className="px-3 py-2 bg-slate-800 rounded-t-lg text-xs text-slate-400 font-mono">
            practice.py
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-slate-900 text-slate-300 p-3 rounded-b-lg rounded-t-none font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            placeholder="在此输入Python代码..."
            spellCheck={false}
          />
        </div>

        <div className="flex-1 min-h-[120px] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-soft-text">
            <Terminal className="text-accent-green" size={16} />
            运行输出
          </div>
          <div className={`flex-1 rounded-lg p-3 font-mono text-sm overflow-auto ${
            error ? 'bg-red-50 text-red-600' : output ? 'bg-slate-50 text-soft-text' : 'bg-slate-100 text-slate-400'
          }`}>
            {isRunning ? (
              <span className="text-primary-600">正在运行...</span>
            ) : error ? (
              <pre className="whitespace-pre-wrap">{error}</pre>
            ) : output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <span>点击运行按钮查看输出结果</span>
            )}
          </div>
        </div>

        <div className="flex-1 min-h-[100px] flex flex-col gap-2">
          <div className="text-sm font-semibold text-soft-text">预期输出</div>
          <div className="flex-1 bg-slate-50 rounded-lg p-3 font-mono text-sm overflow-auto">
            <pre className="whitespace-pre-wrap">{expectedOutput}</pre>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="text-sm font-semibold text-soft-text mb-2">提示</div>
          <ul className="space-y-1">
            {hints.slice(0, 3).map((hint, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-soft-muted">
                <span className="w-4 h-4 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="line-clamp-1">{hint}</span>
              </li>
            ))}
          </ul>
        </div>

        {solution && (
          <div className="flex-shrink-0 pt-2 border-t border-slate-100">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors text-sm"
            >
              {showSolution ? '隐藏答案' : '查看答案'}
            </button>

            {showSolution && (
              <div className="mt-3">
                <div className="text-sm font-semibold text-soft-text mb-2">参考答案</div>
                <div className="bg-slate-900 rounded-lg p-3 max-h-40 overflow-auto">
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap">
                    <code>{solution}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
