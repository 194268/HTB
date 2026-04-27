
![](https://cdn-images-1.medium.com/max/1000/1*RupfaJG3qjdVThENB3ITrQ.png)

#### Challenge Scenario

---

You are assigned the important mission of locating and identifying the infamous space hacker. Your investigation begins by analyzing the data patterns and breach points identified in the latest cyber-attacks. Use the provided coordinates of the last known signal origins to narrow down his potential hideouts. Utilize advanced tracking algorithms to follow the digital footprint left by the hacker.

check the zip file

we have a .npy

![](https://cdn-images-1.medium.com/max/1000/1*zBUl_RLC1FV5uarHDD6aAg.png)

so, we need `numpy`

![](https://cdn-images-1.medium.com/max/1000/1*lbuVdRjgw8Zw6Pbzx_gmZw.png)

![](https://cdn-images-1.medium.com/max/1000/1*r8ckgmROarV6m_XD0LET-w.png)

and use this as

> **_import numpy as np  
> import matplotlib.pyplot as plt_**

> **_# 1. 读取距离矩阵  
> D = np.load(“distance_matrix.npy”, allow_pickle=False)  
> print(“[+] shape:”, D.shape)  
> print(“[+] dtype:”, D.dtype)_**

> **_# 2. 基本检查  
> D = D.astype(np.float64)  
> print(“[+] diagonal max:”, np.abs(np.diag(D)).max())  
> print(“[+] symmetric diff:”, np.abs(D — D.T).max())_**

> **_# 轻微误差修正  
> D = (D + D.T) / 2  
> np.fill_diagonal(D, 0)_**

> **_# 3. Classical MDS：把距离矩阵还原成 2D 坐标  
> D2 = D ** 2  
> row_mean = D2.mean(axis=1, keepdims=True)  
> col_mean = D2.mean(axis=0, keepdims=True)  
> total_mean = D2.mean()_**

> **_B = -0.5 * (D2 — row_mean — col_mean + total_mean)_**

> **_eigvals, eigvecs = np.linalg.eigh(B)  
> idx = np.argsort(eigvals)[::-1]_**

> **_eigvals = eigvals[idx]  
> eigvecs = eigvecs[:, idx]_**

> **_coords = eigvecs[:, :2] * np.sqrt(np.maximum(eigvals[:2], 0))  
> x, y = coords[:, 0], coords[:, 1]_**

> **_# 4. 画四个方向，防止 flag 镜像/倒置  
> views = [  
>  ( x, y, “normal”),  
>  (-x, y, “flip_x”),  
>  ( x, -y, “flip_y”),  
>  (-x, -y, “flip_xy”),  
> ]_**

> **_fig, axes = plt.subplots(2, 2, figsize=(12, 12))_**

> **_for ax, (px, py, title) in zip(axes.ravel(), views):  
>  ax.scatter(px, py, s=1)  
>  ax.set_title(title)  
>  ax.set_aspect(“equal”)  
>  ax.axis(“off”)_**

> **_plt.tight_layout()  
> plt.savefig(“flag_views.png”, dpi=300)  
> plt.show()_**

> **_print(“[+] saved: flag_views.png”)_**

![](https://cdn-images-1.medium.com/max/1000/1*pZlyx8oQPXGse5UrIalD8A.png)

![](https://cdn-images-1.medium.com/max/1000/1*bRk7kuon0Y7QvNA7iZhfdA.png)

and we got the flag

**_HTB{d1st4nt_spac3}_**