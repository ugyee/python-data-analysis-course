# Tasks

## [ ] Task 1: 修改按钮为获取代码 + 模态框
- **Priority**: P0
- **Depends On**: None
- **Description**: 将"立即注册"按钮改为"获取项目代码"，实现模态框（含前端校验）
- **Acceptance Criteria Addressed**: R1
- **Test Requirements**:
  - `human-judgement` TR-1.1: 点击弹出模态框
  - `human-judgement` TR-1.2: 空值校验显示红色提示
  - `human-judgement` TR-1.3: 提交模拟成功通知

## [x] Task 2: 实现顶部水平导航 + 平滑滚动
- **Priority**: P0
- **Depends On**: None
- **Description**: 实现顶部水平导航菜单，三个链接，点击可滚动到对应区域
- **Acceptance Criteria Addressed**: R2
- **Test Requirements**:
  - `human-judgement` TR-2.1: 三个链接（课程概览、实战项目、讲师介绍）
  - `human-judgement` TR-2.2: 点击可滚动到对应区域

## [x] Task 3: 添加复制代码功能
- **Priority**: P0
- **Depends On**: None
- **Description**: 为10个项目卡片添加复制按钮，每个项目有独立的初始化代码模板
- **Acceptance Criteria Addressed**: R3
- **Test Requirements**:
  - `human-judgement` TR-3.1: 每个卡片有复制按钮
  - `human-judgement` TR-3.2: 点击复制正确内容并通知

## [ ] Task 4: 实现左侧侧边栏
- **Priority**: P1
- **Depends On**: None
- **Description**: 实现固定左侧侧边栏（280px），包含全部章节列表，使用Intersection Observer实现滚动高亮
- **Acceptance Criteria Addressed**: R4
- **Test Requirements**:
  - `human-judgement` TR-4.1: 侧边栏固定，章节完整
  - `human-judgement` TR-4.2: 滚动高亮正确，点击锚点平滑滚动

## [x] Task 5: 实现上一节/下一节按钮
- **Priority**: P1
- **Depends On**: Task 4
- **Description**: 每个项目底部显示跳转按钮，边界情况（首/末）正确处理
- **Acceptance Criteria Addressed**: R5
- **Test Requirements**:
  - `human-judgement` TR-5.1: 按钮显示正确
  - `human-judgement` TR-5.2: 边界情况处理正确

## [x] Task 6: 实现回到顶部按钮
- **Priority**: P1
- **Depends On**: None
- **Description**: 右下角悬浮按钮，滚动超过300px显示，点击平滑回顶
- **Acceptance Criteria Addressed**: R6
- **Test Requirements**:
  - `human-judgement` TR-6.1: 滚动超过300px显示
  - `human-judgement` TR-6.2: 点击平滑回顶

## [x] Task 7: 重构页面布局
- **Priority**: P1
- **Depends On**: None
- **Description**: 最大宽度1400px居中 + 两列卡片网格布局
- **Acceptance Criteria Addressed**: 页面布局
- **Test Requirements**:
  - `human-judgement` TR-7.1: 主容器居中，卡片两列

## [x] Task 8: 统一样式
- **Priority**: P2
- **Depends On**: None
- **Description**: 标题层级、行高、关键词高亮、代码块深色主题
- **Acceptance Criteria Addressed**: R7
- **Test Requirements**:
  - `human-judgement` TR-8.1: 视觉符合设计稿
  - `human-judgement` TR-8.2: 代码块样式正确

## [ ] Task 9: 同步到GitHub
- **Priority**: P0
- **Depends On**: Task 1-8
- **Description**: 将所有更改同步到GitHub仓库
- **Acceptance Criteria Addressed**: None
- **Test Requirements**:
  - `programmatic` TR-9.1: git push成功完成

# Task Dependencies
- Task 5 depends on Task 4
- Task 9 depends on Task 1-8
