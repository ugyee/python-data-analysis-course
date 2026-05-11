import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { CourseCard } from '@/components/CourseCard';
import { GetCodeModal } from '@/components/GetCodeModal';
import { mockCourses } from '@/data/mockData';
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, Star, Rocket, TrendingUp, Calendar, Users, CheckCircle, Play, Clock, Award, GraduationCap, List } from 'lucide-react';
import { SpaceRocketIllustration } from '@/components/Illustrations';
import { Layout } from '@/components/Layout';

const sidebarItems = [
  { id: 'course-overview', label: '课程概览', icon: BookOpen },
  { id: 'project-data-cleaning', label: '项目1: 数据清洗实战', icon: Rocket },
  { id: 'project-group-aggregation', label: '项目2: 分组聚合分析', icon: Rocket },
  { id: 'project-market-basket', label: '项目3: 购物篮分析', icon: Rocket },
  { id: 'project-customer-clustering', label: '项目4: 客户聚类分析', icon: Rocket },
  { id: 'project-data-visualization', label: '项目5: 数据可视化', icon: Rocket },
  { id: 'project-ab-testing', label: '项目6: A/B测试分析', icon: Rocket },
  { id: 'project-time-series', label: '项目7: 时间序列分析', icon: Rocket },
  { id: 'project-feature-engineering', label: '项目8: 特征工程', icon: Rocket },
  { id: 'project-anomaly-detection', label: '项目9: 异常值检测', icon: Rocket },
  { id: 'project-data-merging', label: '项目10: 多数据集合并', icon: Rocket },
  { id: 'instructor', label: '讲师介绍', icon: GraduationCap },
];

