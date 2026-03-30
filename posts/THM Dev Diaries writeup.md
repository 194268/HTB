Hunt through online development traces to uncover what was left behind.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*AIAlc55BNY4TtXT3U_CIMA.png)

We have just launched a website developed by a freelance developer. The source code was not shared with us, and the developer has since disappeared without handing it over.

Despite this, traces of the development process and earlier versions of the website may still exist online.

You are only given the website’s primary domain as a starting point: **marvenly.com**

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*Q5IQ9l9EI7FY5rvk3yMF_A.png)

**_Q1:What is the subdomain where the development version of the website is hosted?_**

ok，subfinder plz

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*zYfWnDoA4Nv8YGb83puzvQ.png)

**_A1:uat-testing.marvenly.com_**

**_Q2:What is the GitHub username of the developer?_**

check the page,but nothing

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*PgGZzlSajUL56AgmrvgUAQ.png)

so,Wayback Machine may help

after some check ,

[https://uat-testing.marvenly.com](https://uat-testing.marvenly.com/)

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*nSGKzWa5rVuIBTqr5YHpKw.png)

at the bottom,found it

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*6zxkrxrwYvXb4Dptybg7ZA.png)

**_A2:notvibecoder23_**

[](https://medium.com/plans?source=promotion_paragraph---post_body_banner_dot_calm_clouds--9fde04975d74---------------------------------------)

**_Q3:What is the developer’s email address?_**

after we found the name

use marvenly-dev and watch commit

add .patch after hash

like:

[https://github.com/notvibecoder23/marvenly_site/commit/e9ce1cebf3182472f729d976bf04b5d8e35b9b32.patch](https://github.com/notvibecoder23/marvenly_site/commit/e9ce1cebf3182472f729d976bf04b5d8e35b9b32.patch)

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*fp4fdhHZamPGoswIvahLBQ.png)

and we found this

From: notvibecoder23 <freelancedevbycoder23@gmail.com>

**_A3:freelancedevbycoder23@gmail.com_**

**_Q4:What reason did the developer mention in the commit history for removing the source code?_**

at the [https://github.com/notvibecoder23/marvenly_site/commits/88baf1db29d7530a51c7bc13ae9f3c1b9a1eae25/](https://github.com/notvibecoder23/marvenly_site/commits/88baf1db29d7530a51c7bc13ae9f3c1b9a1eae25/)

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*8vJUXYhvPNj-1An4dq9r9Q.png)

the reason is here

**_A4:The project was marked as abandoned due to a payment dispute_**

**_Q5:What is the value of the hidden flag?_**

obviously,the flag was hidden in the commit

yep,we found it at commit2

[

## Removed my signature, ready for deployment · notvibecoder23/marvenly_site@33c59e5

### Contribute to notvibecoder23/marvenly_site development by creating an account on GitHub.

github.com



](https://github.com/notvibecoder23/marvenly_site/commit/33c59e5feedcbcbfee7a1f6d3a435225698f616f?source=post_page-----9fde04975d74---------------------------------------)

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*V-PvFB9X-3W2SrtmbC1QNw.png)

**_A5:THM{g1t_h1st0ry_n3v3r_f0rg3ts}_**