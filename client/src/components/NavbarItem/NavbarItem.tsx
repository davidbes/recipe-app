import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconType } from 'components';
import './NavbarItem.scss';

interface Props {
	icon: IconType;
	to: string;
	text: string;
}

const NavbarItem: FC<Props> = ({ icon, to, text }: Props) => {
	return (
		<Link to={to} className='navbar-item'>
			<Icon icon={icon} />
			{text}
		</Link>
	);
};

export default NavbarItem;
