import { useState } from 'react';
import { Calendar, Clock, ArrowLeftRight } from 'lucide-react';

type ConversionMode = 'toDate' | 'toTimestamp';
type NumberFormat = 'decimal' | 'hex';

function App() {
  const [mode, setMode] = useState<ConversionMode>('toDate');
  const [numberFormat, setNumberFormat] = useState<NumberFormat>('decimal');
  const [timestampInput, setTimestampInput] = useState('');
  const [dateTimeInput, setDateTimeInput] = useState('');
  const [baseTime, setBaseTime] = useState('1970-01-01T00:00:00');
  const [result, setResult] = useState('');

  const parseTimestamp = (input: string, format: NumberFormat): number => {
    if (format === 'hex') {
      return parseInt(input.replace(/^0x/i, ''), 16);
    }
    return parseInt(input, 10);
  };

  const formatTimestamp = (timestamp: number, format: NumberFormat): string => {
    if (format === 'hex') {
      return '0x' + timestamp.toString(16).toUpperCase();
    }
    return timestamp.toString();
  };

  const convertToDate = () => {
    try {
      const timestamp = parseTimestamp(timestampInput, numberFormat);
      if (isNaN(timestamp)) {
        setResult('Invalid timestamp');
        return;
      }

      const baseDate = new Date(baseTime);
      const targetDate = new Date(baseDate.getTime() + timestamp * 1000);

      setResult(targetDate.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    } catch (error) {
      setResult('Conversion error');
    }
  };

  const convertToTimestamp = () => {
    try {
      const targetDate = new Date(dateTimeInput);
      const baseDate = new Date(baseTime);

      if (isNaN(targetDate.getTime()) || isNaN(baseDate.getTime())) {
        setResult('Invalid date');
        return;
      }

      const diffInSeconds = Math.floor((targetDate.getTime() - baseDate.getTime()) / 1000);
      setResult(formatTimestamp(diffInSeconds, numberFormat));
    } catch (error) {
      setResult('Conversion error');
    }
  };

  const handleConvert = () => {
    if (mode === 'toDate') {
      convertToDate();
    } else {
      convertToTimestamp();
    }
  };

  const switchMode = () => {
    setMode(mode === 'toDate' ? 'toTimestamp' : 'toDate');
    setResult('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <Clock className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-slate-800">时间戳转换器</h1>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              基础起始时间
            </label>
            <input
              type="datetime-local"
              value={baseTime}
              onChange={(e) => setBaseTime(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <p className="text-xs text-slate-500 mt-1">
              默认: 1970-01-01 00:00:00 (Unix时间戳起点)
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              数字格式
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="decimal"
                  checked={numberFormat === 'decimal'}
                  onChange={(e) => setNumberFormat(e.target.value as NumberFormat)}
                  className="mr-2"
                />
                <span className="text-sm text-slate-700">十进制 (DEC)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="hex"
                  checked={numberFormat === 'hex'}
                  onChange={(e) => setNumberFormat(e.target.value as NumberFormat)}
                  className="mr-2"
                />
                <span className="text-sm text-slate-700">十六进制 (HEX)</span>
              </label>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                {mode === 'toDate' ? '时间戳 → 日期时间' : '日期时间 → 时间戳'}
              </h2>
              <button
                onClick={switchMode}
                className="p-2 hover:bg-white rounded-lg transition"
                title="切换转换方向"
              >
                <ArrowLeftRight className="w-5 h-5 text-blue-600" />
              </button>
            </div>

            {mode === 'toDate' ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  时间戳 ({numberFormat === 'hex' ? 'HEX' : 'DEC'})
                </label>
                <input
                  type="text"
                  value={timestampInput}
                  onChange={(e) => setTimestampInput(e.target.value)}
                  placeholder={numberFormat === 'hex' ? '0x64' : '100'}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  日期时间
                </label>
                <input
                  type="datetime-local"
                  value={dateTimeInput}
                  onChange={(e) => setDateTimeInput(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            )}

            <button
              onClick={handleConvert}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg"
            >
              转换
            </button>
          </div>

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-green-800 mb-1">转换结果</h3>
                  <p className="text-2xl font-mono font-bold text-green-900 break-all">
                    {result}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">使用说明：</h3>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• 时间戳表示从基础起始时间开始累加的秒数</li>
              <li>• 支持十进制和十六进制格式（如: 100 或 0x64）</li>
              <li>• 可自定义基础起始时间，默认为Unix时间戳起点</li>
              <li>• 点击 <ArrowLeftRight className="w-3 h-3 inline" /> 图标切换转换方向</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
