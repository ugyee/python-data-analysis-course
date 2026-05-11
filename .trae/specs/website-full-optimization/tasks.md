# Tasks

## [x] Task 1: 首页内容优化 - Banner和课程概览
- **Priority**: P0
- **Depends On**: None
- **Description**: 在首页添加Banner价值主张文案和课程概览模块
- **Acceptance Criteria Addressed**: Requirement-Banner, Requirement-课程概览
- **Test Requirements**:
  - `human-judgement` TR-1.1: Banner区域显示价值主张文案（2-3行）
  - `human-judgement` TR-1.2: 课程概览模块显示目标学员、前置知识、学习方式、课程时长

## [x] Task 2: 首页内容优化 - 讲师介绍和课程大纲折叠
- **Priority**: P0
- **Depends On**: None
- **Description**: 在首页添加讲师介绍区域和课程大纲折叠功能
- **Acceptance Criteria Addressed**: Requirement-讲师介绍, Requirement-课程大纲折叠
- **Test Requirements**:
  - `human-judgement` TR-2.1: 页面底部显示讲师介绍区域
  - `human-judgement` TR-2.2: 每个课程卡片有"课程大纲"按钮，点击可展开3-5个知识点

## [x] Task 3: 创建课程详情页
- **Priority**: P0
- **Depends On**: Task 1, Task 2
- **Description**: 为10个课程创建独立路由的详情页
- **Acceptance Criteria Addressed**: Requirement-课程详情页
- **Test Requirements**:
  - `human-judgement` TR-3.1: 每个课程有独立路由（如/courses/data-cleaning）
  - `human-judgement` TR-3.2: 详情页包含项目简介、技术栈、学习大纲、预期产出
  - `human-judgement` TR-3.3: 详情页有"开始项目"按钮（显示"即将开放"）

## [x] Task 4: 添加学习支持功能
- **Priority**: P1
- **Depends On**: Task 3
- **Description**: 在课程详情页添加FAQ面板、评论区、学习助手浮窗
- **Acceptance Criteria Addressed**: Requirement-FAQ, Requirement-评论区, Requirement-学习助手
- **Test Requirements**:
  - `human-judgement` TR-4.1: 详情页底部有FAQ折叠面板（2-3个问题）
  - `human-judgement` TR-4.2: 有"提问"按钮引导用户提交GitHub Issue
  - `human-judgement` TR-4.3: 右下角有学习助手浮窗图标，点击显示帮助信息

## [ ] Task 5: 导航栏重构
- **Priority**: P0
- **Depends On**: None
- **Description**: 重新设计导航栏，添加新链接，优化移动端体验
- **Acceptance Criteria Addressed**: Requirement-导航栏重构, Requirement-移动端适配
- **Test Requirements**:
  - `human-judgement` TR-5.1: 导航栏包含首页、所有课程、学习路线、关于我们
  - `human-judgement` TR-5.2: 移动端导航栏折叠为汉堡菜单
  - `human-judgement` TR-5.3: 所有交互元素点击区域不小于44x44像素

## [x] Task 6: SEO优化
- **Priority**: P1
- **Depends On**: None
- **Description**: 添加正确的title和meta description
- **Acceptance Criteria Addressed**: Requirement-SEO
- **Test Requirements**:
  - `programmatic` TR-6.1: 检查index.html的title是否为"Python数据分析实战：10个企业级项目 | 课程官网"
  - `programmatic` TR-6.2: 检查meta description包含数据分析核心技能描述

## [ ] Task 7: Banner数据分析示意图
- **Priority**: P2
- **Depends On**: Task 1
- **Description**: 在Banner区域添加数据分析示意图或SVG占位
- **Acceptance Criteria Addressed**: Requirement-Banner数据分析图
- **Test Requirements**:
  - `human-judgement` TR-7.1: Banner区域有数据分析相关的图片或SVG图形

## [x] Task 8: 同步到GitHub仓库
- **Priority**: P0
- **Depends On**: Task 1-7
- **Description**: 将所有更改同步到GitHub仓库
- **Acceptance Criteria Addressed**: None
- **Test Requirements**:
  - `programmatic` TR-8.1: git status显示无待提交更改
  - `programmatic` TR-8.2: git push成功完成

# Task Dependencies
- Task 3 depends on Task 1, Task 2
- Task 4 depends on Task 3
- Task 7 depends on Task 1
- Task 8 depends on Task 1-7
