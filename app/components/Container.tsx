interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <div 
    className="
      h-fit
      max-w-[2520px]
      mx-auto
      lg:px-20
      md:px-10
      sm:px-2
      px-4
    ">
      {children}
    </div>
  )
}

export default Container