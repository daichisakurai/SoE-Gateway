# What's this?

SoEサービスGW管理画面



### Require

* Node.js 14以上
  * 14.19.1
* npm 6以上
  * 6.14.16
* VSCode



### Set Up

```
npm i
```



### Npm Script

| コマンド           | 内容                                           |
| ------------------ | ---------------------------------------------- |
| `npm run build`    | プロダクションビルド                           |
| `npm run dev`      | 開発用ローカルサーバの起動(localhost:8080)     |
| `npm run lint`     | 静的解析の実行(src配下の`.ts`, `.tsx`ファイル) |
| `npm run lint:fix` | 静的解析 + 自動修正                            |
| `npm run format`   | フォーマット(src配下)                          |



### Directories

#### src/

* index.tsx・・・jsのエントリポイント、Appコンポーネントもまとめています。
* index.html・・・初期配信されるhtml。`<div id="app"></div>`内にReactがレンダリングする設定。metaタグ等はこちらで。

#### src/components/

ボタンなどのコンポーネントはこの配下へ。新たにディレクトリを切ってもOKです。

#### src/pages/

`react-router-dom`で表示切替するpagesなコンポーネントはこちらへ。

#### src/hooks/

カスタムHooksが必要になったらこちらに定義してください。

#### src/contexts/

Context APIで使用したいContextはここに作成してください。

#### src/images/

画像置き場。一緒にビルドされます。

#### src/types/

* scss.d.ts・・・`.scss`ファイルをTypescriptにimportする際に必要な型定義。本当はファイルごとに細かく型定義をしたほうが補完が効いていいのですが、ひとまずこうしています。
* image.d.ts・・・画像

その他、グローバルな型定義ファイルが必要になった場合はこちらへ。

#### dist/

ビルド結果はここに格納されます。

#### (root)/

* eslintrs.js・・・ESLintの設定ファイルです。
* .gitignore・・・Git上でトラッキングしないファイルの一覧です。
* .prettierrc・・・Prettierの設定ファイルです。
* package-lock.json・・・依存パッケージのバージョン管理ファイルです。
* package.json・・・プロジェクトの基本情報、npmスクリプト、直接依存するパッケージの一覧が記載されたファイルです。
* tsconfig.json・・・Typescriptの設定ファイルです。
* webpack.config.ts・・・webpackの設定ファイルです。
