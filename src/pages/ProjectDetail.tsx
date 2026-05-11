import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockCourseDetails } from '@/data/mockData';
import { Clock, BookOpen, Play, ChevronRight, ArrowLeft, Target, Code, FileText, TrendingUp, ChevronDown, MessageCircle, HelpCircle, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Layout } from '@/components/Layout';

const technologyStackInfo: Record<string, { name: string; description: string; icon: string }[]> = {
  'data-cleaning': [
    { name: 'Pandas', description: '数据处理和分析的核心库', icon: '🐼' },
    { name: 'NumPy', description: '数值计算基础库', icon: '🔢' },
    { name: 'SciPy', description: '科学计算统计函数', icon: '📊' },
  ],
  'group-aggregation': [
    { name: 'Pandas', description: '分组聚合核心操作', icon: '🐼' },
    { name: 'NumPy', description: '高效数值计算', icon: '🔢' },
  ],
  'market-basket': [
    { name: 'mlxtend', description: '关联规则挖掘库', icon: '📦' },
    { name: 'Pandas', description: '数据预处理', icon: '🐼' },
  ],
  'customer-clustering': [
    { name: 'Scikit-learn', description: '聚类分析算法', icon: '🎯' },
    { name: 'Pandas', description: '数据处理', icon: '🐼' },
    { name: 'Matplotlib', description: '结果可视化', icon: '📈' },
  ],
  'data-visualization': [
    { name: 'Matplotlib', description: '基础绑图库', icon: '📊' },
    { name: 'Seaborn', description: '统计可视化库', icon: '📈' },
    { name: 'Pandas', description: '数据绑定预处理', icon: '🐼' },
  ],
  'ab-testing': [
    { name: 'SciPy', description: '统计检验函数', icon: '🔬' },
    { name: 'StatsModels', description: '统计分析模型', icon: '📉' },
    { name: 'Pandas', description: '数据处理', icon: '🐼' },
  ],
  'time-series': [
    { name: 'Pandas', description: '时间序列处理', icon: '🐼' },
    { name: 'StatsModels', description: '时间序列模型', icon: '📊' },
    { name: 'Matplotlib', description: '趋势可视化', icon: '📈' },
  ],
  'feature-engineering': [
    { name: 'Scikit-learn', description: '特征变换和选择', icon: '⚙️' },
    { name: 'Pandas', description: '数据处理', icon: '🐼' },
  ],
  'anomaly-detection': [
    { name: 'Scikit-learn', description: '异常检测算法', icon: '🎯' },
    { name: 'SciPy', description: '统计方法', icon: '🔬' },
    { name: 'Pandas', description: '数据处理', icon: '🐼' },
  ],
  'data-merging': [
    { name: 'Pandas', description: '数据合并和连接', icon: '🐼' },
    { name: 'NumPy', description: '数值计算支持', icon: '🔢' },
  ],
};

const defaultTechStack = [
  { name: 'Pandas', description: '数据处理和分析的核心库', icon: '🐼' },
  { name: 'Python', description: '编程语言基础', icon: '🐍' },
];

const getExpectedOutputs = (courseId: string): string[] => {
  const outputs: Record<string, string[]> = {
    'data-cleaning': [
      '一份经过清洗处理的数据集',
      '数据质量评估报告',
      '异常值检测和处理方案',
    ],
    'group-aggregation': [
      '分组统计汇总表',
      '透视表分析报告',
      '业务洞察文档',
    ],
    'market-basket': [
      '商品关联规则分析报告',
      '高价值购物组合推荐',
      '商品摆放优化建议',
    ],
    'customer-clustering': [
      '客户分群结果报告',
      '各群体特征分析',
      '精准营销策略建议',
    ],
    'data-visualization': [
      '专业数据可视化图表',
      '数据故事演示文稿',
      '业务分析报告',
    ],
    'ab-testing': [
      'A/B测试设计方案',
      '统计分析结果报告',
      '产品优化建议',
    ],
    'time-series': [
      '时间序列分析报告',
      '趋势预测结果',
      '季节性分析图表',
    ],
    'feature-engineering': [
      '特征工程处理方案',
      '特征重要性报告',
      '模型性能对比分析',
    ],
    'anomaly-detection': [
      '异常检测分析报告',
      '异常点清单',
      '风险预警方案',
    ],
    'data-merging': [
      '多数据源整合方案',
      '合并后的完整数据集',
      '数据质量报告',
    ],
  };
  return outputs[courseId] || ['项目实战报告', '代码实现文档'];
};

