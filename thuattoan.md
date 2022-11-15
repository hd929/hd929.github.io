<link rel="stylesheet" href="./prism/prism.css" />

# Thuật toán

- [Quicksort](#quicksort)
- [Sàng nguyên tố](#nto)

<h2 id="quicksort">Quicksort (Sắp xếp nhanh)</h2>

Sắp xếp tăng dần

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

Sắp xếp giảm dần

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
