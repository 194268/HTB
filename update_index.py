import os
import json

def generate_index():
    posts_dir = "posts"
    if not os.path.exists(posts_dir):
        os.makedirs(posts_dir)
    
    # 获取所有 .md 文件并排序
    files = [f for f in os.listdir(posts_dir) if f.endswith('.md')]
    files.sort(reverse=True) 

    with open("list.json", "w", encoding="utf-8") as f:
        json.dump(files, f, indent=4, ensure_ascii=False)
    
    print(f"成功更新索引: {len(files)} 篇文章")

if __name__ == "__main__":
    generate_index()
