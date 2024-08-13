#!/bin/bash

# 获取当前日期和时间，用于默认的提交信息
current_date=$(date "+%Y-%m-%d %H:%M:%S")

# 设置默认提交信息
commit_message="自动提交于 $current_date"

# 检查是否传入了自定义的提交信息
if [ $# -eq 1 ]; then
  commit_message=$1
fi

# 添加所有更改
git add .

# 提交更改
git commit -m "$commit_message"

# 推送到默认分支
git push origin $(git branch --show-current)

# 输出操作结果
echo "更改已推送到仓库，提交信息为: $commit_message"