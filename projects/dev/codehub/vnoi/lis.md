# Dãy con tăng dài nhất (LIS)

- Source - VNOI: <a href="https://oj.vnoi.info/problem/lis" target="_blank">lis</a>
- Dạng: Quy hoạch động kết hợp Tìm kiếm nhị phân
- Độ phức tạp: $O(N \log N)$

## Thuật toán

Sử dụng mảng phụ `b` lưu trữ phần tử nhỏ nhất có thể của các dãy con tăng có độ dài tương ứng.
Khi duyệt qua mỗi phần tử `x` của mảng `a`:
- Tìm vị trí đầu tiên trong `b` có giá trị $\geq x$ bằng `std::lower_bound`.
- Nếu tìm thấy, thay thế giá trị tại vị trí đó bằng `x` (để tối ưu hóa phần tử kết thúc cho độ dài tương lai).
- Nếu không tìm thấy (mọi phần tử trong `b` đều $< x$), thêm `x` vào cuối mảng `b`.

## Cốt lõi C++

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    vector<int> b;
    for (int x : a) {
        auto it = lower_bound(b.begin(), b.end(), x);
        if (it == b.end()) {
            b.push_back(x);
        } else {
            *it = x;
        }
    }

    cout << b.size() << "\n";
    return 0;
}
```
