# Chuỗi đối xứng (NKPALIN)

- Source - VNOI: <a href="https://oj.vnoi.info/problem/nkpalin" target="_blank">nkpalin</a>
- Dạng: Quy hoạch động trên xâu

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1e6;

typedef long long ll;
typedef pair<int, int> ii;
typedef vector<int> vi;
typedef vector<pair<int, int>> vii;
typedef vector<vi> vvi;
typedef vector<ll> vl;
typedef vector<vl> vvl;

#define sz(x) x.size()
#define all(x) x.begin(), x.end()

int n, m;
string s, t, res;
int main() {
  ios_base::sync_with_stdio(0);
  cin.tie(0);
  cin >> s;
  n = m = sz(s);
  t = s;
  vvi f(m + 1, vi(n + 1, 0));
  reverse(all(t));
  s = ' ' + s;
  t = ' ' + t;

  for (int i = 1; i <= m; i++)
    for (int j = 1; j <= n; j++) {
      if (s[i] == t[j])
        f[i][j] = f[i - 1][j - 1] + 1;
      else
        f[i][j] = max(f[i - 1][j], f[i][j - 1]);
    }

  while (f[m][n] > 0) {
    if (s[m] == t[n]) {
      res += s[m];
      m--;
      n--;
    } else if (f[m - 1][n] == f[m][n])
      m--;
    else
      n--;
  }

  cout << res;

  return 0;
}
```
