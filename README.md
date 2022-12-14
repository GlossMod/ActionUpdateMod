# Action Update Mod
[![github][github-badge]][github-link] [![test][test-badge]][test-link] ![license][license-badge] ![version][version-badge] [![market][market-badge]][market-link] [![3dm][3dm-badge]][3dm-link]

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

### 注意
不要直接在你的workflow文件里输入你的`appid`和`appkey`。应将他们存放于你项目仓库的secret里后，使用`${{ secrets.APPID }}`，`${{ secrets.APPKEY }}`等调用。

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

[github-badge]: https://img.shields.io/badge/sorce-Github-blue?style=social&logo=github
[github-link]: https://github.com/GlossMod/ActionUpdateMod
[test-badge]: https://img.shields.io/github/workflow/status/GlossMod/ActionUpdateMod/Test?label=test
[test-link]: https://github.com/GlossMod/ActionUpdateMod/actions/workflows/test.yml
[license-badge]: https://img.shields.io/github/license/GlossMod/ActionUpdateMod
[version-badge]: https://img.shields.io/github/v/release/GlossMod/ActionUpdateMod?include_prereleases
[market-badge]: https://img.shields.io/badge/visit-Github%20Marketplace-red?logo=github
[market-link]: https://github.com/marketplace/actions/ActionUpdateMod
[3dm-badge]: https://img.shields.io/badge/visit-3DM%20Mods-blueviolet?logo=data:image/vnd.microsoft.icon;base64,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
[3dm-link]: https://mod.3dmgame.com/mod/174709