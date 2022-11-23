// 2 hàm kiểm tra số nguyên tố
function nguyento(a:longint):boolean;
var  i:longint;
  begin
     if a<1 then exit(false);
     if (a=2) or (a=3) then exit(true);
     for i:= 2 to trunc(sqrt(a)) do
       if a mod i=0 then exit(false);
      
    exit(true);
  end;


// nhập xuất mảng 2 chiều
var n,m,i,j:longint;
    a:array[1..100, 1..100] of longint;

begin
  read(n, m);

  // nhập mảng
  for i:=1 to n do
    for j:=1 to m do
      read(a[i,j]);

  //xuất mảng
  for i:=1 to n do
  begin
    for j:=1 to m do
      write(a[i,j], ' ');

    // hết hàng xuống dòng
    writeln();
  end;
end.

// Số bé thứ k
var n,k,i:longint;
    a:array[1..100000000] of longint;
    
// Sắp xếp nhanh
procedure sort(l,r:longint);
var i,j,x,y:longint;
begin
  i:=l; j:=r;
  x:=a[(l+r) div 2];
  repeat
    while a[i]<x do inc(i);
    while x<a[j] do dec(j);
    if i<=j then
    begin
      y:=a[i];
      a[i]:=a[j];
      a[j]:=y;
      inc(i); dec(j)
    end;
  until i>j;
  if l<j then sort(l, j);
  if i<r then sort(i, r)
end;
begin
  // độ dài mảng
  read(n);

  // vị trí thứ k
  read(k);

  // đọc mảng
  for i:=1 to n do read(a[i]);

  // sắp xếp
  sort(1, k);  
  write(a[k]);
end.
// thuật toán tìm số lớn và bé thứ k
function timso(a:mang, n,k):boolean;
var i,post,t:longint;
begin
  t:=a[1]; post:=1;
  if k<=0 or k>n then exit(false);
  for i: 2 to n do
    if t<a[i] then
    begin
      t:=a[i];
      inc(post);
    if post=k then begin res:=t;  exit(true); end;
    end;
    else exit(false);
end;
// liệt kê dãy nhị phân có độ dài n
procedure Nhap;
begin
        assign(f, fi); reset(f);
        readln(f, n);
        close(f);
        dem:= 0;
end;
procedure InKQ;
var i: integer;
begin
        inc(dem);
        write(f, dem:3, ': ');
        for i:= 1 to n do
                write(f, a[i]);
        writeln(f);
end;

procedure Try2(i: integer); // dien gia tri cho vi tri thu i
var j: integer;
begin
        for j:= 0 to 1 do
        begin
                a[i]:= j;
                if i = n then InKQ
                        else Try2(i+1);
        end;
end;
// sắp xếp bằng đếm phân phối
function demphanphoi(arr, min, max);
var i, z = 0, count = [];
 for (i = min; i <= max; i++) 
        count[i] = 0;
    
 
    for (i = 0; i < arr.length; i++) 
        count[arr[i]]++;
    
 
    for (i = min; i <= max; i++) 
        while (count[i]-- > 0) 
            arr[z++] = i;
  return arr;
var arr = [3, 0, 2, 5, 4, 1];
console.log(countingSort(arr, 0, 5));
// đếm số lần xuất hiện của các phần tử trong mảng = đếm phân phối
uses crt;
var i,j,k,kt,dem,n:longint; a:array[1..1000]of longint;
begin
  clrscr;
  write('nhap so phan tu trong mang:');readln(n);
  for i:=1 to n do begin write('a[',i,']='); readln(a[i]); end;
  for i:=1 to n do
  begin
    kt:=1;
    for j:=1 to i-1 do if(a[j]=a[i])then kt:=0;
      if(kt=1)then
      begin
        dem:=0;
        for k:=1 to n do if(a[i]=a[k])then inc(dem);
        writeln('phan tu ',a[i],' trong mang duoc lap lai ',dem,' lan');
      end;
  end;

  readln();
end.

// thuật toán tìm ước
var i,n:longint;

begin
  read(n)

  for i:=1 to (n div 2) do
  begin
    if n mod i = 0 then write(i, ' ');
  end;
end;

// thuật toán chuẩn hóa xâu
var s:string;
begin
  read(s);

  // Xóa kí tự trắng đầu dòng
  while (s[1]=' ') do delete(s, 1, 1);

  // Xóa kí tự trắng cuối dòng
  while (s[length(s)]=' ') do delete(s, length(s), 1)

  // Xóa kí tự trắng cạnh nhau
  while (pos('  ', s)>0) do delete(s, pos('  ', s), 1)
end;

// thuật toán tìm UCLN của 2 số 
function ucln(a,b:longint):longint;
var tam:longint;
begin
  while b>0 do
    begin
      tam:=a mod b;
      a:=b;
      b:=tam;
    end;
  ucln:=a;
end;

// BCNN
function bcnn(a,b:longint):longint;
var tam,c,d:longint;
begin
  c:=a; d:=b;
  while b>0 do
    begin
      tam:=a mod b;
      a:=b;
      b:=tam;
    end;
  bcnn:=c*(d div a);
end;

// thuật toán tìm BCNN của 2 số 
function boichung(a,b:longint):longint;
var a1,b1:longint;
begin
a1:=a; b1:=b; 
  while b1>0 do
    begin
      du:=a1 mod b1;
      a:=b;
      b:=du;
    end;
  boichung:=(a*b) div a1;
end;
// dãy nhị phân độ dài n ko quá k số 1 
uses math;
var n,i,k:longint;
a:array[0..27] of byte;
procedure print();
var d:longint;
begin
  d:=0;
  for i:= 1 to n do
  if a[i]=1 then inc(d);
  if d<=k then 
  begin
    for i:= 1 to n do
    write(a[i]);
    writeln();
  end;
end;
procedure pps(x:longint);
var j:byte;
begin
  for j:= 0 to 1 do
  begin
    a[x]:=j;
    if x=n then print() else pps(x+1);
  end;
end;
begin
  assign(input,'quantran.inp'); reset(input);
  assign(output.'quantran.out'); rewrite(output);
  read(n,k);
  pps(1);
  close(input); close(output);
end.