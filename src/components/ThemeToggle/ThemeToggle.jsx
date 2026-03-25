import "./ThemeToggle.css"

function ThemeToggle() {
  const toggle = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <button onClick={toggle}>
      Cambiar modo
    </button>
  );
}

export default ThemeToggle;