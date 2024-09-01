---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Git 管理 - 如何修改上一次 Commit 的注释？"
pubDate: 2024-09-01
description: "Blog"
author: "MrSouthWall"
image:
    url: "https://images.pexels.com/photos/18577252/pexels-photo-18577252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    alt: "风景照"
tags: ["Git", "Developer"]
---

## 起因

一开始并不了解代码 Git 管理的机制，之前还曾因为推送问题，把 MoneyBox 的所有代码，复制到新的 Xcode 工程文件里，并且重新创建了 GitHub 仓库，后来每一次推送都十分小心翼翼。

在一次的 Git 管理测试里了解到，在 Xcode 里使用 Amend 功能，其本质是提交一个新的 Commit 替代最近一次的旧提交。这就会导致这次新的 Commit 的 Hash 值与旧 Commit 的不一致，而由于我已经将错误的 Commit 推送到了 GitHub ，所以 Amend 后再次 Push，Xcode 便提示：

==The local repository is out of date. - 本地存储库已过时。==

---

## 问题描述

我在最近的一次 Commit 的注释里，多打了一个空格，并将这个错误的注释 Push 到了 GitHub 上，破坏了我历史提交注释的一致性，让我这个强迫症非常难受。

> ✅ 样式：彻底去除自定义的Form背景颜色，使用UIKit的.systemGroupedBackground
> 
> ❌ 样式： 彻底去除自定义的Form背景颜色，使用UIKit的.systemGroupedBackground

于是我便着手查找修复错误的方法。

---

## 修复问题

经过一个晚上和第二天中午半个小时的查询与了解，可以通过强制推送的方法解决这个错误，但由于 GitHub 官方[强烈不推荐使用强制推送](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/changing-a-commit-message#amending-older-or-multiple-commit-messages)，因为==强制推送会对仓库其他协作者造成麻烦：==

>We strongly discourage force pushing, since this changes the history of your repository. If you force push, people who have already cloned your repository will have to manually fix their local history. For more information, see "[Recovering from upstream rebase](https://git-scm.com/docs/git-rebase#_recovering_from_upstream_rebase)" in the Git manual.
>
我们强烈反对强制推送，因为这会改变您的存储库的历史记录。如果你强制推送，已经克隆你的存储库的人将不得不手动修复他们的本地历史记录。有关更多信息，请参阅 Git 手册中的“[从上游变基恢复](https://git-scm.com/docs/git-rebase#_recovering_from_upstream_rebase)”。

于是我决定就任由这个错误发生在我的 Commit 历史里。

但是在第二天，我还是忍不住，去了解了一下强制推送会造成的问题，对于个人项目其实没有太大的关系：

>**Q: **强制推送会有什么影响
>
>**A: **强制推送（force push）在Git中通常用于在远程仓库中重写历史记录。虽然这是一个强大的功能，但它也带来了一些潜在的风险和影响，特别是在团队协作环境中：
>
>**1. 历史更改的影响：**强制推送会替换远程仓库中的提交历史，这可能会导致其他协作者的本地历史与远程仓库不同步。如果其他开发者基于被替换的历史进行了工作，他们可能会遇到合并冲突，或者更糟糕的是，他们的改动可能会丢失。
>
>**2. 合并冲突：**当协作者尝试拉取或推送到远程仓库时，如果远程历史已被强制更改，他们可能会遇到合并冲突。这要求他们手动解决这些冲突，以便他们的工作可以正确地合并到更新的历史中。
>
> **3. 数据丢失风险：**如果远程仓库中的提交被强制推送操作覆盖或删除，而这些提交包含了未合并或未备份的重要代码，那么这部分代码可能会永久丢失。
>
> **4. 协作障碍：**频繁的强制推送可能导致团队成员在同步和合并时遇到问题，从而降低团队的效率和工作流程的平滑性。
>
> **5. 需要额外的沟通和协调：**由于强制推送的潜在影响，团队成员需要进行额外的沟通和协调工作，以确保每个人都了解当前的仓库状态，并且所有人都在同步的基础上进行工作。
>
因此，除非绝对必要，通常建议避免使用强制推送。如果需要进行强制推送，最好事先通知团队成员，并确保所有人都准备好处理可能出现的问题。在一些更严格的工作环境中，团队可能会设置策略禁止强制推送到关键分支，如 main 或 master。

（以上为 ChatGPT 回答）

---

## 实际操作

1. 使用终端 cd 指令到需要操作的 Xcode 工程文件目录下。

```bash
cd "路径/到/你的/带 空格 的/项目"

cd "/Volumes/Wall ST7 E/Developer MrSouthWall/MoneyBox/MoneyBox/MoneyBox.xcodeproj"
```

2. 键入 `git push --force` 命令，执行强制推送，也可使用 `git push --force-with-lease
` 这个命令会在推送前检查远程分支的状态，确保没有其他人在你之后推送了新的更改。

3. 当终端提示如下指令时，说明已经成功强制推送。
```bash
Enumerating objects: 27, done.
Counting objects: 100% (27/27), done.
Delta compression using up to 8 threads
Compressing objects: 100% (14/14), done.
Writing objects: 100% (14/14), 1.57 KiB | 1.57 MiB/s, done.
Total 14 (delta 11), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (11/11), completed with 11 local objects.
To https://github.com/MrSouthWall/MoneyBox.git
 + 7c6eaab...fa1eb54 main -> main (forced update)
```

>==使用命令行进行强制推送之前，请确保这是你想要的操作，因为它会覆盖远程仓库中的历史，可能会导致团队成员的工作丢失。确保在执行此操作前与团队成员沟通清楚。如果你不确定，可以先咨询团队中的其他成员或版本控制管理员。==

---

## 结束

至此，我的强迫症就被治好了，注释已经成功修改。“强制推送”在个人项目中，不会对 GitHub 仓库造成什么影响，并且由于只修改了最近一次的提交，所以其他的提交历史表面上还是原样没有改变。

但是在经过强制推送之后，GitHub 上的所有提交记录都刷新了一遍，==相当于是把整个本地 Git 管理完整提交了一遍。==