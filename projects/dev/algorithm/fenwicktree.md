# Fenwick Tree (Binary Indexed Tree)

Fenwick Tree (hay Binary Indexed Tree - BIT) là một cấu trúc dữ liệu cho phép cập nhật giá trị của một phần tử và tính tổng các phần tử trong một khoảng hiệu quả với độ phức tạp $O(\log N)$.

## Xây dựng và Cập nhật (Point Update)

Hàm cập nhật cộng thêm giá trị `val` vào phần tử tại chỉ số `id`:

```cpp
void update(int id, int val) {
    for (; id <= n; id += id & -id) {
        bit[id] += val;
    }
}
```

## Truy vấn tổng (Prefix Query)

Hàm tính tổng từ phần tử thứ 1 đến phần tử thứ `id`:

```cpp
int query(int id) {
    int sum = 0;
    for (; id > 0; id -= id & -id) {
        sum += bit[id];
    }
    return sum;
}
```

## Truy vấn khoảng (Range Query)

Tính tổng các phần tử trong đoạn $[L, R]$:

```cpp
int range_query(int l, int r) {
    return query(r) - query(l - 1);
}
```
