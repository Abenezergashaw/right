import { ref, onMounted } from "vue";

const theme = ref("theme-dark");

export function useTheme() {
  const setTheme = (newTheme) => {
    theme.value = newTheme;
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  onMounted(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  });

  return { theme, setTheme };
}
