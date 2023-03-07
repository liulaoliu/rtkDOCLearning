//这是注释，显示文件路径捏:/src/features/counter/counterAPI.ts
// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve, reject) =>
    setTimeout(() => resolve({ data: amount }), 2000)
  );
}
