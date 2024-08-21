# Segment Tree

## Xây dựng hàm `build`

```cpp
void build(int id, int l, int r)
{
  if (l == r)
  {
    t[id] = a[l];
    return;
  }
  int mid = (l + r) >> 1;
  build(id << 1, l, mid);
  build(id << 1 | 1, mid + 1, r);

  t[id] = t[id << 1] + t[id << 1 | 1];
}
```

## Xây dựng hàm `get`

```cpp
long long get(int id, int l, int r, int u, int v)
{
  if (v < l || r < u)
    return 0;
  if (u <= l && r <= v)
	  return t[id];
	int mid = (l + r) >> 1;
	long long t1 = get(id << 1, l, mid, u, v);
	long long t2 = get(id << 1 | 1, mid + 1, r, u, v);
	return t1 + t2;
}
```

## Xây dựng hàm `update`

```cpp
void update(int id, int l, int r, int pos, int val)
{
  if (pos < l || r < pos)
    return;
  if (l == r)
  {
    t[id] = val;
    // a[l] = val;
    return;
  }

  int mid = (l + r) >> 1;
  update(id << 1, l, mid, pos, val);
  update(id << 1 | 1, mid + 1, r, pos, val);
  t[id] = t[id << 1] + t[id << 1 | 1];
}
```