export function Home() {
  const { isAuthenticated } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('course-overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sectionIds = ['course-overview', ...sidebarItems.filter(item => item.id.startsWith('project-')).map(item => item.id), 'instructor'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        sectionRefs.current[id] = element;
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsSidebarOpen(false);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen">
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[280px] bg-white/80 backdrop-blur-xl border-r border-soft-bg border-soft-border shadow-card overflow-y-auto z-40">
          <div className="sticky top-0 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-soft-text">课程目录</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-soft-bg transition-colors"
              >
                <List size={20} className="text-soft-muted" />
              </button>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-100 to-accent-lavender/30 text-primary-700 font-semibold shadow-soft'
                        : 'text-soft-muted hover:bg-soft-bg hover:text-soft-text'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-primary-600' : ''} />
                    <span className="text-sm truncate">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-primary-500" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed bottom-4 left-4 z-50 flex items-center gap-2 px-4 py-3 bg-soft-gradient text-white rounded-full shadow-soft-lg hover:shadow-soft-xl transition-all"
        >
          <List size={20} />
          <span className="font-medium">目录</span>
        </button>

        <main className="flex-1 ml-0 lg:ml-[280px] pt-4 pb-12">
          <div className="pt-4 pb-12">
        <section className="mb-12">
          <div className="bg-gradient-to-br from-primary-100/60 via-accent-pink/20 to-accent-lavender/30 rounded-3xl p-8 shadow-soft relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-300/30 to-accent-pink/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent-green/20 to-accent-yellow/20 rounded-full blur-3xl" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-primary-600 text-sm font-medium mb-4 shadow-card">
                  <Sparkles size={16} />
                  <span>专为商务数据分析专业打造</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-soft-text mb-4 leading-tight">
                  掌握<span className="gradient-text">Python数据分析</span>
                  <br />
                  开启数据职业之路
                </h1>
                
                <div className="space-y-3 mb-6">
                  <p className="text-lg text-soft-muted">
                    <span className="text-soft-text font-medium">适合人群</span>：有一定 Python 基础、希望转向数据分析的大学生和职场人
                  </p>
                  <p className="text-lg text-soft-muted">
                    <span className="text-soft-text font-medium">学习收益</span>：掌握 Pandas、数据可视化、机器学习等核心技能
                  </p>
                  <p className="text-lg text-soft-muted">
                    <span className="text-soft-text font-medium">实战导向</span>：10 个真实业务场景项目，从入门到进阶
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link
                    to="/courses"
                    className="group flex items-center gap-2 px-8 py-4 bg-soft-gradient text-white font-semibold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all hover:scale-105"
                  >
                    <Rocket size={20} />
                    开始学习
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  {!isAuthenticated && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-8 py-4 bg-white text-soft-text font-semibold rounded-2xl shadow-card hover:shadow-soft transition-all"
                    >
                      获取项目代码
                    </button>
                  )}
                </div>
              </div>
              
              <div className="hidden lg:flex justify-center">
                <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float">
                  <rect x="50" y="50" width="300" height="200" rx="20" fill="white" stroke="#E8E4FF" strokeWidth="2"/>
                  <rect x="70" y="80" width="80" height="60" rx="10" fill="#F3F0FF"/>
                  <rect x="170" y="80" width="160" height="60" rx="10" fill="#F3F0FF"/>
                  <rect x="70" y="160" width="260" height="70" rx="10" fill="#F3F0FF"/>
                  <path d="M90 100 L130 130 L170 110" stroke="#8C7CF0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="130" cy="130" r="4" fill="#FFB5D9"/>
                  <circle cx="170" cy="110" r="4" fill="#FFB5D9"/>
                  <circle cx="90" cy="100" r="4" fill="#8C7CF0"/>
                  <rect x="85" y="175" width="40" height="8" rx="4" fill="#C6B9FF"/>
                  <rect x="135" y="175" width="60" height="8" rx="4" fill="#C6B9FF"/>
                  <rect x="205" y="175" width="30" height="8" rx="4" fill="#C6B9FF"/>
                  <rect x="245" y="175" width="70" height="8" rx="4" fill="#C6B9FF"/>
                  <rect x="85" y="190" width="80" height="8" rx="4" fill="#E8E4FF"/>
                  <rect x="175" y="190" width="50" height="8" rx="4" fill="#E8E4FF"/>
                  <rect x="235" y="190" width="80" height="8" rx="4" fill="#E8E4FF"/>
                  <rect x="85" y="205" width="60" height="8" rx="4" fill="#E8E4FF"/>
                  <rect x="155" y="205" width="90" height="8" rx="4" fill="#E8E4FF"/>
                  <rect x="255" y="205" width="55" height="8" rx="4" fill="#E8E4FF"/>
                  <circle cx="200" cy="110" r="25" fill="white" stroke="#8C7CF0" strokeWidth="2"/>
                  <path d="M192 110 L198 116 L210 104" stroke="#8C7CF0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="320" cy="70" r="15" fill="#FFB5D9" opacity="0.6"/>
                  <circle cx="340" cy="90" r="10" fill="#8C7CF0" opacity="0.4"/>
                  <circle cx="60" cy="200" r="12" fill="#C6B9FF" opacity="0.5"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <nav className="mb-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-card">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <a
                href="#course-overview"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-soft-muted hover:text-primary-600 hover:bg-primary-50 transition-all font-medium min-w-[120px]"
              >
                <BookOpen size={18} />
                <span className="hidden sm:inline">课程概览</span>
                <span className="sm:hidden">概览</span>
              </a>
              <a
                href="#projects"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-soft-muted hover:text-primary-600 hover:bg-primary-50 transition-all font-medium min-w-[120px]"
              >
                <Rocket size={18} />
                <span className="hidden sm:inline">实战项目</span>
                <span className="sm:hidden">项目</span>
              </a>
              <a
                href="#instructor"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-soft-muted hover:text-primary-600 hover:bg-primary-50 transition-all font-medium min-w-[120px]"
              >
                <GraduationCap size={18} />
                <span className="hidden sm:inline">讲师介绍</span>
                <span className="sm:hidden">讲师</span>
              </a>
            </div>
          </div>
        </nav>

        <section id="course-overview" className="mb-12 scroll-mt-24">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-lavender/30 rounded-full text-primary-600 text-sm font-medium mb-3">
              <BookOpen size={16} />
              <span>课程概览</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-soft-text mb-3">开启你的数据分析之旅</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-all">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-4">
                <Users size={28} className="text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-soft-text mb-2">目标学员</h3>
              <p className="text-soft-muted text-sm leading-relaxed">
                有一定 Python 基础、希望转向数据分析领域的大学生和职场人
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-all">
              <div className="w-14 h-14 rounded-2xl bg-accent-green/30 flex items-center justify-center mb-4">
                <CheckCircle size={28} className="text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-soft-text mb-2">前置知识</h3>
              <p className="text-soft-muted text-sm leading-relaxed">
                Python 基础语法、数据类型、循环函数；Pandas 初步了解
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-all">
              <div className="w-14 h-14 rounded-2xl bg-accent-pink/30 flex items-center justify-center mb-4">
                <Play size={28} className="text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold text-soft-text mb-2">学习方式</h3>
              <p className="text-soft-muted text-sm leading-relaxed">
                录播视频学习 + 实战代码练习 + 每周直播答疑辅导
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-all">
              <div className="w-14 h-14 rounded-2xl bg-accent-yellow/30 flex items-center justify-center mb-4">
                <Clock size={28} className="text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-soft-text mb-2">课程时长</h3>
              <p className="text-soft-muted text-sm leading-relaxed">
                20 小时视频课程 + 30 小时实战项目练习
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { icon: BookOpen, label: '实战项目', value: '10', color: 'bg-primary-100 text-primary-600' },
            { icon: TrendingUp, label: '练习题目', value: '100+', color: 'bg-accent-green/30 text-green-600' },
            { icon: Calendar, label: '课程时长', value: '60h+', color: 'bg-accent-yellow/30 text-yellow-600' },
            { icon: Star, label: '技能掌握', value: '10+', color: 'bg-accent-pink/30 text-pink-500' },
          ].map((stat, index) => (
            <div 
              key={index}
              className={`${stat.color} rounded-2xl p-4 flex items-center gap-3 animate-fadeIn`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon size={24} />
              <div>
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs opacity-80">{stat.label}</div>
              </div>
            </div>
          ))}
        </section>

        <section id="projects" className="scroll-mt-24">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-lavender/30 rounded-full text-primary-600 text-sm font-medium mb-3">
              <Sparkles size={16} />
              <span>核心课程体系</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-soft-text mb-3">十个实战项目</h2>
            <p className="text-soft-muted max-w-lg mx-auto">
              从数据清洗到机器学习，循序渐进掌握数据分析全流程
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockCourses.map((course, index) => {
              const projectId = `project-${course.id}`;
              const prevCourse = index > 0 ? mockCourses[index - 1] : null;
              const nextCourse = index < mockCourses.length - 1 ? mockCourses[index + 1] : null;

              return (
                <div 
                  key={course.id}
                  id={projectId}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CourseCard course={course} />
                  <div className="mt-3 flex items-center justify-between gap-2">
                    {prevCourse ? (
                      <a
                        href={`#project-${prevCourse.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50/70 hover:bg-primary-100 rounded-xl transition-all"
                      >
                        <ArrowLeft size={14} />
                        <span className="hidden sm:inline">上一节</span>
                        <span className="sm:hidden">←</span>
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100/50 rounded-xl cursor-not-allowed">
                        <ArrowLeft size={14} />
                        <span className="hidden sm:inline">上一节</span>
                        <span className="sm:hidden">←</span>
                      </span>
                    )}
                    {nextCourse ? (
                      <a
                        href={`#project-${nextCourse.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50/70 hover:bg-primary-100 rounded-xl transition-all ml-auto"
                      >
                        <span className="hidden sm:inline">下一节</span>
                        <span className="sm:hidden">→</span>
                        <ArrowRight size={14} />
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100/50 rounded-xl cursor-not-allowed ml-auto">
                        <span className="hidden sm:inline">下一节</span>
                        <span className="sm:hidden">→</span>
                        <ArrowRight size={14} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="instructor" className="mt-16 scroll-mt-24">
          <div className="bg-gradient-to-br from-white via-primary-50/50 to-accent-lavender/30 rounded-3xl p-8 shadow-soft relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-bl from-primary-300/30 to-accent-pink/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-accent-green/20 to-accent-yellow/20 rounded-full blur-3xl" />
            
            <div className="flex flex-col lg:flex-row items-center gap-8 relative">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary-200 via-primary-100 to-accent-pink/30 shadow-card flex items-center justify-center overflow-hidden">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="30" r="18" fill="#8C7CF0" opacity="0.6"/>
                    <path d="M10 70C10 52 23 40 40 40C57 40 70 52 70 70" stroke="#8C7CF0" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
                    <circle cx="40" cy="30" r="14" fill="#C6B9FF"/>
                    <path d="M26 60C26 48 32 42 40 42C48 42 54 48 54 60" stroke="#C6B9FF" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="36" cy="26" r="2" fill="#8C7CF0"/>
                    <circle cx="44" cy="26" r="2" fill="#8C7CF0"/>
                    <path d="M37 33C38 34 42 34 43 33" stroke="#8C7CF0" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-lavender/30 rounded-full text-primary-600 text-sm font-medium mb-3">
                  <GraduationCap size={16} />
                  <span>课程讲师</span>
                </div>
                <h3 className="text-2xl font-bold text-soft-text mb-2">某大厂数据分析团队负责人</h3>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-accent-yellow/20 rounded-full">
                    <Award size={14} className="text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700">10年+数据分析经验</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-accent-green/20 rounded-full">
                    <Users size={14} className="text-green-600" />
                    <span className="text-sm font-medium text-green-700">累计培养学员50000+</span>
                  </div>
                </div>
                <p className="text-soft-muted leading-relaxed max-w-2xl">
                  曾任某知名互联网公司数据分析部门负责人，主导过多个大型数据平台建设项目。
                  擅长将复杂的数据分析技术用通俗易懂的方式讲解，培养了数千名数据分析从业者。
                  课程内容紧密结合实际业务场景，注重实战技能的培养，深受学员好评。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="bg-gradient-to-br from-white via-primary-50/50 to-accent-pink/20 rounded-3xl p-8 shadow-soft text-center relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-bl from-primary-300/30 to-accent-pink/20 rounded-full blur-2xl" />
            
            <div className="relative">
              <div className="mb-6">
                <SpaceRocketIllustration />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-soft-text mb-3">准备好开始了吗？</h2>
              <p className="text-soft-muted mb-6 max-w-md mx-auto">
                加入我们，开始你的数据分析学习之旅。从入门到高级，循序渐进掌握核心技能。
              </p>
              <Link
                to={isAuthenticated ? "/profile" : "/courses"}
                onClick={!isAuthenticated ? (e) => { e.preventDefault(); setIsModalOpen(true); } : undefined}
                className="inline-flex items-center gap-2 px-8 py-4 bg-soft-gradient text-white font-semibold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all hover:scale-105"
              >
                {isAuthenticated ? "进入个人中心" : "获取项目代码"}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
      </main>
      
      <GetCodeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  </Layout>
  );
}
