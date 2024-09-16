interface ContainerProps {
    children: React.ReactNode;
}
export const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return (
        <div className="mx-auto mx-w-7xl">
            {children}
        </div>

    );
};

export default Container;