<link rel="stylesheet" href="./prism/prism.css" />

# Thuật toán

<div class="search search-math">
  <input type="text" placeholder="Tìm thuật toán" />
  <a class="search-clear">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
  </a>
</div>

<div class="blockcode">
<h1 id="sxnoibot">Sắp xếp nổi bọt</h1>

## Sắp xếp tăng dần

<div class="code">

<button class="switch-pas">Pascal</button>
<button class="switch-cpp">C++</button>

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

```cpp
for (int i = 0; i<n; i++)
  for (int j = 0; j<n; j++)
  {
    if (a[i]>a[j]) {
      int temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
  }
```

</div>

## Xắp xếp giảm dần

<div class="code">

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

```cpp
for (int i = 0; i<n; i++)
  for (int j = 0; j<n; j++)
    if (a[i]<a[j])
    {
      int temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
```

</div>
</div>

<div class="blockcode">
<h1 id="quicksort">Quicksort (Sắp xếp nhanh)</h1>

## Sắp xếp tăng dần

<div class="code">

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

```cpp
void sort(int arr[], int l, int r) {
  int i = l, j = r;
  int x = arr[(l + r) / 2];
  while (i < j) {
    while (arr[i] < x)
      i++;
    while (x < arr[j])
      j--;
    if (i <= j) {
      swap(arr[i], arr[j]);
      i++;
      j--;
    }
  }

  if (l < j)
    sort(l, j);
  if (i < r)
    sort(i, r);
}
```

</div>

## Sắp xếp giảm dần

**Đổi**

<div class="code">

```pascaligo
  while a[i]<x then inc(i);
  while x<a[j] then dec(j);
```

```cpp
while (arr[i] < x)
  i++;
while (x < arr[j])
  j--;
```

</div>

**Thành**

<div class="code">

```pascaligo
  while a[i]>x then inc(i);
  while x>a[j] then dec(j);
```

```cpp
while (arr[i] > x)
  i++;
while (x > arr[j])
  j--;
```

</div>
</div>

<div class="blockcode">
<h1 id="ktsonto">Kiểm tra số nguyên tố</h1>

<div class="code">

```pascaligo
function nto(a:longint):boolean;
var i:longint;
begin
  if a<=1 then exit(false);
  if (a=2) or (a=3) then exit(true);
  if (a mod 2 = 0) or (a mod 3 = 0) then exit(false);
  
  i:=5;
  while (i*i<=n) do
  begin 
    if (a mod i = 0) or (a mod (i+2) = 0) then
      exit(false);
    inc(i, 6);
  end;

  exit(true)
end;

```

```cpp
bool nto(int n)
{
  if (n < 2)
    return 0;
  if (n == 2 || n == 3)
    return 1;
  if (n % 2 == 0 || n % 3 == 0)
    return 0;

  for (int i = 1; i*i<=n; i++)
    if (n % i == 0 || n % (i+2) == 0)
      return 0;
  return 1;
}
```

</div>
</div>

<div class="blockcode">
<h1 id="nto">Sàng nguyên tố</h1>

**Với pascal thì chỉ chạy được với n <= 10^6**

<div class="code">

```pascaligo
var f:array[1..1000000] of boolean;

procedure snto(n:longint);
var i,j:longint;
begin
  for i:=0 to 1000000 do 
    f[i]:=1;
  f[0]:=0; f[1]:=0;
  i:=1; j:=1;
  while (i*i<=n) do
  begin
    if f[i] = 1 then
    begin
      j:=i*i;
      while (j <= n) do
      begin
        f[j]:=0;
        j:=j + i;
      end;
    end;
    inc(i);
  end;
end;
```

```cpp
bool f[N]
void snto(int n)
{
    memset(f, 1, sizeof(f));
    f[0] = f[1] = 0;
    for (int i = 2; i*i <= n; i++)
        if(f[i])
            for (int j = i * i; j <= n; j += i)
                f[j] = 0;
}
```

</div>
</div>

<div class="blockcode">
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

</div>

<div class="blockcode">
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

</div>

<div class="blockcode">
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

</div>

<div class="blockcode">
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

</div>

<div class="blockcode">
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

</div>

<div class="blockcode">
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

</div>

<div class="blockcode">
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

## Sort

```pascaligo
function bcnn(a,b:longint):longint;
var i:longint;
begin
  i:=1;
  while a*i mod b <> 0 do inc(i);
  exit(a*i);
end;
```

</div>

<div class="blockcode">
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

</div>

<div class="blockcode">
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

</div>

<div class="blockcode">
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

</div>

<div class="blockcode">
<h1 id="tpnp">Thập phân -> nhị phân</h2>

