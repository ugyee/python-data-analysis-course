# 网站全面优化 Spec

## Why
当前网站仅有简单的项目列表页，缺少价值主张、课程详情、学习支持功能和良好的SEO/移动端体验。需要进行全面的页面内容优化、功能增强和用户体验提升。

## What Changes
1. **首页内容优化**：添加Banner价值主张、课程概览模块、讲师介绍、课程大纲折叠功能
2. **课程详情页创建**：为10个项目创建独立路由的详情页
3. **学习支持功能**：FAQ面板、评论区、学习助手浮窗
4. **导航重构**：重新设计导航栏，优化SEO和移动端适配

## Impact
- Affected specs: 首页、课程详情页、导航组件、学习支持
- Affected code: Home.tsx, Sidebar.tsx, App.tsx, 新建CourseDetailPage.tsx

## ADDED Requirements

### Requirement: Banner价值主张区域
页面顶部Banner区域应包含2-3行价值主张文案，说明课程适合人群和学习后的收益。

#### Scenario: Banner展示
- **WHEN** 用户访问首页
- **THEN** Banner区域显示价值主张文案，包括目标人群和课程收益

### Requirement: 课程概览模块
项目列表前应包含课程概览，展示目标学员、前置知识、学习方式和课程时长。

#### Scenario: 课程概览展示
- **WHEN** 用户访问首页
- **THEN** 课程概览模块显示在Banner下方、项目列表之前

### Requirement: 讲师介绍区域
页面底部应包含讲师/机构介绍区域。

#### Scenario: 讲师介绍展示
- **WHEN** 用户滚动到页面底部
- **THEN** 显示讲师/机构介绍信息

### Requirement: 课程大纲折叠功能
每个课程条目下方应有"课程大纲"按钮，点击可展开核心知识点。

#### Scenario: 课程大纲折叠
- **WHEN** 用户点击课程条目下方的"课程大纲"按钮
- **THEN** 展开显示3-5个核心知识点

### Requirement: 课程详情页
每个项目应有独立的详情页，包含完整的学习内容信息。

#### Scenario: 访问课程详情
- **WHEN** 用户点击课程卡片的"查看详情"按钮
- **THEN** 跳转到独立路由的课程详情页

### Requirement: FAQ折叠面板
项目详情页底部应包含常见问题折叠面板。

#### Scenario: FAQ展示
- **WHEN** 用户在课程详情页滚动到底部
- **THEN** 显示FAQ折叠面板，包含2-3个通用问题

### Requirement: 评论区功能
课程详情页应支持用户评论/提问功能。

#### Scenario: 评论/提问
- **WHEN** 用户点击"提问"按钮
- **THEN** 引导用户通过GitHub Issue或Giscus提交评论

### Requirement: 学习助手浮窗
页面右下角应有固定的学习助手图标。

#### Scenario: 学习助手
- **WHEN** 用户点击右下角学习助手图标
- **THEN** 显示帮助提示信息（邮箱、微信群等）

### Requirement: 导航栏重构
重新设计顶部导航栏，包含首页、所有课程、学习路线、关于我们。

#### Scenario: 导航栏展示
- **WHEN** 用户访问网站
- **THEN** 导航栏显示首页、所有课程、学习路线、关于我们链接

### Requirement: SEO优化
页面应包含正确的title和meta description。

#### Scenario: SEO标签
- **WHEN** 搜索引擎爬虫访问页面
- **THEN** title为"Python数据分析实战：10个企业级项目 | 课程官网"
- **THEN** meta description包含数据分析核心技能描述

### Requirement: 移动端适配
导航栏在移动端应折叠为汉堡菜单。

#### Scenario: 移动端导航
- **WHEN** 用户使用移动设备访问
- **THEN** 导航栏折叠为汉堡菜单，点击展开全屏导航

## MODIFIED Requirements

### Requirement: 首页布局
**原要求**：仅有项目列表
**修改为**：包含Banner区域、课程概览模块、项目列表、讲师介绍区域

### Requirement: 导航栏
**原要求**：首页、课程、练习、测评、登录
**修改为**：首页、所有课程、学习路线、关于我们

### Requirement: 课程卡片
**原要求**：仅显示课程标题
**修改为**：显示课程标题 + 查看详情按钮 + 课程大纲折叠

## REMOVED Requirements
无
