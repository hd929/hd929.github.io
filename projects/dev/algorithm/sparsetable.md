# SparseTable (RMQ)

## Xây dựng thuật toán (Bảng thưa)

```cpp
for (int j = 1; (1 << j) <= n; j++)
{
  for (int i = 1; i + (1 << j) <= n; i++)
    f[i][j] = min(f[i][j - 1], f[i + (1 << j)][j - 1]);
}
```

## Xây dựng hàm `get`

```cpp
int get(int l, int r)
{
  int k = log2(r - l + 1);
  return min(f[1][k], f[r - (1 << k)][k]);
}
```