export function ProjectDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourseDetails[courseId || ''];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showAssistant, setShowAssistant] = useState(false);

  const faqItems = [
    {
      question: '本项目的代码有提供吗？',
      answer: '是的，所有项目代码都会在课程中提供。您可以在每个章节的实战练习部分下载完整的项目代码，我们也鼓励您在理解代码的基础上进行改进和扩展。',
    },
    {
      question: '遇到bug怎么办？',
      answer: '在学习过程中遇到问题是很正常的。您可以：1) 查看课程的讨论区，看看是否有类似问题的解决方案；2) 通过页面右下角的学习助手联系我们；3) 在GitHub上提交Issue，我们会尽快回复。',
    },
    {
      question: '学完能达到什么水平？',
      answer: '完成本项目后，您将掌握该领域的核心技能，具备独立完成实战项目的能力。我们设计的项目紧贴真实业务场景，学完即可应用于实际工作中。',
    },
  ];

  const githubIssueUrl = `https://github.com/your-repo/your-project/issues/new?title=[${course?.title}] 提问&body=请描述您的问题...`;

  if (!course) {
    return (
      <Layout>
        <div className="min-h-screen bg-soft-bg pt-24 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-soft-text mb-4">课程不存在</h2>
            <Link to="/courses" className="text-primary-500 hover:text-primary-600">
              返回课程列表
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const totalLessons = course.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const totalDuration = course.chapters.reduce(
    (acc, ch) => acc + ch.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.duration, 0),
    0
  );
  const firstLesson = course.chapters[0]?.lessons[0];
  const techStack = technologyStackInfo[courseId || ''] || defaultTechStack;
  const expectedOutputs = getExpectedOutputs(courseId || '');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return { bg: 'bg-accent-green/20', text: 'text-green-600', label: '入门' };
      case 'intermediate':
        return { bg: 'bg-accent-yellow/30', text: 'text-yellow-600', label: '进阶' };
      case 'advanced':
        return { bg: 'bg-accent-pink/30', text: 'text-pink-500', label: '高级' };
      default:
        return { bg: 'bg-primary-100', text: 'text-primary-600', label: '初级' };
    }
  };

  const difficultyStyle = getDifficultyColor(course.difficulty);

  return (
    <Layout>
      <div className="pt-4 pb-12 max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-soft-muted hover:text-soft-text transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>返回</span>
        </button>

        <div className="relative h-80 rounded-3xl overflow-hidden mb-8">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyStyle.bg} ${difficultyStyle.text}`}>
                {difficultyStyle.label}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                {course.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{course.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>{totalLessons} 课时</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{totalDuration} 分钟</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-soft p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-semibold text-soft-text">项目简介</h2>
          </div>
          <p className="text-soft-muted leading-relaxed text-base">
            {course.description}本项目将带你从基础概念出发，通过循序渐进的章节设计，
            逐步掌握核心知识点。每个章节都配有详细的理论讲解和实战练习，
            确保你能够真正理解和应用所学内容。项目结束时，你将完成一个完整的实战案例，
            积累宝贵的项目经验。
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-soft p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-semibold text-soft-text">技术栈说明</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl border border-primary-100 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{tech.icon}</span>
                <div>
                  <h3 className="font-semibold text-soft-text mb-1">{tech.name}</h3>
                  <p className="text-sm text-soft-muted">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-soft p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-semibold text-soft-text">完整学习大纲</h2>
          </div>
          <div className="space-y-4">
            {course.chapters.map((chapter, chapterIndex) => (
              <div key={chapter.id} className="border border-primary-100 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-primary-500 to-purple-500 px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 text-white text-sm font-semibold flex items-center justify-center">
                      {chapterIndex + 1}
                    </span>
                    <h3 className="font-semibold text-white">
                      {chapter.title}
                    </h3>
                    <span className="ml-auto text-white/70 text-sm">
                      {chapter.lessons.length} 节课时
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-primary-100 bg-white">
                  {chapter.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-primary-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs flex items-center justify-center font-medium">
                          {lessonIndex + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          {lesson.type === 'quiz' ? (
                            <span className="text-yellow-500 text-sm">📝</span>
                          ) : lesson.type === 'practice' ? (
                            <span className="text-green-500 text-sm">💻</span>
                          ) : (
                            <span className="text-blue-500 text-sm">📖</span>
                          )}
                          <span className="text-soft-text font-medium">{lesson.title}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-soft-muted">
                        <span className="px-2 py-1 bg-primary-50 rounded-lg">
                          {lesson.duration}分钟
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-3xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-white" />
            <h2 className="text-xl font-semibold text-white">预期学习产出</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {expectedOutputs.map((output, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 text-white text-sm font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-white font-medium">{output}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-soft p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-semibold text-soft-text">常见问题</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <div key={index} className="border border-primary-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary-50 to-purple-50 hover:from-primary-100 hover:to-purple-100 transition-colors"
                >
                  <span className="font-medium text-soft-text text-left">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-primary-500 flex-shrink-0 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'max-h-48' : 'max-h-0'}`}
                >
                  <p className="px-5 py-4 text-soft-muted leading-relaxed bg-white">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-soft p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-semibold text-soft-text">讨论与提问</h2>
          </div>
          <p className="text-soft-muted mb-4">
            有问题想和我们讨论？或者发现了课程中的错误？欢迎通过 GitHub Issue 提交反馈，我们会尽快回复！
          </p>
          <a
            href={githubIssueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all"
          >
            <ExternalLink size={18} />
            <span>在 GitHub 上提问</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={`/learn/${courseId}/${firstLesson?.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-primary-500/30 transition-all"
          >
            <Play size={20} />
            <span>开始学习</span>
          </Link>
          <button
            disabled
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 text-gray-500 font-semibold rounded-2xl cursor-not-allowed"
          >
            <span>即将开放</span>
          </button>
        </div>

        <div className="fixed bottom-6 right-6 z-50">
          {showAssistant && (
            <div className="mb-3 w-72 bg-white rounded-2xl shadow-lg border border-primary-100 overflow-hidden animate-fade-in">
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary-500 to-purple-500">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-white" />
                  <span className="font-semibold text-white">学习助手</span>
                </div>
                <button
                  onClick={() => setShowAssistant(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4 space-y-4">
                <p className="text-sm text-soft-muted leading-relaxed">
                  遇到问题了吗？您可以通过以下方式联系我们：
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">📧</span>
                    </div>
                    <div>
                      <p className="text-xs text-soft-muted mb-1">邮箱</p>
                      <p className="text-sm font-medium text-soft-text">support@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">💬</span>
                    </div>
                    <div>
                      <p className="text-xs text-soft-muted mb-1">微信群</p>
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                        <span className="text-xs text-gray-400">二维码</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => setShowAssistant(!showAssistant)}
            className={`w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 shadow-lg hover:shadow-xl hover:shadow-primary-500/30 flex items-center justify-center transition-all ${showAssistant ? 'rotate-45' : ''}`}
          >
            <HelpCircle className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </Layout>
  );
}
