import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ArrowRight, CheckCircle, Clock, BookOpen, Target, Zap, TrendingUp, Layers, Database, BarChart3, GitBranch } from 'lucide-react';

const learningPath = [
  {
    phase: '第一阶段',
    title: '数据分析基础',
    description: '掌握Python数据分析核心库，为后续项目实战打下坚实基础',
    duration: '2周',
    icon: Database,
    color: 'from-primary-400 to-primary-600',
    bgColor: 'bg-primary-100',
    courses: [
      { id: 1, name: 'Python环境与Pandas基础', status: 'completed', progress: 100 },
      { id: 2, name: '数据清洗与预处理', status: 'completed', progress: 100 },
      { id: 3, name: '探索性数据分析(EDA)', status: 'current', progress: 60 },
    ],
  },
  {
    phase: '第二阶段',
    title: '数据可视化',
    description: '学习多种可视化工具，让数据讲故事',
    duration: '1.5周',
    icon: BarChart3,
    color: 'from-accent-pink to-pink-500',
    bgColor: 'bg-accent-pink/20',
    courses: [
      { id: 4, name: 'Matplotlib可视化基础', status: 'locked', progress: 0 },
      { id: 5, name: 'Seaborn统计图表', status: 'locked', progress: 0 },
      { id: 6, name: '交互式可视化 Plotly', status: 'locked', progress: 0 },
    ],
  },
  {
    phase: '第三阶段',
    title: '统计分析与检验',
    description: '深入理解统计原理，做出数据驱动的决策',
    duration: '2周',
    icon: TrendingUp,
    color: 'from-accent-green to-green-500',
    bgColor: 'bg-accent-green/20',
    courses: [
      { id: 7, name: '描述性统计分析', status: 'locked', progress: 0 },
      { id: 8, name: '假设检验与A/B测试', status: 'locked', progress: 0 },
      { id: 9, name: '相关性分析', status: 'locked', progress: 0 },
    ],
  },
  {
    phase: '第四阶段',
    title: '机器学习入门',
    description: '掌握经典机器学习算法，解决实际问题',
    duration: '3周',
    icon: Layers,
    color: 'from-accent-yellow to-yellow-500',
    bgColor: 'bg-accent-yellow/20',
    courses: [
      { id: 10, name: '回归分析与预测', status: 'locked', progress: 0 },
      { id: 11, name: '分类算法实战', status: 'locked', progress: 0 },
      { id: 12, name: '聚类分析', status: 'locked', progress: 0 },
    ],
  },
  {
    phase: '第五阶段',
    title: '时间序列分析',
    description: '学习时间序列数据的分析方法与预测技术',
    duration: '1.5周',
    icon: Clock,
    color: 'from-accent-lavender to-purple-500',
    bgColor: 'bg-accent-lavender/30',
    courses: [
      { id: 13, name: '时间序列基础', status: 'locked', progress: 0 },
      { id: 14, name: '趋势与季节性分析', status: 'locked', progress: 0 },
      { id: 15, name: '预测模型实战', status: 'locked', progress: 0 },
    ],
  },
];

const skills = [
  { name: 'Pandas数据处理', level: 95 },
  { name: '数据可视化', level: 90 },
  { name: '统计分析', level: 85 },
  { name: '机器学习', level: 80 },
  { name: '时间序列', level: 75 },
];

export function LearningPath() {
  return (
    <Layout>
      <div className="pt-4 pb-12">
        <section className="mb-12">
          <div className="bg-gradient-to-br from-primary-100/60 via-accent-lavender/30 to-accent-pink/20 rounded-3xl p-8 shadow-soft relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-300/30 to-accent-pink/20 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-primary-600 text-sm font-medium mb-4 shadow-card">
                <Target size={16} />
                <span>系统化学习路径</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-soft-text mb-4">
                专属<span className="gradient-text">学习路线</span>
              </h1>
              
              <p className="text-lg text-soft-muted max-w-2xl mb-6">
                从零基础到数据分析师，10周系统学习路径。循序渐进，每个阶段都有明确的目标和实战项目。
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-card">
                  <BookOpen size={18} className="text-primary-500" />
                  <span className="text-soft-text font-medium">15个核心模块</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-card">
                  <Clock size={18} className="text-accent-pink" />
                  <span className="text-soft-text font-medium">约10周学习周期</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-card">
                  <Zap size={18} className="text-accent-yellow" />
                  <span className="text-soft-text font-medium">10个实战项目</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-soft-gradient flex items-center justify-center shadow-soft">
              <GitBranch size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-soft-text">学习阶段</h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-accent-pink to-accent-lavender hidden md:block" />
            
            <div className="space-y-6">
              {learningPath.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <div key={index} className="relative">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex md:flex-col items-center md:items-center gap-4 md:w-20 shrink-0">
                        <div className={`w-16 h-16 rounded-2xl ${phase.bgColor} flex items-center justify-center shadow-soft shrink-0`}>
                          <Icon size={28} className="text-primary-500" />
                        </div>
                        <div className="hidden md:flex flex-col items-center gap-1">
                          <span className="text-xs font-medium text-soft-muted">{phase.phase}</span>
                          <span className="text-sm font-semibold text-soft-text">{phase.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-all">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <h3 className="text-xl font-bold text-soft-text">{phase.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${phase.color} text-white`}>
                            {phase.phase}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-soft-muted">
                            <Clock size={14} />
                            {phase.duration}
                          </span>
                        </div>
                        
                        <p className="text-soft-muted mb-4">{phase.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {phase.courses.map((course, courseIndex) => (
                            <div 
                              key={courseIndex}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                course.status === 'completed' 
                                  ? 'bg-accent-green/10 border-accent-green/30' 
                                  : course.status === 'current'
                                  ? 'bg-primary-50 border-primary-200'
                                  : 'bg-gray-50 border-gray-100'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                {course.status === 'completed' && (
                                  <CheckCircle size={16} className="text-green-500" />
                                )}
                                <span className={`text-sm font-medium ${
                                  course.status === 'completed' 
                                    ? 'text-green-600' 
                                    : course.status === 'current'
                                    ? 'text-primary-600'
                                    : 'text-gray-400'
                                }`}>
                                  {course.name}
                                </span>
                              </div>
                              {course.status !== 'locked' && (
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className={`h-1.5 rounded-full ${
                                      course.status === 'completed' 
                                        ? 'bg-green-500' 
                                        : 'bg-primary-500'
                                    }`}
                                    style={{ width: `${course.progress}%` }}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Link
                            to={`/courses/${phase.courses[0].id}`}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                          >
                            开始学习
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-card">
            <h2 className="text-2xl font-bold text-soft-text mb-6">学习完本路线后，你将掌握</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-soft-text font-medium">{skill.name}</span>
                    <span className="text-soft-muted text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-soft-gradient transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="bg-gradient-to-br from-white via-primary-50/50 to-accent-pink/20 rounded-3xl p-8 shadow-soft text-center relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-bl from-primary-300/30 to-accent-pink/20 rounded-full blur-2xl" />
            
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-soft-text mb-3">准备好开始学习了吗？</h2>
              <p className="text-soft-muted mb-6 max-w-md mx-auto">
                跟随系统化学习路径，从入门到精通，成为合格的数据分析师。
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 bg-soft-gradient text-white font-semibold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all hover:scale-105"
              >
                查看全部课程
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
