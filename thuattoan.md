<link rel="stylesheet" href="./prism/prism.css" />

# Thuật toán

<div class="search search-math">
  <input type="text" placeholder="Tìm thuật toán" />
</div>

- [Sắp xếp nổi bọt](#sxnoibot)
- [Quicksort](#quicksort)
- [Sàng nguyên tố](#nto)

<h2 id="sxnoibot">Sắp xếp nổi bọt</h2>

### Sắp xếp tăng dần

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

### Xắp xếp giảm dần

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

<h2 id="quicksort">Quicksort (Sắp xếp nhanh)</h2>

### Sắp xếp tăng dần

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

### Sắp xếp giảm dần

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

<h2 id="nto">Sàng nguyên tố</h2>

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
