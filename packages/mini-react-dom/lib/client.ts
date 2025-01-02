export function createRoot(container: HTMLElement) {
  return {
    render(element: HTMLElement) {
      container.appendChild(element);
    },
  };
}
