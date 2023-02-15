import { useEffect } from "react";
import "./goTopBtn.css";

const GoTopBtn = () => {
  useEffect(() => {
    const toTopBtn = document.querySelector(".gotop-btn");
    toTopBtn?.addEventListener("click", () =>
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    );

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        toTopBtn.classList.add("active");
      } else {
        toTopBtn.classList.remove("active");
      }
    });
  }, []);
  return <button className="gotop-btn">⇡</button>;
};

export default GoTopBtn;
