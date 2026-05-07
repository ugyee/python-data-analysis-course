import { useState, useMemo } from 'react';
import { CourseCard } from '@/components/CourseCard';
import { mockCourses } from '@/data/mockData';
import { Search, Filter } from 'lucide-react';
import { Layout } from '@/components/Layout';

export function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(mockCourses.map(c => c.category))];

  const filteredCourses = useMemo(() => {
    return mockCourses.filter((course) => {
      const matchesDifficulty = !selectedDifficulty || course.difficulty === selectedDifficulty;
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDifficulty && matchesCategory && matchesSearch;
    });
  }, [selectedDifficulty, selectedCategory, searchQuery]);

  return (
    <Layout>
      <div className="pt-4 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-soft-text mb-2">全部项目</h1>
          <p className="text-soft-muted">十个实战项目助你掌握数据分析核心技能</p>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-card mb-8">
          <div className="relative mb-5">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索课程..."
              className="w-full pl-12 pr-5 py-4 bg-primary-50 border-0 rounded-2xl text-soft-text placeholder-soft-muted focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-soft-muted" />
              <span className="text-sm text-soft-muted font-medium">难度</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: '', label: '全部' },
                { value: 'beginner', label: '入门' },
                { value: 'intermediate', label: '进阶' },
                { value: 'advanced', label: '高级' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setSelectedDifficulty(item.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedDifficulty === item.value
                      ? 'bg-soft-gradient text-white shadow-soft'
                      : 'bg-primary-50 text-soft-muted hover:text-primary-600 hover:bg-primary-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-soft-muted font-medium">分类</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  !selectedCategory
                    ? 'bg-soft-gradient text-white shadow-soft'
                    : 'bg-primary-50 text-soft-muted hover:text-primary-600 hover:bg-primary-100'
                }`}
              >
                全部
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-soft-gradient text-white shadow-soft'
                      : 'bg-primary-50 text-soft-muted hover:text-primary-600 hover:bg-primary-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-soft-muted">
            共 <span className="text-soft-text font-semibold">{filteredCourses.length}</span> 个项目
          </p>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl shadow-card">
            <p className="text-soft-muted text-lg">没有找到匹配的项目</p>
            <p className="text-soft-muted text-sm mt-2">试试调整筛选条件</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
