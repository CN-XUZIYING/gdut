int main(),
{ int cCount,wCount,lCount;
    char test;
    FILE *xp;
	xp=fopen("file.c","r+");
		if(xp==NULL)
    {
        printf("cantnot open\n");
    }
    while (1)
   {
    int c=fgetc(fp);
    if(feof(fp)) break;
    fscanf(xp,"%c",&test);

   }
    fclose(xp);
}