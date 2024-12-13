export type IconType = 'home' | 'about' | 'projects' | 'mail' | 'github' | 'linkedin' | 'library' 

export interface BtnListProps {
  label: string
  link: string
  icon: IconType
  newTab?: boolean
  labelDirection?: 'left' | 'right'
}

export interface NavButtonProps extends BtnListProps {
  x: number | string
  y: number | string
}

export interface ResponsiveComponentProps {
  children: (props: { size: number }) => React.ReactNode
}

