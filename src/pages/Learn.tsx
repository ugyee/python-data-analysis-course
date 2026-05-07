import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockCourseDetails } from '@/data/mockData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, ChevronRight, Home, BookOpen, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/Layout';

export function Learn() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const course = mockCourseDetails[courseId || ''];

  if (!course) {
    return (
      <Layout showCodeRunner layoutType="learn">
        <div className="h-full overflow-y-auto bg-slate-900 rounded-2xl">
          <div className="p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <ArrowLeft size={16} />
              <span>课程不存在</span>
            </div>
          </div>
        </div>
        <div className="h-full overflow-y-auto bg-soft-bg rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-soft-text mb-4">课程不存在</h2>
            <Link to="/courses" className="text-orange-400 hover:text-orange-300">
              返回课程列表
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const allLessons = course.chapters.flatMap((ch) => ch.lessons);
  const currentLessonIndex = allLessons.findIndex((l) => l.id === lessonId);
  const currentLesson = allLessons[currentLessonIndex];
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const currentChapter = course.chapters.find((ch) =>
    ch.lessons.some((l) => l.id === lessonId)
  );

  if (!currentLesson) {
    return (
      <Layout showCodeRunner layoutType="learn">
        <aside className="h-full overflow-y-auto bg-slate-900 rounded-2xl">
          <div className="p-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={16} />
              返回
            </button>
            <h3 className="font-semibold text-white mb-4">{course.title}</h3>
          </div>
        </aside>
        <main className="h-full overflow-y-auto bg-soft-bg rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-soft-text mb-4">课时不存在</h2>
            <Link to={`/courses/${courseId}`} className="text-orange-400 hover:text-orange-300">
              返回课程详情
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout showCodeRunner layoutType="learn">
      {/* 左侧大纲 */}
      <aside className="h-full overflow-y-auto bg-slate-900 rounded-2xl">
        <div className="p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={16} />
            返回
          </button>
          <h3 className="font-semibold text-white mb-4">{course.title}</h3>
          <div className="space-y-2">
            {course.chapters.map((chapter, chapterIndex) => (
              <div key={chapter.id}>
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                  第{chapterIndex + 1}章 {chapter.title}
                </div>
                <div className="space-y-1 mb-4">
                  {chapter.lessons.map((lesson) => {
                    const isActive = lesson.id === lessonId;
                    return (
                      <Link
                        key={lesson.id}
                        to={`/learn/${courseId}/${lesson.id}`}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                          isActive
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <BookOpen size={14} />
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* 中间内容 */}
      <main className="h-full overflow-y-auto bg-soft-bg rounded-2xl">
        <div className="p-5">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-soft-muted mb-2 flex-wrap">
              <Link to="/" className="hover:text-soft-text transition-colors flex items-center gap-1">
                <Home size={14} />
                <span>首页</span>
              </Link>
              <ChevronRight size={14} />
              <Link to={`/courses/${courseId}`} className="hover:text-soft-text transition-colors">
                {course.title}
              </Link>
              <ChevronRight size={14} />
              <span className="text-soft-muted/60">{currentLesson.title}</span>
            </div>
            <h1 className="text-2xl font-bold text-soft-text">{currentLesson.title}</h1>
            {currentChapter && (
              <p className="text-soft-muted text-sm mt-1">{currentChapter.title}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-5 mb-6">
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {currentLesson.content || '暂无内容'}
              </ReactMarkdown>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-primary-100">
            <div>
              {prevLesson ? (
                <Link
                  to={`/learn/${courseId}/${prevLesson.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-soft-muted hover:text-soft-text transition-colors"
                >
                  <ChevronLeft size={18} />
                  上一节
                </Link>
              ) : (
                <div />
              )}
            </div>

            <div className="flex items-center gap-3">
              {nextLesson ? (
                <Link
                  to={`/learn/${courseId}/${nextLesson.id}`}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  下一节
                  <ChevronRight size={18} />
                </Link>
              ) : (
                <Link
                  to={`/courses/${courseId}`}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  完成课程
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
