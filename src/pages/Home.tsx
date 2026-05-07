import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { CourseCard } from '@/components/CourseCard';
import { mockCourses } from '@/data/mockData';
import { ArrowRight, BookOpen, Sparkles, Star, Rocket, TrendingUp, Calendar } from 'lucide-react';
import { HeroIllustration, SpaceRocketIllustration } from '@/components/Illustrations';
import { Layout } from '@/components/Layout';

export function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Layout>
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
                
                <p className="text-lg text-soft-muted mb-6 max-w-md">
                  十个实战项目，从入门到进阶，
                  循序渐进掌握数据分析核心技能
                </p>
                
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
                    <Link
                      to="/register"
                      className="px-8 py-4 bg-white text-soft-text font-semibold rounded-2xl shadow-card hover:shadow-soft transition-all"
                    >
                      免费注册
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="hidden lg:block">
                <HeroIllustration />
              </div>
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

        <section>
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
            {mockCourses.map((course, index) => (
              <div 
                key={course.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
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
                to={isAuthenticated ? "/profile" : "/register"}
                className="inline-flex items-center gap-2 px-8 py-4 bg-soft-gradient text-white font-semibold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all hover:scale-105"
              >
                {isAuthenticated ? "进入个人中心" : "立即注册"}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
