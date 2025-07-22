# Tàu cập bến cảng

Có `n` chuyến tàu biển từ các cảng khác nhau đăng ký thời gian cập bến và xuất bến. Chuyến tàu thứ i cần cập bến ngay sau thời điểm $s_i$ và rời bến tại thời điểm $f_i$. Hỏi có thể sắp xếp cảng để phục vụ được nhiều nhất bao nhiêu chuyến tàu sao cho không có hai chuyến tàu nào cập bến và rời bến trùng nhau?

**Dữ liệu:**

- Dòng đầu tiên chứa số nguyên dương n $(n \leq 10^4)$
- Dòng thứ i trong số n dòng tiếp theo chứa hai số nguyên dương $s_i$ và $f_i$ $(s_i < f_i \leq 10^5)$

**Kết quả:**

- Dòng đầu tiên ghi số K là số chuyến tàu có thể phục vụ.
- K dòng tiếp theo liệt kê số hiệu các chuyến tàu được phục vụ theo thứ tự từ chuyến đầu tiên đến chuyến cuối cùng, mỗi dòng ghi số hiệu một chuyến tàu.

```input1
5
7 9
2 4
1 3
1 6
3 7
```

```output1
3
3
5
1
```

- Source - CYB: https://hydro.ac/d/hd929/p/4