```pascaligo
var i,j,n:longint;
    a:array[1..1000000] of longint;

begin
  readln(n);
  i:=1;

  repeat
  begin
    a[i]:=n mod 2;
    n:=n div 2;

    if n=0 then break
    else inc(i);
  end;
  until n=0;

  for j:=i downto 1 do write(a[j]);
end.
```

</div>

<div class="blockcode">
<h1 id="nptp">Nhị phân -> thập phân</h1>

```pascaligo
var i,p,he10:longint;

begin
  readln(s);

  he10:=0;
  p:=1;

  for i:=length(s) downto 1 do
  begin
    if s[i]='1' then inc(he10, p);
    p:=p*2;
  end;
end;
```

</div>

<div class="blockcode">
<h1 id="hvcs">Hoán vị chữ số</h1>

```pascaligo
uses math;
var s:string;
    i,j,p,q:byte;

procedure suly();
var i:byte;
begin
  for i:=1 to length(s) do
    write(s[i], ' ');

  writeln();
end;

procedure dao(var a, b:char);
var t:char;
begin
  t:=a;
  a:=b;
  b:=t;
end;

begin
  assign(input, 'hoanviso.inp'); reset(input);
  assign(output, 'hoanviso.out'); rewrite(output);

  readln(s);

  i:=length(s)-1;

  while i>0 do
  begin
    suly();

    while (i>0) and (s[i]>s[i+1]) do dec(i);
    if i>0 then
    begin
      j:=length(s);
      while s[j]<s[i] do dec(j);
      dao(s[j], s[i]);
      p:=i+1;q:=length(s);

      while p<q do
      begin
        dao(s[p], s[q]);
        inc(p); dec(q);
      end;
    end;
  end;

  close(input); close(output);
end.
```

</div>

<div class="blockcode">
<h1 id='hoanvichu'>Hoán vị chữ</h1>

```pascaligo
uses math;
var s:string;
    i,k,q,p:integer;

procedure dao(var u,v:char);
var t:char;
begin
     t:=u; u:=v;v:=t;
end;

procedure suly();
var j:integer;
begin
    for j:=1 to length(s) do
        write(s[j],' ');
        writeln;
end;

begin
assign(input,'daodoan.inp');reset(input);
assign(output,'daodoan.out'); rewrite(output);
readln(s);
i:=length(s)-1;
while i>0 do
    begin
         suly;
         i:=length(s)-1;
         while (i>0) and (s[i]>s[i+1]) do dec(i);
         if i>0 then
            begin
              k:=length(S);
              while s[k]<s[i] do dec(k);
              dao(s[k],s[i]);
              p:=i+1;q:=LENGTH(S);
              while p<q do
                  begin
                      dao(s[p],s[q]);
                      inc(p); dec(q);
                  end;
            end;
      end;

  close(input); close(output);
  end.
```

</div>

<div class="blockcode">
<h1 id="dem-uoc">Đếm ước</h1>

```pascaligo
function demuoc(u: longint) : longint;
Var i, dem: longint;
Begin
  dem:=0;

  For i:= 1 to trunc(sqrt(u)) do
  If u mod i = 0 then
  Begin
    dem := dem + 1; //nếu tính tổng ước S:=S + i;
    if i <> u div i then
    dem := dem + 1; //nếu tính tổng ước S:= S + u div i;
  End;

  exit(dem); // exit(s);
End
```

</div>

<div class="blockcode">
<h1 id="tong-uoc">Tổng ước</h1>

```pascaligo
Function tonguoc(u: longint) : longint;
Var i, s: longint;
Begin
  dem:=0;

  For i:= 1 to trunc(sqrt(u)) do
  if u mod i = 0 then
  Begin
    s:=s + i;
    if i <> u div i then
      s:= s + u div i;
  End;

  exit(s);
End
```

</div>

<div class="blockcode">
<h1 id="tknp">Tìm kiếm nhị phân</h1>

```pascaligo
Function Tknpcb(X: longint): longint;
Var d, c, g: Longint;
Begin
  d := 1; c := N;

  While d <= c Do
  Begin
    g := (d + c) Div 2;
    if A[g] = X then exit(g);
    if A[g] < X then d := g+1 else c := g-1;
  End;

  Exit(0);
End;

```

</div>

<div class="blockcode">
<h1 id="tinh-lt">Tính lũy thừa (Tính mũ)</h1>

```pascaligo
function lt(a:longint, b:longint):longint;
var i,tich:longint;
begin
  for i:=1 to b do
    tich:=tich*a;

  exit(tich);
end;
```

</div>

<div class="blockcode">
<h1>Đảo số</h1>

```pascaligo
function dao(a:longint):longint;
begin
  while a>0 do
  begin
    so:=so*10+a mod 10;
    a:=a div 10;
  end;

  exit(so);
end;
```

</div>
