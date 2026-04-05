import os
import json
from datetime import datetime

def generate_site_assets():
    # --- 配置区 ---
    POSTS_DIR = "posts"
    BASE_URL = "https://syc-sigma.vercel.app"
    LIST_FILE = "list.json"
    SITEMAP_FILE = "sitemap.xml"

    # 1. 确保目录存在
    if not os.path.exists(POSTS_DIR):
        os.makedirs(POSTS_DIR)
        print(f"[*] 已创建目录: {POSTS_DIR}")

    # 2. 获取并排序所有 .md 文件
    files = [f for f in os.listdir(POSTS_DIR) if f.endswith('.md')]
    # 按文件名倒序排列（通常文件名带日期，如 2024-04-06-xxx.md，这样最新的在前面）
    files.sort(reverse=True)

    # 3. 生成 list.json (前端显示用)
    with open(LIST_FILE, "w", encoding="utf-8") as f:
        json.dump(files, f, indent=4, ensure_ascii=False)
    print(f"[+] 成功更新前端索引: {len(files)} 篇文章")

    # 4. 生成 sitemap.xml (Google 搜索用)
    now = datetime.now().strftime('%Y-%m-%d')
    sitemap_content = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        f'  <url>',
        f'    <loc>{BASE_URL}/</loc>',
        f'    <lastmod>{now}</lastmod>',
        f'    <priority>1.0</priority>',
        f'  </url>'
    ]

    for file_name in files:
        # 构建文章的完整 URL
        url = f"{BASE_URL}/article.html?post={file_name}"
        sitemap_content.append(f'  <url>')
        sitemap_content.append(f'    <loc>{url}</loc>')
        sitemap_content.append(f'    <lastmod>{now}</lastmod>')
        sitemap_content.append(f'    <priority>0.8</priority>')
        sitemap_content.append(f'  </url>')

    sitemap_content.append('</urlset>')

    with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
        f.write('\n'.join(sitemap_content))
    
    print(f"[+] 成功更新站点地图: {SITEMAP_FILE}")
    print(f"[*] 提示: 请记得将更新后的文件推送到 GitHub 以触发 Vercel 部署。")

if __name__ == "__main__":
    generate_site_assets()
