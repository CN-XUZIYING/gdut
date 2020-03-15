#include <iostream>
#include<stdio.h>
#include<string.h>
#include<conio.h>
#include<stdlib.h>

using namespace std;

int main()
{
 int cCount,wCount,lCount,i,k;
cCount=wCount=lCount=0;
i=k=1;
 char *fileName;
    char test;
    char buffer[200];
    buffer[0]=0;
    //printf("输入文件名：");
    //scanf("%s",fileName);
    //printf("\n");
    FILE *xp;
	xp=fopen("file.c","r+");
    if(xp!=NULL)//打开文件，并且文件不为空
        lCount=1;
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
   while(buffer[k])
           {
            if(((buffer[k]>64&&buffer[k]<91)||(buffer[k]>96&&buffer[k]<123))&&(buffer[k-1]<65||(buffer[k-1]>90&&buffer[k-1]<97)||buffer[k-1]>122))
               {//字母前面一个为非字母则计数
                   wCount++;
               }
               k++;
           }
    fclose(xp);
    printf("\n%d\n",wCount);
    printf("%d\n",lCount);
    printf("%d",cCount);
}
