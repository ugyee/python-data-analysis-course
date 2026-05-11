import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '@/types';
import { Clock, BookOpen, ChevronRight, ChevronDown, List, Copy, Check } from 'lucide-react';
import { mockCourseDetails } from '@/data/mockData';

interface CourseCardProps {
  course: Course;
}

const difficultyColors = {
  beginner: { bg: 'bg-accent-green/20', text: 'text-green-600', label: '入门' },
  intermediate: { bg: 'bg-accent-yellow/30', text: 'text-yellow-600', label: '进阶' },
  advanced: { bg: 'bg-accent-pink/30', text: 'text-pink-500', label: '高级' },
};

const categoryColors: Record<string, string> = {
  '数据处理': 'from-blue-400 to-purple-400',
  '数据分析': 'from-purple-400 to-pink-400',
  '数据挖掘': 'from-pink-400 to-orange-400',
  '数据可视化': 'from-cyan-400 to-blue-400',
  '机器学习': 'from-green-400 to-cyan-400',
};

const codeTemplates: Record<string, string> = {
  'data-cleaning': `import pandas as pd
import numpy as np
df = pd.DataFrame({'col': [1, 2, None, 4]})
print(df.isnull().sum())`,
  'group-aggregation': `import pandas as pd
df = pd.DataFrame({'type': ['A','B','A'], 'value': [100, 200, 150]})
print(df.groupby('type')['value'].sum())`,
  'market-basket': `from mlxtend.frequent_patterns import apriori
from mlxtend.preprocessing import TransactionEncoder
te = TransactionEncoder()
te_ary = te.fit(transactions).transform(transactions)`,
  'customer-clustering': `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)`,
  'data-visualization': `import matplotlib.pyplot as plt
import seaborn as sns
sns.set_theme(style='whitegrid')
plt.figure(figsize=(10, 6))`,
  'ab-testing': `from scipy import stats
import numpy as np
# Z检验
z_stat, p_value = stats.normaltest(data)`,
  'time-series': `import pandas as pd
df['date'] = pd.to_datetime(df['date'])
df.set_index('date', inplace=True)`,
  'feature-engineering': `from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)`,
  'anomaly-detection': `from scipy import stats
import numpy as np
z_scores = np.abs(stats.zscore(data))
outliers = np.where(z_scores > 3)`,
  'data-merging': `import pandas as pd
df1 = pd.DataFrame({'key': ['a', 'b'], 'val1': [1, 2]})
df2 = pd.DataFrame({'key': ['a', 'b'], 'val2': [3, 4]})
result = pd.merge(df1, df2, on='key')`,
};

export function CourseCard({ course }: CourseCardProps) {
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const difficultyStyle = difficultyColors[course.difficulty];
  const gradientClass = categoryColors[course.category] || 'from-purple-400 to-pink-400';
  const courseDetail = mockCourseDetails[course.id];

  const corePoints = courseDetail?.chapters
    ?.slice(0, 3)
    .flatMap((chapter) =>
      chapter.lessons
        .filter((lesson) => lesson.type === 'article')
        .map((lesson) => lesson.title)
    )
    .slice(0, 5) || [];

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const code = codeTemplates[course.id];
    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        if (Notification.permission === 'granted') {
          new Notification('✅ 已复制代码模板');
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('✅ 已复制代码模板');
            }
          });
        }
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('复制失败:', err);
      }
    }
  };

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group block bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-36 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-80`} />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyStyle.bg} ${difficultyStyle.text}`}>
            {difficultyStyle.label}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-soft-text mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
          {course.title}
        </h3>
        <p className="text-sm text-soft-muted mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center justify-between text-xs text-soft-muted">
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>{course.totalLessons} 课时</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{course.duration} 分钟</span>
          </div>
        </div>
        
        <div className="flex items-center justify-end text-primary-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-4">
          <span>查看详情</span>
          <ChevronRight size={16} className="ml-1" />
        </div>
      </div>

      <div className="px-5 pb-5 -mt-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOutlineOpen(!isOutlineOpen);
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary-50 hover:bg-primary-100 text-primary-600 text-sm font-medium rounded-xl transition-colors"
        >
          <List size={16} />
          <span>{isOutlineOpen ? '收起' : '课程大纲'}</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${isOutlineOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOutlineOpen && corePoints.length > 0 && (
          <div className="mt-3 p-4 bg-white rounded-xl border border-primary-100">
            <h4 className="text-xs font-semibold text-primary-600 mb-3">核心知识点</h4>
            <ul className="space-y-2">
              {corePoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-soft-muted">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 text-primary-600 text-xs flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <span className="line-clamp-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link
          to={`/courses/${course.id}`}
          className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all text-sm"
        >
          <span>查看详情</span>
          <ChevronRight size={16} />
        </Link>
        
        <button
          onClick={handleCopyCode}
          className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 bg-accent-yellow/20 hover:bg-accent-yellow/30 text-yellow-600 text-sm font-medium rounded-xl transition-colors"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? '已复制' : '📋 复制代码'}</span>
        </button>
      </div>
    </Link>
  );
}
