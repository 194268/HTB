
![](https://cdn-images-1.medium.com/max/1000/1*E_bOXnNaMjhkOLgYP_HzSA.png)

### Your Mission

You are a Security Analyst at **West Tech**, a classified defence and R&D contractor. Early this morning, internal monitoring systems flagged unusual network activity originating from the workstation of senior researcher **Oliver Deer**. Upon accessing the machine, a ransom note was discovered on the desktop, suggesting that sensitive project data had been exfiltrated and encrypted. Your job is to investigate the incident: identify how the attacker gained access, trace their actions, recover any stolen data, and neutralise the threat. Time is critical; the integrity of West Tech’s most sensitive technologies may be at risk.

After giving your machines a couple of minutes to boot up, you’ll have access to:

- A workstation environment. You have been granted SSH access to the affected employee’s workstation. You can access this from the AttackBox (or your personal machine if you are connected to the VPN) via:  
    `ssh o.deer@MACHINE_IP` Password: `TryHackMe!`.
- A trusty AI IR security assistant, armed with “tools” built and designed specifically to help you with the heavy lifting in this challenge. They don’t need to be manually triggered by yourself, our AI is a smart cookie and can intelligently determine when these tools should be triggered from prompt context. Some of the tools may provide hints as to when to engage the AI for help and are presented in the “available tools” section in chronological order in which they can be used throughout the investigation. You can simply use it as you would a chatbot. Another cool feature is that this AI is deployed on the same system as the workstation you are investigating and so has access to all the files you do, meaning you can give it file paths in your queries. The AI is accessible via: `[http://MACHINE_IP:7860/?__theme=light](http://MACHINE_IP:7860/?__theme=light)`

This challenge is built to reflect a real defensive scenario, where all tasks can be accomplished without the use of your AI companion and its tools, but can be done with far more efficiency when taken advantage of. And with that, you’re all set to go! Can you help save the day and contAIn the threat?

  

**Note:** Your AI assistant takes some time to wake up, so the first prompt may take a little longer to respond to than subsequent prompts.

  

so,ssh and check the website

![](https://cdn-images-1.medium.com/max/1000/1*wmv67omFvRXLxJx7UD_Y8A.png)

![](https://cdn-images-1.medium.com/max/1000/1*kZt3OoscRvrAsVg6jvoUbw.png)

we can found the tools available

![](https://cdn-images-1.medium.com/max/1000/1*5673PaSeVS_jswmGCW6qBw.png)

try have a talk

![](https://cdn-images-1.medium.com/max/1000/1*rdKmuPMJCzG3Q-6j88-Vkw.png)

we can found a pwned.txt at desktop

![](https://cdn-images-1.medium.com/max/1000/1*BUR30Z4iCif7JxkoCyDdJw.png)

so,check the /home/o.deer/Mail

wait,we can use ai 

use

Can you search the files in this directory //home/o.deer/Mail for phishing_email

![](https://cdn-images-1.medium.com/max/1000/1*JKdDkPHSfpPCDEkZgIR6mA.png)

it found the target email

Subject: INVOICE — URGENT REVIEW REQUIRED

so,lets check the detail

![](https://cdn-images-1.medium.com/max/1000/1*jNh_cXPlaERMS4iRl8Yg_A.png)

yes, it must be the phishing email

so, use the second tools ,

we need found the pcap at first

**find** /home/o.deer/ **-type f -name** “*.pcap”

![](https://cdn-images-1.medium.com/max/1000/1*PDuaZXsq_JkcK94ovphHHg.png)

what we need is the pcap at 06-17

so use

Can you summarise what is covered in /home/o.deer/Documents/pcap_dumps/2025–06–17/

![](https://cdn-images-1.medium.com/max/1000/1*8sl8vhGAwrUD43Ysne8rNA.png)

use pcap_file_reassembler to analysis

![](https://cdn-images-1.medium.com/max/1000/1*B55--MzyrwI6LPat3j3MCQ.png)

it should be the current file

![](https://cdn-images-1.medium.com/max/1000/1*FTHLCJ02sOwPc-KhZNDvCw.png)

the 4444,its wired,too big,right?

use pcap_file_reassembler to analysis /home/o.deer/Documents/pcap_dumps/2025–06–17/session_4444_dump.pcap

![](https://cdn-images-1.medium.com/max/1000/1*P_rjoLkLYhgWNugTkza58A.png)

so, at 

![](https://cdn-images-1.medium.com/max/1000/1*rCzZeakN_tJfx8ZpJG0JtA.png)

![](https://cdn-images-1.medium.com/max/1000/1*TOf9SvXA6P7LEs5Dud1xuA.png)

so,we found the 

westtechvictim1

so use it to unzip it

![](https://cdn-images-1.medium.com/max/1000/1*GpNKfJEVweUxVYm5rzZ5Vw.png)

![](https://cdn-images-1.medium.com/max/1000/1*JIsDQ5XXf9HqMjkhGTIaPw.png)

we can found the last step

cat thm_flags_guide.txt

![](https://cdn-images-1.medium.com/max/1000/1*74UBPtfIk-p2iGe-vF00Yg.png)

so,

use liberty_prime with the rules of /home/o.deer/home/o.deer/westtech_projects/thm_flags_guide.txt to found the flag at /home/o.deer/home/o.deer/westtech_projects/thm_flags.txt

![](https://cdn-images-1.medium.com/max/1000/1*_0NzbtB5P5dzAaOA622KWA.png)

so ,we found the final flag thm{23,82,20,17,53}