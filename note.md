# node

主页面

```
blog/
   |-- css/                                              样式文件
   |   |-- style.css
   |
   |-- images/                                           图片文件
   |   |-- title.ico                                     博客图标
   |   |-- #category#/
   |       |-- #year#/
   |           |-- #month#/
   |               |-- #date#/
   |
   |-- js/                                               脚本文件
   |   |-- common.js
   |
   |-- pages/                                            用nodejs生成的页面文件
   |   |-- page/                                         分页页面
   |   |   |-- #pageNum#/
   |   |       |-- index.html
   |   |
   |   |-- archives/                                     归档
   |   |   |-- index.html
   |   |   |
   |   |   |-- category/                                 分类归档
   |   |   |   |-- #category#/
   |   |   |       |-- index.html
   |   |   |
   |   |   |-- tags/                                     标签归档
   |   |       |-- #tag#/
   |   |           |-- index.html
   |   |    
   |   |-- demo/                                         demo归档
   |   |   |-- index.html
   |   |
   |   |-- posts                                         文章
   |       |-- #category#/
   |           |-- #year#/
   |               |-- #month#/
   |                   |-- #date#/
   |                       |-- #title#/
   |                           |-- index.html
   |                           |-- index.js
   |                           |-- index.css
   |
   |-- src/
   |   |-- posts/                                       原始文章
   |
   |-- static/                                          静态文件
   |   |-- #category#/
   |       |-- #year#/
   |           |-- #month#/
   |               |-- #date#/
   |                   |-- #title#/
   |                       |-- index.html
   |                       |-- index.js
   |                       |-- index.css
   |
   |-- plugin/                                          插件
   |   |-- prism/
   |   |   |-- prism.js
   |   |   |-- prism.css
   |   |
   |   |-- jquery.js
   |
   |-- server/                                          nodejs脚本文件
   |   |-- node_modules/
   |   |-- src/
   |   |   |-- template/
   |   |   |   |-- archive.html
   |   |   |   |-- archives.html
   |   |   |   |-- archiveTitle.html
   |   |   |   |-- demolist.html
   |   |   |   |-- index.html
   |   |   |   |-- main.html
   |   |   |   |-- menu0.html
   |   |   |   |-- menu1.html
   |   |   |   |-- menu2.html
   |   |   |   |-- menu3.html
   |   |   |   |-- page.html
   |   |   |   |-- pageBtn.html
   |   |   |   |-- pageBtns.html
   |   |   |   |-- post.html
   |   |   |   |-- posts.html
   |   |   |
   |   |   |-- Post.js
   |   |   |-- asPost.js
   |   |   |-- server.js
   |   |   |-- clean.js
   |   |   |-- generate.js
   |   |   |-- html.js
   |   |   |-- log.js
   |   |   |-- parse.js
   |   |   |-- fsUtil.js
   |   |   |-- stringUtil.js
   |   |   |-- dateUtil.js
   |   |   |-- template.js
   |   |
   |   |-- app.js
   |   |-- config.json
   |   |-- package.json
   |
   |-- index.html                                       首页
```

