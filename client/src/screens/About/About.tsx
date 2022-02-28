import { useState, FC } from 'react';
import { Input } from 'components';
import { ModalWrapper, ScreenWrapper } from 'hoc';
import './About.scss';

const About: FC = () => {
	return (
		<ScreenWrapper>
			This is the about page about the Meals.io webapp
		</ScreenWrapper>
	);
};

export default About;
