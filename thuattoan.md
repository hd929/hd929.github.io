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
