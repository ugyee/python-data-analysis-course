import { Layout } from '@/components/Layout';
import { Users, Heart, Award, BookOpen, Target, Sparkles } from 'lucide-react';

const teamMembers = [
  {
    name: '李明',
    role: '课程总监',
    bio: '前阿里巴巴数据分析师，10年数据分析经验，专注于数据驱动决策',
    avatar: '👨‍💼',
  },
  {
    name: '王芳',
    role: '课程讲师',
    bio: '统计学博士，擅长数据可视化和统计建模，主讲数据分析核心课程',
    avatar: '👩‍🏫',
  },
  {
    name: '张强',
    role: '技术负责人',
    bio: '全栈工程师，负责课程平台开发和学习体验优化',
    avatar: '👨‍💻',
  },
  {
    name: '陈静',
    role: '教学设计师',
    bio: '教育学硕士，专注于在线教育课程设计和学习路径规划',
    avatar: '👩‍🎨',
  },
];

const features = [
  {
    icon: BookOpen,
    title: '实战导向',
    description: '精选10个真实企业项目，让你在实战中掌握数据分析技能',
  },
  {
    icon: Target,
    title: '系统学习',
    description: '从基础到进阶，循序渐进的学习路径，科学规划学习曲线',
  },
  {
    icon: Award,
    title: '权威认证',
    description: '完成课程可获得结业证书，为你的职业发展增添筹码',
  },
  {
    icon: Heart,
    title: '社区支持',
    description: '加入学习社群，与志同道合的伙伴一起成长，互相激励',
  },
];

export function About() {
  return (
    <Layout>
      <div className="pt-4 pb-12">
        <section className="mb-12">
          <div className="bg-gradient-to-br from-primary-100/60 via-accent-lavender/30 to-accent-pink/20 rounded-3xl p-8 shadow-soft relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-300/30 to-accent-pink/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent-green/20 to-accent-yellow/20 rounded-full blur-3xl" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-primary-600 text-sm font-medium mb-4 shadow-card">
                  <Sparkles size={16} />
                  <span>关于我们</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-bold text-soft-text mb-4">
                  让每个人都能<br />
                  <span className="gradient-text">掌握数据分析</span>
                </h1>
                
                <p className="text-lg text-soft-muted mb-6">
                  我们相信数据分析是未来职场最重要的技能之一。通过系统化的课程设计和实战项目，我们帮助更多人开启数据职业之路。
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-card">
                    <Users size={18} className="text-primary-500" />
                    <span className="text-soft-text font-medium">1000+ 学员</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-card">
                    <BookOpen size={18} className="text-accent-pink" />
                    <span className="text-soft-text font-medium">10 实战项目</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:flex justify-center">
                <div className="w-80 h-80 rounded-3xl bg-white/50 backdrop-blur-sm shadow-soft flex items-center justify-center">
                  <span className="text-8xl">📊</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-soft-text mb-3">为什么选择我们</h2>
            <p className="text-soft-muted max-w-lg mx-auto">
              我们专注于提供高质量的数据分析教育，让学习更高效、更实战
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-all text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-lavender/30 flex items-center justify-center mx-auto mb-4">
                    <Icon size={28} className="text-primary-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-soft-text mb-2">{feature.title}</h3>
                  <p className="text-soft-muted text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-lavender/30 rounded-full text-primary-600 text-sm font-medium mb-3">
              <Users size={16} />
              <span>核心团队</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-soft-text mb-3">专业团队，倾力打造</h2>
            <p className="text-soft-muted max-w-lg mx-auto">
              由行业专家和教育工作者组成的团队，为你提供最优质的学习体验
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-all text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-accent-lavender/30 flex items-center justify-center mx-auto mb-4 text-5xl">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-soft-text mb-1">{member.name}</h3>
                <p className="text-sm text-primary-500 font-medium mb-3">{member.role}</p>
                <p className="text-soft-muted text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="bg-gradient-to-br from-white via-primary-50/50 to-accent-pink/20 rounded-3xl p-8 shadow-soft text-center relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-bl from-primary-300/30 to-accent-pink/20 rounded-full blur-2xl" />
            
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-soft-text mb-3">联系我们</h2>
              <p className="text-soft-muted mb-6 max-w-md mx-auto">
                如果你有任何问题或建议，欢迎通过以下方式联系我们
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-6 py-3 bg-white rounded-xl shadow-card">
                  <span className="text-soft-muted text-sm">📧 邮箱: contact@example.com</span>
                </div>
                <div className="px-6 py-3 bg-white rounded-xl shadow-card">
                  <span className="text-soft-muted text-sm">📱 微信: data_analysis</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
