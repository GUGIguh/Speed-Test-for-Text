export default function(props) {
    const {
        size = 11,
        color = "#fff",
        className,
        ...rest
    } = props;

    return (
        <svg
            width={size}
            height={Math.round(size * 6/11)} // сохраняем пропорции (6/11 ≈ 0.545)
            viewBox="0 0 11 6"
            fill="none"
            className={className}
            {...rest}
        >
            <path
                fill={color}
                d="M4.742 5.836.117 1.242c-.156-.125-.156-.375 0-.531L.742.117a.36.36 0 0 1 .531 0l3.75 3.688L8.743.117c.155-.156.405-.156.53 0l.625.594c.157.156.157.406 0 .531L5.273 5.836a.36.36 0 0 1-.53 0"
            />
        </svg>
    );
}