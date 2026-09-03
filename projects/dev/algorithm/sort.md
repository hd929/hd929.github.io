# Sắp xếp (sort)

## Sắp xếp cơ bản O($n^2$)
 - [Sắp xếp chèn *](#sắp-xếp-chèn)
 - [Sắp chọn](#sắp-xếp-chọn)
 - [Sắp nổi bọt *](#sắp-xếp-nổi-bọt)

## Sắp xếp nâng cao O($n \log n$)
 - [Sắp xếp nhanh](#sắp-xếp-nhanh)
 - [Sắp xếp hòa trộn *](#sắp-xếp-hòa-trộn)

*: thuật có tính **ổn định**

## Sắp xếp chèn

```cpp
void insertionSort() {
  for (int i = 2; i <= n; i++) {
    int k = a[i];
    int j = 1;
    while ((j > 1) && (a[j-1] > k)) {
      a[j] = a[j-1];
      j--;
    }
    a[j] = k;
  }
}
```

## Sắp xếp chọn

```cpp
void selectionSort() {
  for (int i = 1; i<=n; i++) {
    int p = i;
    for (int j = i + 1; j <= n; j++) {
      if (a[j] < a[p]) {
        p = j;
      }
    }
    swap(a[i], a[p]);
  }
}
```

## Sắp xếp nổi bọt

```cpp
void bubbleSort() {
  for (int i = 1; i <= n; i++) {
    for (int j = i; j <= n; j++) {
      if (a[j] < a[j+1])
        swap(a[j], a[j+1]);
    }
  }
}
```

## Sắp xếp nhanh

```cpp
void quickSort(int l, int r) {
  int i = l, j = r, x = a[(l + r) >> 1];
  while (i <= j) {
    while (a[i] < x)
      i++;
    while (x < a[j])
      j--;

    if (i <= j) {
      swap(a[i], a[j]);
      i++;
      j--;
    }
  }
  if (l <= j)
    quickSort(l, j);
  if (i <= r)
    quickSort(i, r);
}
```

## Sắp xếp hòa trộn

```cpp
int tmp[N];
void mergePart(int l, int mid, int r) {
  int i = l, j = mid + 1, k = 0;
  while (i <= mid && j <= r) {
    if (a[i] <= a[j])
      tmp[k++] = a[i++];
    else
      tmp[k++] = a[j++];
  }

  while (i <= mid)
    tmp[k++] = a[i++];
  while (j <= r)
    tmp[k++] = a[j++];
  for (int i = 0; i < k; i++)
    a[l++] = tmp[i];
}

void mergeSort(int l, int r) {
  if (l >= r)
    return;
  int mid = (l + r) >> 1;
  mergeSort(l, mid);
  mergeSort(mid + 1, r);
  mergePart(l, mid, r);
}
```