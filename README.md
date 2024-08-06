# matr1x-claim

matr1x 领空投

## config

private_keys.txt 填写账号，格式：私钥 一行一个 不要有多余的空行
proxies.txt 填写代理 格式：user:password@ip:port 一行一个，与账号对应
emails.txt 填写outlook邮箱 格式：email,password 一行一个，与账号对应

## run

安装nodejs
安装python >= 3.9

matr1x.py 代码文件 最下面填写如下几个值，所有账号统一使用如下值
    SafetyPassword = ''  # 六位数安全码
    RegisterPassword = ''  # 注册密码
    RecvAddr = ''  # 如果填写则所有账号的$MAX都会转到这个地址，否则默认转到账号对应地址

```commandline
pip install -r requirements.txt
python matr1x.py
```

## note

邮箱用的outlook，可以买几毛钱一个的

## donate
ERC-20: 0xa1482B19EF1a577bb87bE3BB4EFc4d1bA64f5A45




