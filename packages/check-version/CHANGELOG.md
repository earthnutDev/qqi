# check-version

## v1.0.0 （5 🈷️ 25 日 2025 年）

- 就是闲的

## v0.1.3 （5 🈷️ 10 日 2025 年）

- 修正使用文档

使用的的时候，如果使用

```bash
output=$(npx @qqi/check-version c=. 2>&1)
# 执行 npx  的返回值
exit_code=$?
```

获取到的 `exit` 的值永远是 0 ，因为这个值是 npx 的返回状态码值，而不是 `npx @qqi/check-version c=. 2>&1` 的执行返回状态值。
纳闷的是

```bash
tag=""
if ! tag=$(npx @qqi/check-version c=. 2>&1); then
  echo "执行出错：${tag}"
  exit 1
fi

...
```

却又能正确的捕获 `npx @qqi/check-version c=. 2>&1` 的执行结果与输出。。。就是很邪门

## v0.1.2 （5 🈷️ 9 日 2025 年）

- 修复已知 bug

## v0.1.1 （5 🈷️ 8 日 2025 年）

- 修复已知 bug

## v0.1.0 （5 🈷️ 8 日 2025 年）

- 以前返回值为 `true` 的情况现返回为可用的 npm 发布的 tag

## v0.0.2 （5 🈷️ 8 日 2025 年）

- 更新文档

## v0.0.1 （5 🈷️ 2 日 2025 年）

- 更改了一个小地方

## 0.0.0 (5 月 2 日 2025 年)

- 初始化项目
