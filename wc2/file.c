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
cCount=wCount=lCount=0;
i=k=1;j=q=0;
 char *fileName;
    char test;
    char buffer[200];
    buffer[0]=0;
   // printf("�����ļ�����");
   // scanf("%s",fileName);
    //printf("\n");
    FILE *xp;
	xp=fopen("file.c","r+");
    while ((test=fgetc(xp))!=EOF)
   {
        printf("%c",test);
        if(test==10)//����ַ�Ϊ���з�
        {
           while(buffer[k])
           {
            if(((buffer[k]>64&&buffer[k]<91)||(buffer[k]>96&&buffer[k]<123))&&(buffer[k-1]<65||(buffer[k-1]>90&&buffer[k-1]<97)||buffer[k-1]>122))
               {//��ĸǰ��һ��Ϊ����ĸ�����
                   wCount++;
               }
               k++;
           }
        lCount++;//��������
        i=1;
        k=1;
            while(buffer[k])
            {
                if(buffer[k]!=32)j++;//������Ч�ַ�j��
                if(buffer[k]==47&&buffer[k+1]==buffer[k])//������ע�ͣ��ж�ע��ǰ��û����Ч����
                   {
                       for(q=1;q<=k;q++)
                            if((buffer[q]>64&&buffer[q]<91)||(buffer[q]>96&&buffer[q]<123))
                                break;
                        if(q==k)zhuCount++;
                    }
                   k++;
            }
            if(j<2)konCount++;//�����Լ�ֻ��һ���ַ�����
            j=0;
            k=1;
        while(buffer[i])
        {
            buffer[i]=0;i++;//��ʼ��
        }
        i=1;k=1;
        continue;
        }
        buffer[i]=test;
        i++;
        cCount++;//�ַ�������
   }
   codeCount=lCount-zhuCount-konCount;
   while(buffer[k])
           {
            if(((buffer[k]>64&&buffer[k]<91)||(buffer[k]>96&&buffer[k]<123))&&(buffer[k-1]<65||(buffer[k-1]>90&&buffer[k-1]<97)||buffer[k-1]>122))
               {//��ĸǰ��һ��Ϊ����ĸ�����
                   wCount++;
               }
               k++;
           }
    fclose(xp);
    printf("\nword:%d\n",wCount);
    printf("line:%d\n",lCount);
    printf("character:%d\n",cCount);
    printf("�հ��У�%d\n",konCount);
    printf("�����У�%d\n",codeCount);
    printf("ע���У�%d\n",zhuCount);
}
