import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../features/darkModeSlice";

const ToggleTheme = () => {
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(setTheme(newTheme));
    };

    return (
        <label className="switch">
            <input
                type="checkbox"
                id="themeSwitcher"
                checked={theme === "dark"}
                onChange={toggleTheme}
            />
            <span className="slider"></span>
        </label>
    );
};

export default ToggleTheme;


