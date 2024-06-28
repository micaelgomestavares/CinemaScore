import { ReactNode } from 'react'

type CommandSearchGroupProps = {
  heading: string
  children: ReactNode
}

export const CommandSearchGroup = ({
  children,
  heading,
}: CommandSearchGroupProps) => {
  return (
    <div className="space-y-2 px-6 py-2">
      <h4 className="text-sm font-bold">{heading}</h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}