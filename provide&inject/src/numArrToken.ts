import { InjectionKey, ref, Ref } from "vue";

// Symbol - 独一无二的值
const numArrToken: InjectionKey<ReturnType<typeof useApp>> = Symbol();

// 自定义组合函数
export function useApp() {
  // 累加器
  const num = ref(0);
  const add = () => {
    num.value++;
  };
  const numArr = ref([1, 2, 3, 4]);
  return { num, add, numArr };
}

export default numArrToken;
