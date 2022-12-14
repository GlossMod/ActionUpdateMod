# Action Update Mod

## 简介

这是一个用来更新[3DM MOD 站](https://mod.3dmgame.com/)里 Mod 信息和 Mod 文件的 Github Action。

如果你的 Mod 源码是托管于 Github 的话，你可以使用这个 Github Action 来自动化你的 Mod 更新流程。

你可以设置在 Github 上发布 Release 时，自动上传最新版的 Release 文件到 3DM Mod 站上，同时也可以更新 Mod 的各种信息。

[原项目](https://github.com/Nats-ji/3dm-release-action)由于使用的是 python 编写，受 github 的限制只能运行于 linux 环境。现在这个可以运行在任何环境。

### 示例 Workflow 文件

```yaml
name: Release
on:
  release:
    types: [published] #在发布Release时触发

jobs:
  release:
    runs-on: ubuntu-latest #或者 windows-latest
    steps:
      - uses: actions/checkout@v3

      - name: 更新3DM Mod站信息
        uses: GlossMod/ActionUpdateMod@v1
        with:
          appid: ${{ secrets.APPID }} #调用储在github secrets里面的APPID
          appkey: ${{ secrets.APPKEY }} #调用储在github secrets里面的APPKEY
          id: 548964
          title: 我的Mod标题
          version: ${{ github.event.release.tag_name }} #使用发布时的tag
          desc: 我的Mod简介
          content: README.md #可以输入markdown文件路径，或者直接输入markdown代码
          file: build/windows/myMod.asi #可以输入文件夹路径或者文件路径，如果不是zip/rar/7z格式的话会自动打包
```

## 输入参数

| 输入参数           | 描述                                                                                               | 示例                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `appid`            | Mod 站 API 的 APPID                                                                                | ${{ secrets.APPID }}                                    |
| `appkey`           | Mod 站 API 的 APPKEY                                                                               | ${{ secrets.APPKEY }}                                   |
| `id`               | 你想要更新的 Mod 的 ID 号                                                                          | 548964                                                  |
| `title` （可选）   | Mod 的标题                                                                                         | 我的 Mod                                                |
| `tags` （可选）    | Mod 的标签                                                                                         | 修改器, 中文, 原创                                      |
| `version` （可选） | Mod 的版本号                                                                                       | v1.2.5                                                  |
| `desc` （可选）    | Mod 的简单描述                                                                                     | 我的超强修改器 Mod                                      |
| `content` （可选） | Mod 的介绍正文的 Markdown 文件路径或者 Markdown 代码                                               | README.md                                               |
| `file` （可选）    | Mod 文件路径（大小限制: 10mb），如果文件路径非`zip/rar/7z`格式将会自动打包后上传（支持文件夹打包） | `build/windows/x64/helloworld.asi`,<br>`package/mymod/` |
| `test` (可选)      | 是否测试运行，不与 API 通讯                                                                        | false                                                   |

> **Warning**
>
> 注意不要直接在你的workflow文件里输入你的`appid`和`appkey`。应将他们存放于你项目仓库的secret里后，使用`${{ secrets.APPID }}`，`${{ secrets.APPKEY }}`等调用。

## 输出

| 输出   | 描述     |
| ------ | -------- |
| `code` | 状态码   |
| `msg`  | 返回消息 |

### 如何使用输出

```yaml
steps:
  - name: 更新3DM Mod站信息
    uses: GlossMod/ActionUpdateMod@v1
    id: update_mod #设置此步骤的id以供下一步调用本步骤的输出
    with:
        appid: ${{ secrets.APPID }}
        appkey: ${{ secrets.APPKEY }}
        id: 548964
        version: ${{ github.event.release.tag_name }}
        content: README.md
        file: build/windows/myMod.asi

- name: echo上一步的输出
    run: echo "API返回的状态码：${{ steps.update_mod.outputs.code }}，返回消息：${{ steps.update_mod.outputs.msg }}"
```

## 贡献

欢迎在 Github 上发起 PR 来贡献此项目。

## 开源许可

本项目使用 MIT 开源许可。
