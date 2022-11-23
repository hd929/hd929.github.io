<link rel="stylesheet" href="./prism/prism.css" />

# Thuật toán

<div class="search search-math">
  <input type="text" placeholder="Tìm thuật toán" />
  <a class="search-clear">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
  </a>
</div>

- [Sắp xếp nổi bọt](#sxnoibot)
- [Quicksort](#quicksort)
- [Kiểm tra số nguyên tố](#ktsonto)
- [Sàng nguyên tố](#nto)
- [Số đẹp](#sodep)
- [Số nhỏ nhì](#sonhonhi)
- [Số nhỏ thứ k](#sonthuk)
- [Mảng 2 chiều](#nxmang2c)
- [Số lần xuất hiện](#slxh)
- [Tìm UCLN của 2 số](#ucln)
- [Tìm BCNN của 2 số](#bcnn)
- [Ước của 1 số](#uoc)
- [Chuẩn hóa xâu](#chxau)
- [Sinh dãy nhị phân](#sdnp)

<h1 id="sxnoibot">Sắp xếp nổi bọt</h1>

## Sắp xếp tăng dần

```pascaligo
for i:=1 to n-1 do
  for j:=i+1 to n do
    if a[i]>a[j] then
    begin
      tam:=a[i];
      a[i]:=a[j];
      a[j]:=tam;
    end;
```

## Xắp xếp giảm dần

```pascaligo
for i:=1 to n-1 do
  for j:=i+1 to n do
    if a[i]<a[j] then
    begin
      tam:=a[i];
      a[i]:=a[j];
      a[j]:=tam;
    end;
```

<h1 id="quicksort">Quicksort (Sắp xếp nhanh)</h1>

## Sắp xếp tăng dần

```pascaligo
procedure sort(l,r:longint);
var i,j,x,y:longint;
begin
  i:=l; j:=r;
  x:=a[(l+r) div 2];

  repeat
    while a[i]<x then inc(i);
    while x<a[j] then dec(j);
    if i<=j then
    begin
      y:=a[i];
      a[i]:=a[j];
      a[j]:=y;
      inc(i); dec(j);
    end;
  until i>j;

  if l<j then sort(l,j);
  if i<r then sort(i,r);
end;
```

## Sắp xếp giảm dần

Đổi

```pascaligo
  while a[i]<x then inc(i);
  while x<a[j] then dec(j);
```

Thành

```pascaligo
  while a[i]>x then inc(i);
  while x>a[j] then dec(j);
```

<h1 id="ktsonto">Kiểm tra số nguyên tố</h1>

```pascaligo
function nto(a:longint):boolean;
var i:longint;
begin
  if a<=1 then exit(false);
  if (a=2) or (a=3) then exit(true);

  for i:=2 to trunc(sqrt(a)) do
    if a mod i = 0 then exit(false)

  exit(true)
end;

```

<h1 id="nto">Sàng nguyên tố</h1>

```pascaligo
function nto(a:longint):boolean;
var i:longint;
begin
  if a<2 then exit(false);
  if (a=2) or (a=3) then exit(true);
  if ((a mod 2)=0) or ((a mod 3)=0) then exit(false);

  i:=5;
  while i*i<=a do
  begin
    if ((a mod i)=0) or ((a mod i+2)=0) then exit(false);
    inc(i,6);
  end;

  exit(true);
end;
```

<h1 id="sodep">Số đẹp</h1>

```pascaligo
function sodep(a:longint):boolean;
var tong,x:longint;
begin
  tong:=0;

  while a>0 do
  begin
    x:=a mod 10;
    tong:=tong+x;
    a:=a div 10;
  end;

  if tong=10 then exit(true);
  exit(false);
end;
```

<h1 id="sonhonhi">Số nhỏ nhì</h1>

```pascaligo
var min1, min2,i,n:longint;
    a:array[1..10000000] of longint;

begin
  read(n);
  for i:=1 to n do read(a[i]);

  min1:=high(longint);
  min2:=high(longint);

  for i:=1 to n do
    if a[i]<min1 then min1:=a[i];

  for i:=1 to n do
    if (a[i]<min2) and (a[i] <> min1) then min2:=a[i];

  write(min2);
end.

```

<h1 id="sonthuk">Số nhỏ thứ k</h1>

```pascaligo
var n,k,i:longint;
    a:array[1..100000000] of longint;

// Sắp xếp nhanh
procedure sort(l,r:longint);
var i,j,x,y:longint;
begin
  i:=l; j:=r;
  x:=a[(l+r) div 2];
  repeat

    // tìm số nhỏ thứ k
    while a[i]<x do inc(i);
    while x<a[j] do dec(j);

    // tìm số lớn thứ k thì đổi thành
    while a[i]>x do inc(i);
    while x>a[j] do dec(j);

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
```

<h1 id="nxmang2c">Nhập xuất mảng hai chiều</h1>

```pascaligo
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
```

<h1 id="uoc">Ước của 1 số</h1>

```pascaligo
var i,n:longint;

begin
  read(n)

  for i:=1 to (n div 2) do
  begin
    if n mod i = 0 then write(i, ' ');
  end;
end;
```

<h1 id="ucln">Tìm UCLN</h1>

```pascaligo
function uoc(a,b:longint):longint;
var du:longint;
begin
  while b>0 do
  begin
    du:=a mod b;
    a:=b;
    b:=du;
  end;
  uoc:=a;
end;
```

<h1 id="bcnn">Tìm BCNN</h1>

```pascaligo
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
```

<h1 id="slxh">Số lần xuất hiện của phần tử bằng đếm phân phối (10^6)</h1>

```pascaligo
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
```

<h1 id="chxau">Chuẩn hóa xâu</h1>

```pascaligo
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
```

<h1 id="sdnp">Sinh dãy nhị phân</h1>

```pascaligo
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
```
