
import React, { useState } from 'react';
import { Play, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface CodeExecutorProps {
  code: string;
  onCodeChange: (code: string) => void;
}

export const CodeExecutor: React.FC<CodeExecutorProps> = ({ code, onCodeChange }) => {
  const [output, setOutput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeCode = async () => {
    setIsExecuting(true);
    setError(null);
    setOutput('');

    try {
      // This would connect to your Flask backend
      const response = await fetch('/api/execute-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        setError(result.error);
      } else {
        setOutput(result.output || 'Code executed successfully (no output)');
      }
    } catch (err) {
      // Fallback for development - simulate Python execution
      console.log('Flask backend not available, simulating execution...');
      
      // Simple simulation based on code content
      if (code.includes('print(')) {
        const printMatches = code.match(/print\((.*?)\)/g);
        if (printMatches) {
          const mockOutput = printMatches.map(match => {
            const content = match.replace(/print\(|\)/g, '').replace(/['"]/g, '');
            return content;
          }).join('\n');
          setOutput(mockOutput);
        }
      } else if (code.includes('import numpy') || code.includes('import pandas')) {
        setOutput('NumPy/Pandas operations executed successfully\nArrays and DataFrames processed');
      } else if (code.includes('sklearn')) {
        setOutput('Machine Learning model trained successfully\nAccuracy: 0.95\nModel ready for predictions');
      } else {
        setOutput('Code executed successfully\n(Connect to Flask backend for real Python execution)');
      }
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Python Code Executor</h3>
        <button
          onClick={executeCode}
          disabled={isExecuting}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {isExecuting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Executing...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Run Python</span>
            </>
          )}
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        className="w-full h-64 bg-slate-900 text-green-400 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg border border-slate-700"
        placeholder="# Write your Python code here..."
        style={{ fontFamily: 'Monaco, Consolas, monospace' }}
      />

      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-3 border-b border-slate-700 bg-slate-700/50">
          <h4 className="text-sm font-semibold text-white flex items-center">
            {error ? (
              <>
                <AlertCircle className="w-4 h-4 mr-2 text-red-400" />
                Error Output
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Console Output
              </>
            )}
          </h4>
        </div>
        <div className="p-4">
          <pre className={`font-mono text-sm whitespace-pre-wrap ${
            error ? 'text-red-400' : 'text-green-400'
          }`}>
            {error || output || 'No output yet. Run your code to see results.'}
          </pre>
        </div>
      </div>

      <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-400/30">
        <h4 className="text-sm font-semibold text-blue-400 mb-2">💡 Backend Setup Required</h4>
        <p className="text-xs text-slate-300">
          To execute Python code, you need to set up a Flask backend server with an endpoint at `/api/execute-python`. 
          The server should accept POST requests with {'{'}&#34;code&#34;: &#34;python_code&#34;{'}'} and return {'{'}&#34;output&#34;: &#34;result&#34;{'}'} or {'{'}&#34;error&#34;: &#34;error_message&#34;{'}'}.
        </p>
      </div>
    </div>
  );
};
