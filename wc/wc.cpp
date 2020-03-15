#include <iostream>
#include<stdio.h>
#include<string.h>
#include<conio.h>
#include<stdlib.h>
using namespace std;
int main()
{
 int cCount,wCount,lCount,i,k,j,q;
 int codeCount,konCount,zhuCount;
codeCount=konCount=zhuCount=0;
lCount=0;wCount=cCount=0;
i=k=1;j=q=0;
 char fileName[20];
    char test;
    char buffer[200];
buffer[0]=0;
   printf("输入文件名：");
    scanf("%s",fileName);
    printf("\n");
    FILE *xp;
   // if(xp)lCount=1;
	xp=fopen(fileName,"r+");
    while ((test=fgetc(xp))!=EOF)
   {
        printf("%c",test);
        if(test==10)//如果字符为换行符
        {
           while(buffer[k])
           {
            if(((buffer[k]>64&&buffer[k]<91)||(buffer[k]>96&&buffer[k]<123))&&(buffer[k-1]<65||(buffer[k-1]>90&&buffer[k-1]<97)||buffer[k-1]>122))
               {//字母前面一个为非字母则计数
                   wCount++;
               }
               k++;
           }
        lCount++;//行数增加
        i=1;
        k=1;
            while(buffer[k])
            {
                if(buffer[k]!=32)j++;//计算有效字符j个
                if(buffer[k]==47&&buffer[k+1]==buffer[k])//若存在注释，判断注释前有没有有效代码
                   {
                       for(q=1;q<=k;q++)
                            if((buffer[q]>64&&buffer[q]<91)||(buffer[q]>96&&buffer[q]<123))
                                break;
                        if(q==k+1)zhuCount++;
                    }
                   k++;
            }
            if(j<2)konCount++;//空行以及只有一个字符的行
            j=0;
            k=1;
        while(buffer[i])
        {
            buffer[i]=0;i++;//初始化
        }
        i=1;k=1;
        continue;
        }
        buffer[i]=test;
        i++;
        cCount++;//字符数增加
   }
   codeCount=lCount-zhuCount-konCount;
   k=1;
 /*while(buffer[k])
           {k++;
            if(((buffer[k]>64&&buffer[k]<91)||(buffer[k]>96&&buffer[k]<123))&&(buffer[k-1]<65||(buffer[k-1]>90&&buffer[k-1]<97)||buffer[k-1]>122))
               {//字母前面一个为非字母则计数
                   printf("\n%c\n",buffer[k]);
                   wCount++;printf("w:%d",wCount);
               }


           }
           k=1;*/
    if(lCount<=1)
       while(buffer[k])
           {
                if(buffer[k]==0)
                   {

                   wCount=lCount=cCount=0;
                   break;}

           }

    fclose(xp);
    printf("\nword:%d\n",wCount);
    printf("line:%d\n",lCount);
    printf("character:%d\n",cCount);
    printf("空白行：%d\n",konCount);
    printf("代码行：%d\n",codeCount);
    printf("注释行：%d\n",zhuCount);
}
