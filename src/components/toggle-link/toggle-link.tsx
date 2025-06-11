import { type AnchorHTMLAttributes, type FC, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type ToggleLinkProps = {
	children: ReactNode
	isExternal?: boolean
	link: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps, 'to' | 'href'>

export const ToggleLink: FC<ToggleLinkProps> = ({
	children,
	isExternal = false,
	link,
	...props
}) => {
	if (isExternal) {
		return (
			<a href={link} {...props}>
				{children}
			</a>
		)
	}
	return (
		<Link to={link} {...props}>
			{children}
		</Link>
	)
}
